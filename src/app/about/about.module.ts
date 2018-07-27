import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AboutRoutingModule } from "./about-routing.module";
import { AboutTestComponent } from "./about-test/about-test.component";

@NgModule({
  imports: [CommonModule, AboutRoutingModule],
  declarations: [AboutTestComponent]
})
export class AboutModule {}
