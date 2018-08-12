import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from "@angular/core";
import { Scene } from "./scene/index.js";

@Component({
  selector: "app-home-scene",
  templateUrl: "./home-scene.component.html",
  styleUrls: ["./home-scene.component.scss"]
})
export class HomeSceneComponent implements OnInit, OnDestroy {
  @ViewChild("scene", { read: ElementRef })
  scene: ElementRef;
  sceneManger: Scene | undefined;
  constructor() {}
  ngOnInit() {
    this.sceneManger = new Scene(this.scene.nativeElement);
    console.log(this.sceneManger);
  }

  ngOnDestroy() {
    this.sceneManger.cleanUp();
    this.sceneManger = undefined;
  }
}
