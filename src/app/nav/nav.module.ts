import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavContainerComponent } from "./nav-container/nav-container.component";
import { BurgerComponent } from "./burger/burger.component";
import { LogoComponent } from "./logo/logo.component";
import { NavOverlayComponent } from "./nav-overlay/nav-overlay.component";

@NgModule({
  imports: [CommonModule],
  exports: [NavContainerComponent],
  declarations: [
    NavContainerComponent,
    BurgerComponent,
    LogoComponent,
    NavOverlayComponent
  ]
})
export class NavModule {}
