import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-logo",
  templateUrl: "./logo.component.html",
  styleUrls: ["./logo.component.scss"]
})
export class LogoComponent implements OnInit {
  @Input() isNavOpen: boolean;
  @Output() logoClickEmitter: EventEmitter<boolean>;

  constructor() {
    this.logoClickEmitter = new EventEmitter();
  }

  ngOnInit() {}

  public onNavClick(): void {
    this.logoClickEmitter.emit(true);
  }
}
