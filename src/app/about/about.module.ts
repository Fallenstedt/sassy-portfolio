import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AboutRoutingModule } from "./about-routing.module";
import { AboutContainerComponent } from "./about-container/about-container.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [CommonModule, AboutRoutingModule, SharedModule],
  declarations: [AboutContainerComponent]
})
export class AboutModule {}
