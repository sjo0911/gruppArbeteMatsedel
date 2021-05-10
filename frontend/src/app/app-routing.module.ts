import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMealsComponent } from './pages/admin/admin-meals/admin-meals.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';

const routes: Routes = [
  { path:  '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: MenuComponent },
  { path: 'adminMeals', component: AdminMealsComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
