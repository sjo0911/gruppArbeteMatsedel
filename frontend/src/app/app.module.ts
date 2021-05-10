import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { MenuComponent } from './pages/menu/menu.component';
import { FooterComponent } from './pages/footer/footer.component';
import { AdminMealsComponent } from './pages/admin/admin-meals/admin-meals.component';
import sv from '@angular/common/locales/sv';
import { registerLocaleData } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { AdminSchoolsComponent } from './pages/admin/admin-schools/admin-schools.component';
import { AdminMenusComponent } from './pages/admin/admin-menus/admin-menus.component';

registerLocaleData(sv);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    AdminMealsComponent,
    LoginComponent,
    AdminSchoolsComponent,
    AdminMenusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: "sv" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
