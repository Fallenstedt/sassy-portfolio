import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-logo",
  templateUrl: "./logo.component.html",
  styleUrls: ["./logo.component.scss"]
})
export class LogoComponent implements OnInit {
  @Output() logoClickEmitter: EventEmitter<boolean>;

  constructor() {
    this.logoClickEmitter = new EventEmitter();
  }

  ngOnInit() {}

  public onNavClick() {
    this.logoClickEmitter.emit(true);
  }
}
