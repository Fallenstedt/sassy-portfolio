import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { HomeContainerComponent } from "./home-container/home-container.component";
import { HomeSceneComponent } from "./home-scene/home-scene.component";

const routes: Routes = [
  {
    path: "",
    component: HomeContainerComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [HomeContainerComponent, HomeSceneComponent]
})
export class HomeModule {}
