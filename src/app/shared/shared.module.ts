import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ImageTransitionComponent } from "./image-transition/image-transition.component";

@NgModule({
  imports: [CommonModule],
  declarations: [ImageTransitionComponent],
  exports: [ImageTransitionComponent]
})
export class SharedModule {}
