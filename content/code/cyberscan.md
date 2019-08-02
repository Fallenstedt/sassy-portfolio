---
title: "Cyberscan"
date: 2019-06-29T15:06:48-07:00
draft: false
---

CyberScan is a free dark web monitoring service. It scans your email address across 50,000 data points to see where your email was compromised. CyberScan will see if your email has been in data breaches on the surface web, deep web, or if it is for sale on the dark web.

I had 3 weeks to create a single page site that gives a potential customer to try out CyberScan for free. The requirements were that the site should:

- Load incredibly fast
- Have excellent SEO
- Be visually exciting

The website was released at 2019 Blackhat where it had over a billion visiotrs\*. The website had 102ms loadtimes and had a bundled size of only 329kb. Google's lighthouse scores were all at 100%.

## How it was built

For a site to load incredibly fast, it meant that it needed the fewest dependecies as possible. The smallest file I could have was a single HTML file. I did not reach for a framework like React, Angular, or Vue because they provided too many tools for what this site needed.

For the designs I was given, I knew I would need SASS to help modularize my styles. The naming convention for all styles abided by [BEM](http://getbem.com/introduction/). Additionally, I knew that TypeScript would be fun to have to create controllers for parts of the site that needed interaction.

All of this was tucked into a custom webpack config that transpiled my JS to es5, added vendor prefixes to my css, and hashed all my assets. The only dependency the site had was normalize.css

## SVG Animations

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

The animation is triggered by passing a reference of specific SVGAnimationElements to a seperate controller. When the animation is triggered by a user, we call `SVGAnimationElement.beginElement()`. This starts a chain reaction of events in the svg. Any `<animate>` element with a `data-anim` attribute is a trigger that starts a cascade of other animations elements.

```html
<svg>
  <defs>
   <linearGradient x1="0%" y1="100%" x2="0%" y2="0%" id="deepWebGradient">
    <stop offset="0.0" stop-color="#50E3C2" stop-opacity="0.0" />
    <stop stop-color="#50E3C2" stop-opacity="1.0">
      <!-- animate trigger -->
      <!-- draws gradient to 50% of iceberg at 1.05s -->
      <animate id="deepWebScan" data-anim="animate-deep-web" attributeType="XML" attributeName="offset" from="0.0" to="0.50"
        dur="1.05s" begin="indefinite" fill="freeze" restart="whenNotActive" repeatCount="1"/>

      <!-- sets stop-opacity to 0 (fadeout) after #deepWebScan ends -->
      <animate id="deepWebFadeout" attributeType="XML" attributeName="stop-opacity" from="1" to="0.0"
      dur="1.0s" begin="deepWebScan.end" fill="freeze" restart="whenNotActive" repeatCount="1"/>

      <!-- resets gradient to offset of 0 after #deepWebFadeout ends -->
      <animate id="deepWebReset" attributeType="XML" attributeName="offset" from="" to="0.0"
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
