import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { NavModule } from "./nav/nav.module";
import { AppComponent } from "./app.component";
import { HomeModule } from "./home/home.module";
import { AboutComponent } from "./about/about.component";

@NgModule({
  declarations: [AppComponent, AboutComponent],
  imports: [BrowserModule, HomeModule, AppRoutingModule, NavModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
