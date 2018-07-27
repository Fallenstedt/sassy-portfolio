import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AboutTestComponent } from "./about-test/about-test.component";

const routes: Routes = [
  {
    path: "",
    component: AboutTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule {}
