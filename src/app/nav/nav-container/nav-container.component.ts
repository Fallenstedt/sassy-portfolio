import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-nav-container",
  templateUrl: "./nav-container.component.html",
  styleUrls: ["./nav-container.component.scss"]
})
export class NavContainerComponent implements OnInit {
  isNavOpen: boolean;

  constructor() {
    this.isNavOpen = false;
  }

  ngOnInit() {}

  public toggleNav(): void {
    this.isNavOpen = !this.isNavOpen;
  }
}
