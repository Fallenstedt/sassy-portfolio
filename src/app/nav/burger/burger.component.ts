import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-burger",
  templateUrl: "./burger.component.html",
  styleUrls: ["./burger.component.scss"]
})
export class BurgerComponent implements OnInit {
  @Input() isNavOpen: boolean;
  @Output() burgerClickEmitter: EventEmitter<boolean> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  public handleBurgerClick() {
    this.burgerClickEmitter.emit(true);
  }
}
