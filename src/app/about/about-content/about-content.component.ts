import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Hover, HoverOpts } from "./hover";
import { Subscription, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-about-content",
  templateUrl: "./about-content.component.html",
  styleUrls: ["./about-content.component.scss"]
})
export class AboutContentComponent implements OnInit, OnDestroy {
  @ViewChild("gridItem") gridItem;
  hover: Hover;
  displacement: string;
  isLoaded$: Subscription;
  destroyed$ = new Subject<boolean>();

  constructor() {
    this.displacement = "/assets/img/displacement/5.jpg";
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  ngOnInit() {
    const images: Array<HTMLElement> = Array.from(
      this.gridItem.nativeElement.querySelectorAll("img")
    );
    const opts: HoverOpts = {
      parent: this.gridItem.nativeElement,
      dispImg: this.displacement,
      img1: images[0].getAttribute("src"),
      img2: images[1].getAttribute("src")
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
}
