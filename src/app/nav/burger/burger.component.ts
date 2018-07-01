import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-burger",
  templateUrl: "./burger.component.html",
  styleUrls: ["./burger.component.scss"]
})
export class BurgerComponent implements OnInit {
  public isNavOpen: boolean;
  @Output() burgerClickEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor() {
    this.isNavOpen = false;
  }

  ngOnInit() {}

  public handleBurgerClick() {
    this.isNavOpen = !this.isNavOpen;
    this.burgerClickEmitter.emit(this.isNavOpen);
  }
}
