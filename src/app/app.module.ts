import { NgtUniversalModule } from '@ng-toolkit/universal';
import { CommonModule } from '@angular/common';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { NavModule } from "./nav/nav.module";
import { AppComponent } from "./app.component";
import { HomeModule } from "./home/home.module";
import { AboutComponent } from "./about/about.component";

@NgModule({
  declarations: [AppComponent, AboutComponent],
  imports:[
 CommonModule,
NgtUniversalModule,
  HomeModule, AppRoutingModule, NavModule],
  providers: [],
})
export class AppModule {}
