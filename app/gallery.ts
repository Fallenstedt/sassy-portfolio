import {
  fromEvent,
  Observable,
  Subject,
  BehaviorSubject,
  of,
  EMPTY,
  Subscription
} from "rxjs";
import { takeUntil, tap, take, map, concatMap } from "rxjs/operators";
import { Observed } from "./observed";
import { MediaLoader } from "./styles/shared/media-loader";

export class Gallery extends MediaLoader implements Observed {
  private selectedImage: BehaviorSubject<Event | null>;
  private unsubscribe!: Subject<void>;

  constructor(
    public images: Array<HTMLImageElement>,
    public overlay: Element,
    public carouselImages: Array<HTMLImageElement>
  ) {
    super();
    this.images = images;
    this.overlay = overlay;
    this.carouselImages = carouselImages;

    this.unsubscribe = new Subject<void>();
    this.selectedImage = new BehaviorSubject<Event | null>(null);
    this.listenForUnload();
    this.init();
  }

  public init(): void {
    this.queryImagesObservable(".gallery-img").forEach((i: Observable<Event>) =>
      i.subscribe()
    );
    this.queryOverlayObservable().subscribe();
    this.selectedImage
      .asObservable()
      .pipe(
        takeUntil(this.unsubscribe),
        concatMap(e => {
          if (e && e.srcElement) {
            const s: HTMLImageElement = e.srcElement as HTMLImageElement;
            return of(s);
          } else {
            return EMPTY;
          }
        }),
        map((signal: HTMLImageElement) => {
          if (signal && signal.attributes) {
            return signal.attributes.getNamedItem("src");
          }
        })
      )
      .subscribe(signal => {
        if (signal) {
          const selectedImageSrc = signal.value;
          const carouselImageContainer = this.carouselImages.find(
            this.findSelectedImageInCarousel(selectedImageSrc)
          );

          if (carouselImageContainer) {
            const image = carouselImageContainer.querySelector("img");
            if (image) {
              this.replaceAttr(image, "data-src", "src");
            }
          }
        }
      });
  }

  private findSelectedImageInCarousel(
    selectedImageSrc: string
  ): (
    value: HTMLImageElement,
    index: number,
    obj: HTMLImageElement[]
  ) => HTMLElement | undefined {
    return imageContainer => {
      const image = imageContainer.querySelector("img");
      if (image == null) {
        throw "Image container must contain an image";
      }
      const carouselDataSrc = image.attributes.getNamedItem("data-src");
      if (carouselDataSrc && carouselDataSrc.value === selectedImageSrc) {
        return image;
      }
    };
  }

  public listenForUnload(): Subscription {
    return fromEvent(window, "unload")
      .pipe(
        tap(() => this.unsubscribe.next()),
        take(1)
      )
      .subscribe(() => {});
  }

  private queryImagesObservable(className: string): Array<Observable<Event>> {
    const images = <HTMLImageElement[]>(
      Array.from(document.querySelectorAll(className))
    );
    const imageObservables: Array<Observable<Event>> = images.map(
      (i: HTMLImageElement) =>
        fromEvent(i, "click").pipe(
          takeUntil(this.unsubscribe),
          tap(e => e.preventDefault()),
          tap(e => this.selectedImage.next(e)),
          tap(() => this.showOverlay())
        )
    );
    return imageObservables;
  }

  private queryOverlayObservable(): Observable<Event> {
    const overlayObservable: Observable<Event> = fromEvent(
      this.overlay,
      "click"
    ).pipe(
      takeUntil(this.unsubscribe),
      tap(e => e.preventDefault()),
      tap(() => {
        this.hideOverlay();
        this.resetState();
      })
    );

    return overlayObservable;
  }

  private resetState() {
    this.selectedImage.next(null);
  }

  private showOverlay(): void {
    this.overlay.classList.remove("hide");
  }

  private hideOverlay(): void {
    this.overlay.classList.add("hide");
  }
}
