import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavContainerComponent } from "./nav-container/nav-container.component";

@NgModule({
  imports: [CommonModule],
  exports: [NavContainerComponent],
  declarations: [NavContainerComponent]
})
export class NavModule {}
