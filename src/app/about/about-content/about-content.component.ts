import { Component, OnInit, ViewChild } from "@angular/core";
import { Hover, HoverOpts } from "./hover";
@Component({
  selector: "app-about-content",
  templateUrl: "./about-content.component.html",
  styleUrls: ["./about-content.component.scss"]
})
export class AboutContentComponent implements OnInit {
  @ViewChild("gridItem") gridItem;
  hover: Hover;
  displacement: string;
  constructor() {
    this.displacement = "/assets/img/displacement/5.jpg";
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
  }
}
