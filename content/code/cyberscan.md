---
title: "Cyberscan"
date: 2019-06-29T15:06:48-07:00
image: "foo/bar/get/an/image"
draft: false
---

CyberScan is a free dark web monitoring service. It scans your email address across 50,000 data points to see where your email was compromised. CyberScan will see if your email has been in data breaches on the surface web, deep web, or if it is for sale on the dark web.

I had 3 weeks to create a single page site that gives a potential customer to try out CyberScan for free. The requirements were that the site should:

- Load fast
- SEO friendly
- Be fun

The website was released at 2019 Blackhat where it had over a billion visiotrs\*.

## Icerberg SVG Animation

One of the best parts about this project was building SVG animations. The iceberg was broken down to three parts where a user could scan the surface web, dark web, and deep web to learn more about each part of the internet.

gif of scanning each part go here

The entire iceberg is controlled by an `IcebergController`. This controller takes some `values` and a `groupValue`. The `groupValue` represents the currently selected value, while `values` represented all possible values. Exactly how a radio button would perform.

Each option controls what content it should show or hide. So when an option is selected, it should show it's content and trigger an SVG animation.

```typescript
export class IcebergController {
  public values: IcebergOptionController[];
  public groupValue: IcebergOptionController;

  constructor(
    values: IcebergOptionController[],
    groupValue: IcebergOptionController,
  ) {
    this.values = values;
    this.groupValue = groupValue;

    this.values.forEach((opt: IcebergOptionController) => {
      opt.button.onclick = () => {
        this.groupValue = opt;
        this.updateSelection();
      };
    });
  }

  private updateSelection(): void {
    for (let i = 0; i < this.values.length; i++) {
      const opt = this.values[i];
      if (this.groupValue == opt) {
        opt.displayContent();
      } else {
        opt.hideContent();
      }
    }
  }
```

The animation is triggered by passing a SVGAnimationElements reference to a seperate controller. When the animation is triggered by a user, we call `SVGAnimationElement.beginElement()`. This starts a chain reaction of events in the svg. Any `<animate>` element with a `data-anim` attribute is a trigger that starts a cascade of other animations elements. I opted for using animate elements here as it was easier to control the animation of a gradient by seperate elements rather than JavaScript. When reading the code, I could understand what is happening as I read it from top to bottom.

Each animation element manipulates the stop value of the linear gradient. By increasing the `offset` attribute of the stop element, we can control the length of the linear gradient. This example, we are increasing the linear gradient from 0 to 0.50, fading the graident out, and then resetting the offset and opacity values.

```html
<svg>
  <defs>
   <linearGradient x1="0%" y1="100%" x2="0%" y2="0%">
    <stop offset="0.0" stop-color="#50E3C2" stop-opacity="0.0" />
    <stop stop-color="#50E3C2" stop-opacity="1.0">
      <!-- animate trigger -->
      <!-- draws gradient to 50% of iceberg at 1.05s -->
      <animate data-anim="animate-deep-web" attributeType="XML" attributeName="offset" from="0.0" to="0.50"
        dur="1.05s" begin="indefinite" fill="freeze" restart="whenNotActive" repeatCount="1"/>

      <!-- sets stop-opacity to 0 (fadeout) after #deepWebScan ends -->
      <animate attributeType="XML" attributeName="stop-opacity" from="1" to="0.0"
      dur="1.0s" begin="deepWebScan.end" fill="freeze" restart="whenNotActive" repeatCount="1"/>

      <!-- resets gradient to offset of 0 after #deepWebFadeout ends -->
      <animate attributeType="XML" attributeName="offset" from="" to="0.0"
        dur="0.01" begin="deepWebFadeout.end" fill="freeze" restart="whenNotActive" repeatCount="1"/>

      <!-- resets stop-opacity to 1 after #deepWebRest ends -->
      <animate attributeType="XML" attributeName="stop-opacity" from="" to="1"
      dur="0.01" begin="deepWebReset.end" fill="freeze" restart="whenNotActive" repeatCount="1"/>
    </stop>
      <stop stop-color="#50E3C2" stop-opacity="0.0">
      <!-- animate trigger -->
      <!-- draws gradient to 50% of iceberg at 1.0s -->
      <animate data-anim="animate-deep-web" attributeType="XML" attributeName="offset" from="0" to="0.50"
        dur="1.0s" begin="indefinite" fill="freeze" restart="whenNotActive"/>

      <!-- resets gradient to offset of 0 after #deepWebFadeout ends -->
      <animate attributeType="XML" attributeName="offset" from="" to="0.0"
      dur="0.01" begin="deepWebFadeout.end" fill="freeze" restart="whenNotActive" repeatCount="1"/>
    </stop>
  </defs>
  <g>
   <!-- rest of svg that consumes one of many linearGradient animations -->
  </g>
</svg>
```

## Loader Animation

The loading animation was approached differently. Each circle is a path, where the line is a dash that grows from 0px to the circumfrence of that circle. With SVGs, you can customize the appearance of a dashed line with [stroke-dashoffset](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dashoffset) and [stroke-dasharray](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).

Setting both the circle's stroke-dashoffset and stroke-dasharray equal to the circle's circumfrence returns an invisible line.

```html
<svg>
  ...
  <!-- circle has radius `r` of 84 -->
  <circle cx="90" cy="90" r="84" stroke-width="12" />
</svg>
```

```typescript

// TS
class CircleDrawer {
  circle: SVGCircleElement;
  circumference: number;

  constructor(circle: SVGCircleElement, circumference: number) {
    this.circle = circle;
    this.circumference = circumference;

    <!-- Make circle invisible -->
    this.circle.style.strokeDasharray = this.circumference.toString();
    this.circle.style.strokeDashoffset = this.circumference.toString();
  }

}
```

To animate the circle you must decrease the circles `strokeDashoffset` over time. When set to 0, the circle is a single dash whose length is the circle's circumference.

```typescript
  class CircleDrawer {

  circle: SVGCircleElement;
  circumference: number;

  constructor(circle: SVGCircleElement, circumference: number) {
    this.circle = circle;
    this.circumference = circumference;

    <!-- Make circle invisible -->
    this.circle.style.strokeDasharray = this.circumference.toString();
    this.circle.style.strokeDashoffset = this.circumference.toString();
  }

  public animateCircle({
    duration = 2000,
    delay = 200
  } = {}): void {

    // Create a function that will decrease the strokeDashoffset over time
    const decreaseOffsetCallback = this.decreaseStrokeDashOffset(
      this.circle,
      this.circumference
    );

    // on every frame rendered, draw more of the circle and ease out at the end.
    setTimeout(() => {
      this.tween({
        onUpdate: decreaseOffsetCallback,
        ease: this.easeOut,
        duration
      });
      this.setText("SCANNING DARK WEB");
    }, delay);
  }

  private tween({
    from = 0,
    to = 1,
    duration = 3000,
    onUpdate = () => {},
    ease = this.easeOut
  } = {}): void {
    const delta = to - from;
    const startTime = performance.now();

    function update(currentTime: number) {
      const elapsed: number = currentTime - startTime;
      const currentProgress: number = Math.min(elapsed / duration, 1);
      const nextProgress: number = from + ease(currentProgress) * delta;

      if (onUpdate) {
        onUpdate(nextProgress);
      }
      if (currentProgress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }


  private easeOut(progress: number, power = 2): number {
    return 1 - (1 - progress) ** power;
  }

  private decreaseStrokeDashOffset(
    circle: SVGCircleElement,
    circumference: number,
    nextValue: number
  ): void {
      const nextDashOffset: number = circumference * (1 - value);
      circle.style.strokeDashoffset = nextDashOffset.toString();
    };
  }
}
```
