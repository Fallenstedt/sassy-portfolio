import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-nav-container",
  templateUrl: "./nav-container.component.html",
  styleUrls: ["./nav-container.component.scss"]
})
export class NavContainerComponent implements OnInit {
  isNavOpen: boolean;
  constructor(public router: Router) {
    this.isNavOpen = false;
  }

  ngOnInit() {}

  public toggleNav(e: boolean): void {
    this.isNavOpen = e;
  }

  public navigateHome(): void {
    this.router.navigateByUrl("/");
  }
}
