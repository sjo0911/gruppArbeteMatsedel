import { DayComponent } from './pages/menu/day/day.component';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './pages/menu/menu.component';
import { FooterComponent } from './pages/footer/footer.component';
import { AdminMealsComponent } from './pages/admin/admin-meals/admin-meals.component';
import sv from '@angular/common/locales/sv';
import { registerLocaleData } from '@angular/common';
import { AdminSchoolsComponent } from './pages/admin/admin-schools/admin-schools.component';
import { AdminMenusComponent } from './pages/admin/admin-menus/admin-menus.component';
import { AdminHeaderComponent } from './pages/admin/admin-header/admin-header.component';
import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { LogoutComponent } from './pages/logout/logout.component';
import { LoginFailedComponent } from './pages/login-failed/login-failed.component';
import { CreateMenuComponent } from './pages/admin/admin-menus/create-menu/create-menu.component';
import { UpdateMenuComponent } from './pages/admin/admin-menus/update-menu/update-menu.component';
import { DeleteMenuComponent } from './pages/admin/admin-menus/delete-menu/delete-menu.component';
import { AddMenuComponent } from './pages/admin/admin-schools/add-menu/add-menu.component';
import { RemoveMenuComponent } from './pages/admin/admin-schools/remove-menu/remove-menu.component';
import { Alert } from 'src/assets/alert';
import { UserAccountComponent } from './pages/admin/user-account/user-account.component';

registerLocaleData(sv);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    AdminMealsComponent,
    AdminSchoolsComponent,
    AdminMenusComponent,
    AdminHeaderComponent,
    LogoutComponent,
    LoginFailedComponent,
    DayComponent,
    CreateMenuComponent,
    UpdateMenuComponent,
    DeleteMenuComponent,
    AddMenuComponent,
    RemoveMenuComponent,
    UserAccountComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-fx63i2zd.eu.auth0.com',
      clientId: '8XXjf29gD9QThRz9HuV6UOms71EOI7Px',
      audience: 'https://dev-fx63i2zd.eu.auth0.com/api/v2/',
      cacheLocation:"localstorage",
      httpInterceptor: {
        allowedList: [

          {
            // Match any request that starts 'https://dev-fx63i2zd.eu.auth0.com/api/v2/' (note the asterisk)
            uri: 'http://localhost:3000/private/*',
            tokenOptions: {
              // The attached token should target this audience
              audience: 'https://dev-fx63i2zd.eu.auth0.com/api/v2/',

            }
          }
        ]

      }
    })

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }, { provide: LOCALE_ID, useValue: "sv" }, { provide: Alert}],
  bootstrap: [AppComponent]
})
export class AppModule { }
