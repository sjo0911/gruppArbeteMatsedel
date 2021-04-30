import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';

const routes: Routes = [
  {path:  '', redirectTo: '/', pathMatch: 'full'},
  { path: 'menu/:menuId', component: MenuComponent },
  { path: 'menu/:menuId/week/:weekNr', component: MenuComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
