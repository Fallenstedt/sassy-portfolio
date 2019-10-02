import { fromEvent, Observable, Subject, BehaviorSubject } from "rxjs";
import { takeUntil, tap, take } from "rxjs/operators";
import { Observed } from "./observed";

export class Gallery implements Observed {
  private selectedImage: BehaviorSubject<Event | null>;
  private unsubscribe!: Subject<void>;

  constructor(public images: Array<HTMLImageElement>, public overlay: Element) {
    this.images = images;
    this.overlay = overlay;

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
  }

  public listenForUnload() {
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
          tap(i => this.selectedImage.next(i)),
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
      tap(() => console.log("overlay was clicked")),
      tap(() => this.hideOverlay())
    );

    return overlayObservable;
  }

  private showOverlay(): void {
    this.overlay.classList.remove("hide");
  }

  private hideOverlay(): void {
    this.overlay.classList.add("hide");
  }
}
