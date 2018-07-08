import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { EventManager } from "@angular/platform-browser";

@Component({
  selector: "app-overlay",
  templateUrl: "./nav-overlay.component.html",
  styleUrls: ["./nav-overlay.component.scss"]
})
export class NavOverlayComponent implements OnInit {
  @Input() isNavOpen: boolean;
  @Output() overlayClickEmitter: EventEmitter<boolean>;

  constructor() {
    this.overlayClickEmitter = new EventEmitter();
  }

  ngOnInit() {}

  public onOverlayClick(): void {
    console.log("hi");
    this.overlayClickEmitter.emit(false);
  }
}
