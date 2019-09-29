---
title: Lazy Load Images With Intersection Observer
description: Loading many images at once? No! Stop that! Instead, load them when your user needs them. Every byte counts.
tags: ["performance", "typescript"]
date: 2019-09-23
draft: false
---

Your users should load images when they need them. You should never give them all the images all at once. Too many pictures loading at once can ruin the experince of any site

To lazy load your images, you can lazy load them with the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

When an image scrolls into view, we load an image.

<div class="video">
{{< youtube 4n_khk_stMU >}}
</div>

The elements we load in are `img` elements with some specific attributes.

```html
<img src="some/placeholder.jpg" data-src="some/large/image.jpg" class="lazy" />
<img src="some/placeholder.jpg" data-src="some/large/image.jpg" class="lazy" />
<img src="some/placeholder.jpg" data-src="some/large/image.jpg" class="lazy" />
...
```

Each element has a `src` and a `data-src`. To load the image, we need to swap the values of these attributes when the user sees the image. Wth the Intersection Observer, this is called "intersecting". When an element is intersecting, we call `loadMedia` and then we unobserve that element. Start with a class whose elements are images with the class 'lazy'.

```typescript
export class LazyLoader {
  public elements!: any[];
  public targetClass!: string;

  constructor() {
    this.targetClass = ".lazy";
    this.init();
  }

  private init() {
    this.elements = this.getElements();
    if (this.elements.length) {
      const mediaObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            this.loadMedia(e.target);
            mediaObserver.unobserve(e.target);
          }
        });
      });
      this.elements.forEach(element => mediaObserver.observe(element));
    }
  }

  private getElements() {
    return Array.from(document.querySelectorAll(this.targetClass));
  }

  private loadMedia(node: Element) {
    const src = node.getAttribute("data-src");
    if (src) {
      node["src"] = src;
      node.removeAttribute("data-src");
    }
  }
}
```

When created, we invoke `init` whose purpose is to create a `mediaObserver`. This observer listens for the elements you feed into it and invokes a function with those elements only when it is intersecting. Once you have created the observer, you need to give it a target element to watch. This is where we call `mediaObserver.observe(element)`.

```typescript
  init() {
    this.elements = this.getElements();
    if (this.elements.length) {
      const mediaObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadMedia(entry.target);
            mediaObserver.unobserve(entry.target);
          }
        });
      });
      this.elements.forEach(element => mediaObserver.observe(element));
    }
  }
```

Our load media element will take this node and swap our `data-src` attribute with our `src` attribute. Once this swap occurs, the image is loaded.

And that's it. Hopefully this inspires you to find other uses for Intersection Observer.
