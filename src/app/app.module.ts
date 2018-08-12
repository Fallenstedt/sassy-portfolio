import { NgtUniversalModule } from "@ng-toolkit/universal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { NavModule } from "./nav/nav.module";
import { FooterModule } from "./footer/footer.module";
import { AppComponent } from "./app.component";
import { HomeModule } from "./home/home.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    NgtUniversalModule,
    HomeModule,
    AppRoutingModule,
    NavModule,
    FooterModule
  ],
  providers: []
})
export class AppModule {}
