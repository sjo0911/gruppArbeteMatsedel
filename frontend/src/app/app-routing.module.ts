import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHeaderComponent } from './pages/admin/admin-header/admin-header.component';
import { AdminMealsComponent } from './pages/admin/admin-meals/admin-meals.component';
import { AdminMenusComponent } from './pages/admin/admin-menus/admin-menus.component';
import { AdminSchoolsComponent } from './pages/admin/admin-schools/admin-schools.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';

const routes: Routes = [
  { path:  '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: MenuComponent },
  { path: 'login', component: LoginComponent },
  { path: 'adminMeals', component: AdminMealsComponent },
  { path: 'adminSchools', component: AdminSchoolsComponent },
  { path: 'adminMenus', component: AdminMenusComponent },
  { path: 'admin', component: AdminHeaderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
