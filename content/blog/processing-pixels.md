---
title: Using Rust and WebAssembly to Process Pixels from a Video Feed
date: 2021-05-10T12:36:41-08:00
draft: false
author: Alex Fallenstedt
annotations: false
---

At [Streem](https://streem.pro/) we are on a mission to make the world's expertise more accessible. We create guidance tools to steer the discussion and ensure accurate understanding the first time. One of the guidance tools we are developing for web is a 3d cursor that can be positioned in a remote video. To accomplish this, we need to process a lot of raw pixel data and AR data per frame.

![High Level diagram of what we need to do](https://dev-to-uploads.s3.amazonaws.com/i/ope5jwb2vuse082qezju.png)

Positioning remote artifacts in AR involves a lot of computation between animation frames. It involves so much computation that it is simply too much to cover in one article. In this post, I will discuss how we used Rust to access raw pixel data from a video frame.

![Frame number displayed next to pose estimation of a remote video call](https://dev-to-uploads.s3.amazonaws.com/i/wbmlv5hxktvt6hmhzqdk.gif)

If you would rather jump straight to the code, [then hop over here and give this repo a ⭐](https://github.com/Fallenstedt/webassembly-pixel-processing)

# What is Web Assembly?

WebAssembly (wasm) is a type of code that can be run in web browsers and mobile devices. Wasm was designed to be a compilation target for low-level languages like C, C++, and Rust. With wasm, web browsers and mobile devices can now run code written in multiple languages at near-native speeds by taking advantage of common hardware capabilities.

![High level diagram of Rust compiling to Wasm](https://dev-to-uploads.s3.amazonaws.com/i/dqh43t13dyvdnpvctqkt.png)

Wasm was introduced to all modern web browsers to help extend the capabilities of JavaScript. Since JavaScript has complete control over how WebAssembly code is downloaded, compiled and run, JavaScript developers can think of wasm as a feature for efficiently creating high-performance functions.

In this demo, we used WebAssembly to extract raw pixel data from a remote video feed. This guide will cover high level details about web assembly. It will not cover setting up a web assembly project. There are [tools](https://github.com/rustwasm/wasm-pack) and [tutorials](https://rustwasm.github.io/docs/wasm-pack/) to help you get started with your next web assembly project. If you are completely new to Rust, then you should [watch Tensor Programming's Intro to Rust playlist](https://www.youtube.com/watch?v=EYqceb2AnkU&list=PLJbE2Yu2zumDF6BX6_RdPisRVHgzV02NW)

# How do I process pixels from a remote video feed?

To process raw pixel data for every frame of a video, we used a video track from a [MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream) object, which was then used to create an HtmlVideoElement. The video element can then be used as a source for a canvas to draw an image with. With the image drawn onto a canvas at 60fps, we have access the raw underlying pixel data with [CanvasRenderingContext2D.getImageData()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData).

Below is a high level diagram demonstrating how you can put individual video frames onto a canvas element. With the video frame drawn onto a canvas element, you will have access to raw pixel data.

![How to render video frames onto a canvas element](https://dev-to-uploads.s3.amazonaws.com/i/0bm0b6s16wm6k8adfc4h.png)

Once we knew how to access raw pixel data from a frame, we brought in Rust and wasm. We wanted the interface between JavaScript and Rust to be simple, so we had our `RenderingEngine` be responsible for two things

1. Registering target canvases for our processed video frame to render onto
2. Processing every frame from a video feed

## Registering Target Canvases

A target canvas is where our processed video frames would render.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/38p78418ii9crypiepgq.png)

After dynamically loading our wasm, we can invoke `add_target_canvas` to register a rendering destination for our `RenderingEngine`

```javascript
const renderingEngine = new wasm.RenderingEngine();
renderingEngine.add_target_canvas(canvas);
```

The `RenderingEngine` is a struct which consumes three private fields

- `canvas` the buffer canvas to parse LightShow data on
- `render_targets` A vector of canvas elements to render the final frames onto
- `cancel` A signal to stop rendering frames onto a canvas

```rust
pub struct RenderingEngine {
  canvas: Rc<RenderingEngineCanvas>,
  render_targets: Rc<RefCell<Vec<RenderingEngineCanvas>>>,
  cancel: Rc<RefCell<bool>>,
}
```

Each of these fields is wrapped in Rust's [Reference Counter](https://doc.rust-lang.org/book/ch15-04-rc.html) (Rc). `Rc`s enable **shared ownership** of data. A `Rc` is used when we need several references to an immutable value at the same time. `Rc` pointers are distinct from Rust's usual references in that, while they are allocated on the heap, cloning a `Rc` pointer does not cause a new heap allocation. Instead, a counter inside the `Rc` is incremented. We will see how this is used with our animation loop. **This is needed because we can't use [lifetimes](https://doc.rust-lang.org/1.9.0/book/lifetimes.html) with wasm_bindgen. [See this issue](https://github.com/rustwasm/wasm-bindgen/issues/423).**

Inside our `Rc` is a [`RefCell`](https://doc.rust-lang.org/book/ch15-05-interior-mutability.html), which provides us a way to mutate data when there are immutable references to that data. We will need add many `render_targets` and mutate our `cancel` flag as our application is used at runtime. In a nutshell, a `RefCell` let's you get `&mut` references of your contents. **When we use `Rc<RefCell<T>>`, we are saying we have shared, mutable ownership of data in our application.**

In Rust, `add_target_canvas` is a public method exposed with `wasm_bindgen`. It's important to note this method uses `&mut self`. This reference type allows you to modify `self` without taking ownership of it.

```rust
#[derive(Debug)]
struct RenderingEngineCanvas {
    element: HtmlCanvasElement,
    context_2d: CanvasRenderingContext2d,
}

#[wasm_bindgen]
#[derive(Debug)]
pub struct RenderingEngine {
    canvas: Rc<RenderingEngineCanvas>,
    render_targets: Rc<RefCell<Vec<RenderingEngineCanvas>>>,
    cancel: Rc<RefCell<bool>>,
}

#[wasm_bindgen]
impl RenderingEngine {

    #[wasm_bindgen(constructor)]
    pub fn new() -> RenderingEngine {
        let canvas = Rc::new(RenderingEngine::create_buffer_canvas());
        let render_targets = Rc::new(RefCell::new(Vec::new()));
        let cancel = Rc::new(RefCell::new(false));

        RenderingEngine {
            canvas,
            render_targets,
            cancel,
        }
    }

    #[wasm_bindgen(method)]
    pub fn add_target_canvas(&mut self, canvas: HtmlCanvasElement) {
// Obtain 2D context from canvas
        let context = canvas
            .get_context("2d")
            .unwrap()
            .unwrap()
            .dyn_into::<CanvasRenderingContext2d>()
            .expect("failed to obtain 2d rendering context for target <canvas>");

// Create a struct
        let container = RenderingEngineCanvas {
            element: canvas,
            context_2d: context,
        };

// Update instance of rendering engine
        let mut render_targets = self.render_targets.borrow_mut();
        render_targets.push(container);
    }
}
```

## Processing every frame from a video feed

Processing every frame from a video feed is more involved. I will remove a lot of finer details, however, you can explore the [github repo](https://github.com/Fallenstedt/webassembly-pixel-processing) for a complete code example

![Starting an animation loop with Rust](https://dev-to-uploads.s3.amazonaws.com/i/9vmw9wywpbbjtnkhk3v8.png)

From JavaScript, we can invoke our animation loop with a `start` method. It's only argument is `MediaStream` object which is obtained by [requesting the user's media](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)

```javascript
const renderingEngine = new wasm.RenderingEngine();
renderingEngine.add_target_canvas(canvas);

const userMedia = await navigator.mediaDevices.getUserMedia(someContraints);
renderingEngine.start(userMedia);
```

In Rust, we create an HTMLVideoElement and start our animation loop. With `start_animation_loop`, we clone the values we will be using in our animation loop.

- `video` is needed so we can obtain it's dimensions and frames from.
- `canvas` is our buffer canvas so we can proccess our pixel data
- `cancel` is a signal we can use to trigger a stop to our animation loop
- `render_targets` are all the target canvases on JS that need render our final image onto.

There's also two new constants `f` and `g`. We want to call `requestAnimationFrame` every frame until our video ends. After the video source ends we want all our resources cleaned up. We will use `f` to store our closure we want to execute on each frame, and `g` to kick it off for us.

The closure we create is stored on `g` for the first frame. We call `borrow_mut` to get a mutuable reference to value inside `RefCell::new(None)`.

We learned a lot about this from this [PR at rustwasm](https://github.com/rustwasm/wasm-bindgen/pull/1098) and how to [capture an environment within an anonymous function](https://doc.rust-lang.org/book/ch13-01-closures.html)

```rust
    #[wasm_bindgen(method)]
    pub fn start(&self, media_stream: &MediaStream) {
        let video = RenderingEngine::create_video_element(media_stream);
        &self.start_animation_loop(&video);
    }

   fn start_animation_loop(&self, video: &Rc<HtmlVideoElement>) {
        let video = video.clone();
        let canvas = self.canvas.clone();
        let cancel = self.cancel.clone();
        let render_targets = self.render_targets.clone();

        let f = Rc::new(RefCell::new(None));
        let g = f.clone();

        *g.borrow_mut() = Some(Closure::wrap(Box::new(move || {
          // clean up f when cancel is set to true
          if *cancel.borrow() == true {
                let _ = f.borrow_mut().take();
                return;
          }
          // continuously animate with the value of f.
          RenderingEngine::request_animation_frame(
            f.borrow().as_ref().unwrap()
        }) as Box<dyn FnMut()>));

// start the animation loop here for 1 frame, drop g.

RenderingEngine::request_animation_frame(g.borrow().as_ref().unwrap());
  }


// Note this method call, which uses `as_ref()` to get a `JsValue`
// from our `Closure` which is then converted to a `&Function`
// using the `JsCast::unchecked_ref` function.
   fn request_animation_frame(n: &Closure<dyn FnMut()>) {

      RenderingEngine::get_window()
         .request_animation_frame(n.as_ref().unchecked_ref())
         .expect("should register `requestAnimationFrame` OK");
   }
```

With a function wrapped in a [Closure](https://rustwasm.github.io/wasm-bindgen/api/wasm_bindgen/closure/struct.Closure.html) for JavaScript to execute, we can process our video frames' pixel data. I will make the code example below simple, however, [you can find the original code here.](https://github.com/Fallenstedt/webassembly-pixel-processing/blob/master/web/src/rendering_engine.rs#L60-L117)

```rust
// inside our animation loop

// obtain video dimensions
let video_dimensions = Dimensions {
  width: video.video_width() as f64,
  height: video.video_height() as f64,
};

// draw frame onto buffer canvas
// perform any pixel manipulation you need on this canvas
canvas.element.set_width(video_dimensions.width as u32);
canvas.element.set_height(video_dimensions.height as u32);
canvas.context_2d.draw_image_with_html_video_element(&video, 0.0, 0.0).expect("failed to draw video frame to <canvas> element");


// render resulting image onto target canvas
for target in render_targets.borrow().iter() {
// Use scrollWidth/scrollHeight so we fill the canvas element.
  let target_dimensions = Dimensions {
    width: target.element.scroll_width() as f64,
    height: target.element.scroll_height() as f64,
  };
let scaled_dimensions = RenderingEngine::get_scaled_video_size(
                        &video_dimensions,
                        &target_dimensions,
                    );
let offset = Dimensions {
  width: (target_dimensions.width - scaled_dimensions.width) / 2.0,
  height: (target_dimensions.height - scaled_dimensions.height) / 2.0,
  };

// Ensure the target canvas has a set width/height, otherwise rendering breaks.                 target.element.set_width(target_dimensions.width as u32);
target.element.set_height(target_dimensions.height as u32);
target.context_2d.draw_image_with_html_canvas_element_and_dw_and_dh(
  &canvas.element,
  offset.width,
  offset.height,
  scaled_dimensions.width,
  scaled_dimensions.height,
  ).expect("failed to draw buffer <canvas> to target <canvas>");
}
```

If you liked this example and want to learn more about Rust, WebAssembly, and TypeScript then find me on [mastodon](https://indieweb.social/@Fallenstedt)
