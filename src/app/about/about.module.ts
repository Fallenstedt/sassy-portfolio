import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AboutRoutingModule } from "./about-routing.module";
import { AboutContainerComponent } from "./about-container/about-container.component";
import { AboutContentComponent } from "./about-content/about-content.component";

@NgModule({
  imports: [CommonModule, AboutRoutingModule],
  declarations: [AboutContainerComponent, AboutContentComponent]
})
export class AboutModule {}
