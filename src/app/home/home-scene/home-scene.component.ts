import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Scene } from "./scene/index.js";

@Component({
  selector: "app-home-scene",
  templateUrl: "./home-scene.component.html",
  styleUrls: ["./home-scene.component.scss"]
})
export class HomeSceneComponent implements OnInit {
  @ViewChild("scene", { read: ElementRef })
  scene: ElementRef;

  constructor() {}

  ngOnInit() {
    this.sceneInit();
  }

  private sceneInit() {
    return new Scene(this.scene.nativeElement);
  }
}
