/**
 * How `<img>` tags should be made
 *  `<img
   class="lazy"
   data-src="/path/to/img/for/IE11.jpg"
   data-srcset="/path/to/large-1280px.jpg 3x,
               /path/to/medium-640px.jpg 2x,
               /path/to/small-320px.jpg 1x"
   src="/path/to/loading-placeholder.jpg"
   alt="some pic">`
 *
 * How `<video>` elements should be made
*   `<video id="video"
      class="lazy"
      poster="path/to/poster.jpg">
      <source data-src="path/to/video.webm" type="video/webm">
      <source data-src="path/to/video.mp4" type="video/mp4">
    </video>  `
 * @class LazyLoader
 * @constructor
 * @param {string} targetClass the class attached to elements that need to be lazyily loaded. Defaults to '.lazy'
 */

export class LazyLoader {
  private elements!: Element[];
  private targetClass: string;
  private maxWidth: string;
  private loadedClassName: string;

  constructor(targetClass: string) {
    this.elements = [];
    this.maxWidth = "640px";
    this.loadedClassName = "loaded";
    this.targetClass = targetClass ? targetClass : ".lazy";
    this.init();
  }

  private init(): void {
    this.elements = this.queryDOMForElementsWithClass();
    if (this.isMobileDevice()) {
      // Let video elements use their placeholder images instead. Don't load the video on mobile
      this.elements = this.elements.filter(this.removeVideoElements);
    }
    // If we have elements for to lazy laod
    if (this.elements.length) {
      const mediaObserver = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          entries.forEach((e: IntersectionObserverEntry) => {
            if (e.isIntersecting) {
              this.loadMedia(<HTMLElement>e.target);
              mediaObserver.unobserve(e.target);
            }
          });
        }
      );
      this.elements.forEach(element => mediaObserver.observe(element));
    }
  }

  private replaceAttr(
    node: HTMLElement,
    sourceAttr: string,
    targetAttr: string
  ): void {
    const src = node.getAttribute(sourceAttr);
    if (src) {
      // @ts-ignore
      node[targetAttr] = src;
      node.removeAttribute(sourceAttr);
    }
  }

  private loadMedia(media: _MediaElemnt): void {
    // load <video>
    if (media.tagName == "VIDEO") {
      Array.from(media.querySelectorAll("source")).forEach(s => {
        this.replaceAttr(s, "data-src", "src");
      });
      (<HTMLVideoElement>media).load();
    }

    // load <picture>
    if (
      media &&
      media.parentNode &&
      (<HTMLPictureElement>media.parentNode).tagName &&
      (<HTMLPictureElement>media.parentNode).tagName == "PICTURE"
    ) {
      Array.from(media.parentNode.querySelectorAll("source")).forEach(
        (s: HTMLSourceElement) => {
          this.replaceAttr(s, "data-src", "src");
          this.replaceAttr(s, "data-srcset", "srcset");
        }
      );
    }

    // load <img>
    if (media.tagName == "IMG") {
      this.replaceAttr(media, "data-src", "src");
      this.replaceAttr(media, "data-srcset", "srcset");
    }

    // load <div> background image and apply it via css.
    if (media.tagName == "DIV" || media.tagName == "ARTICLE") {
      const node = this.backgroundNode({
        node: media,
        loadedClassName: this.loadedClassName
      });
      node.load();
    }

    media.classList.add(this.loadedClassName);
  }

  private isMobileDevice(): boolean {
    return window.matchMedia(`(max-width: ${this.maxWidth}`).matches;
  }

  private queryDOMForElementsWithClass(): Element[] {
    return Array.from(document.querySelectorAll(this.targetClass));
  }

  private removeVideoElements(e: Element): boolean {
    return e.tagName !== "VIDEO";
  }

  private backgroundNode({
    node,
    loadedClassName
  }: {
    node: HTMLElement;
    loadedClassName: string;
  }) {
    const src = node.getAttribute("data-background-image-url");
    return {
      load: () => {
        const img = new Image();
        img.src = src ? src : "";
        img.onload = () => {
          requestAnimationFrame(() => {
            node.style.backgroundImage = `url(${src})`;
            node.classList.add(loadedClassName);
          });
        };
      }
    };
  }
}

type _MediaElemnt =
  | HTMLElement
  | HTMLMediaElement
  | HTMLImageElement
  | HTMLPictureElement
  | HTMLSourceElement
  | HTMLVideoElement;
