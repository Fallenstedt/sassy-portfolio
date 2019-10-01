import { fromEvent, Observable, Subject, throwError } from "rxjs";
import { takeUntil, tap, take, scan } from "rxjs/operators";

export class Gallery {
  private unsubscribe!: Subject<void>;
  private images!: Array<Observable<Event>>;
  private overlay!: Element | null;

  constructor() {
    this.unsubscribe = new Subject<void>();
    this.images = this.queryImages(".gallery-img");

    this.overlay = this.getElement(".gallery-overlay");
    this.listenForUnload();
    this.init();
  }

  private init(): void {
    this.images.forEach((i: Observable<Event>) => i.subscribe());
  }

  private listenForUnload() {
    return fromEvent(window, "unload")
      .pipe(
        tap(() => this.unsubscribe.next()),
        take(1)
      )
      .subscribe(() => {});
  }

  private queryImages(className: string): Array<Observable<Event>> {
    const images = <HTMLImageElement[]>(
      Array.from(document.querySelectorAll(className))
    );
    const imageObservables: Array<Observable<Event>> = images.map(
      (i: HTMLImageElement) =>
        fromEvent(i, "click").pipe(
          takeUntil(this.unsubscribe),
          tap(i => console.log(i, "was clicked")),
          tap(() => this.showOverlay())
        )
    );
    return imageObservables;
  }

  private showOverlay() {
    if (this.overlay) {
      this.overlay.classList.remove("hide");
    }
  }

  private getElement(className: string): Element | null {
    const element = document.querySelector(className);
    return element;
  }
}
