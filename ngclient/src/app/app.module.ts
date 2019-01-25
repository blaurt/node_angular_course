import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SideLayoutComponent } from './shared/layouts/side-layout/side-layout.component';
import { RegisterPageComponent } from './register-page/register-page.component';

@NgModule({
  declarations: [AppComponent, LoginPageComponent, AuthLayoutComponent, SideLayoutComponent, RegisterPageComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
