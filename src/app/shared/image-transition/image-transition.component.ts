import { Component, OnInit, OnDestroy, ViewChild, Input } from "@angular/core";
import { Hover, HoverOpts } from "./hover";
import { Subscription, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-image-transition",
  templateUrl: "./image-transition.component.html",
  styleUrls: ["./image-transition.component.scss"]
})
export class ImageTransitionComponent implements OnInit, OnDestroy {
  @ViewChild("imageContainer") imageContainer;
  @Input() image1: string;
  @Input() image2: string;
  parsedStyles: object;
  hover: Hover;
  isLoaded$: Subscription;
  destroyed$ = new Subject<boolean>();
  private displacement: string;

  constructor() {
    this.displacement = "/assets/img/displacement/5.jpg";
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  ngOnInit() {
    const opts: HoverOpts = {
      parent: this.imageContainer.nativeElement,
      dispImg: this.displacement,
      img1: this.image1,
      img2: this.image2
    };

    this.hover = new Hover(opts);
    this.isLoaded$ = this.hover.isDoneLoading
      .pipe(takeUntil(this.destroyed$))
      .subscribe(n => {
        console.log(n);
        if (n === 1) {
          console.log("DONE LOADING");
        }
      });
  }

  public is500() {
    return true;
  }
}
