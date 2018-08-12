import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterContainerComponent } from "./footer-container/footer.component";

@NgModule({
  imports: [CommonModule],
  declarations: [FooterContainerComponent],
  exports: [FooterContainerComponent]
})
export class FooterModule {}
