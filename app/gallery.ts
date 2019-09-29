import { fromEvent, Observable, Subject } from "rxjs";
import { takeUntil, tap, take } from "rxjs/operators";

export class Gallery {
  private unsubscribe!: Subject<void>;
  private images!: Array<Observable<Event>>;

  constructor() {
    this.unsubscribe = new Subject<void>();
    this.images = this.queryImages(".gallery-img");
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
          tap(i => console.log(i, "was clicked"))
        )
    );
    return imageObservables;
  }
}
