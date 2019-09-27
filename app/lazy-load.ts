/**
 * Creates a new LazyLoader.
 *
 * Will search for images and video elements that have a class of 'lazy'
 * It will then Target the element's `data-src` / data-srcset property and then
 * Lazily load the content with an IntersectionObserver or
 * a fallback method for ancient browswers.
 *
 *
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
  public elements: any[];
  public maxWidth: string;
  public targetClass: string;
  public loadedClassName: string;

  constructor(targetClass: string) {
    this.elements = [];
    this.maxWidth = "640px";
    this.targetClass = targetClass ? targetClass : ".lazy";
    this.loadedClassName = "loaded";

    this.init();
  }
  /**
   * Adds event listeners on DOMContentLoader to begin lazy loader
   */
  init() {
    this.elements = this.queryDOMForElementsWithClass();
    if (this.isMobileDevice()) {
      // Let video elements use their placeholder images instead. Don't load the video on mobile
      this.elements = this.elements.filter(this.removeVideoElements);
    }
    // If we have elements for to lazy laod
    if (this.elements.length) {
      const mediaObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadMedia(<HTMLElement>entry.target);
            mediaObserver.unobserve(entry.target);
          }
        });
      });
      this.elements.forEach(element => mediaObserver.observe(element));
    }
  }

  replaceAttr(node: HTMLElement, sourceAttr: string, targetAttr: string) {
    const src = node.getAttribute(sourceAttr);
    if (src) {
      // @ts-ignore
      node[targetAttr] = src;
      console.log(node);
      node.removeAttribute(sourceAttr);
    }
  }

  /**
   * Loads the media when called.
   * @param {DOMElement} media A dom element which contains a data attribute for the content tha tneeds to be lazy loaded
   */
  loadMedia(media: HTMLVideoElement): void;
  loadMedia(media: HTMLPictureElement): void;
  loadMedia(media: HTMLImageElement): void;
  loadMedia(media: HTMLMediaElement): void;
  loadMedia(media: HTMLElement) {
    // load <video>
    if (media.tagName == "VIDEO") {
      [].slice.call(media.querySelectorAll("source")).forEach(source => {
        this.replaceAttr(source, "data-src", "src");
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
      [].slice
        .call(media.parentNode.querySelectorAll("source"))
        .forEach(source => {
          this.replaceAttr(source, "data-src", "src");
          this.replaceAttr(source, "data-srcset", "srcset");
        });
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

  /**
   *
   * @param {DOMElement} media The media that has been loaded and needs to removed from `this.elements` array
   * @return A function that returns a boolean if a media element is in `this.elements`
   */
  filterLazyLoadedElement(media: HTMLElement) {
    return this.elements.filter(elementToLoad => {
      return elementToLoad !== media;
    });
  }

  /**
   * Checks if the window is under a certain width
   * @return boolean
   */
  isMobileDevice() {
    return window.matchMedia(`(max-width: ${this.maxWidth}`).matches;
  }

  /**
   * Returns an array of DOM elements that have the target class
   * @return Array<DOMElements>
   */
  queryDOMForElementsWithClass() {
    return [].slice.call(document.querySelectorAll(this.targetClass));
  }

  /**
   * Checks if a DOM object's tagName is 'VIDEO'
   * @param {object} e an DOM object
   */
  removeVideoElements(e: HTMLVideoElement) {
    return e.tagName !== "VIDEO";
  }

  backgroundNode({
    node,
    loadedClassName
  }: {
    node: HTMLElement;
    loadedClassName: string;
  }) {
    let src = node.getAttribute("data-background-image-url");
    let show = () => {
      requestAnimationFrame(() => {
        node.style.backgroundImage = `url(${src})`;
        node.classList.add(loadedClassName);
      });
    };

    return {
      load: () => {
        let img = new Image();
        img.src = src ? src : "";
        img.onload = show;
      }
    };
  }
}
