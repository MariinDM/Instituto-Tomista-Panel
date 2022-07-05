import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRolGuard } from '../guards/admin-rol.guard';
import { CalculatorComponent } from './calculator/calculator.component';
import { CategoriesComponent } from './categories/categories.component';
import { CommunityComponent } from './community/community.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DevicesComponent } from './devices/devices.component';
import { FaqsComponent } from './faqs/faqs.component';
import { ProfileComponent } from './profile/profile.component';
import { RolesComponent } from './roles/roles.component';
import { TipsComponent } from './tips/tips.component';
import { TutorialsComponent } from './tutorials/tutorials.component';
import { UsersComponent } from './users/users.component';
import { ViewsComponent } from './views/views.component';
import { ViewsrolesComponent } from './viewsroles/viewsroles.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  
  { path: 'user/dispositivos', component: DevicesComponent },
  { path: 'user/profile', component: ProfileComponent },

  { path: 'gestion/usuarios', component: UsersComponent },
  { path: 'gestion/categorias', component: CategoriesComponent, canActivate:[AdminRolGuard]},
  { path: 'gestion/vistas', component: ViewsComponent, canActivate:[AdminRolGuard]},
  { path: 'gestion/roles', component: RolesComponent, canActivate:[AdminRolGuard]},
  { path: 'gestion/vistaroles', component: ViewsrolesComponent, canActivate:[AdminRolGuard]},
  { path: 'gestion/comunidad', component: CommunityComponent },
  { path: 'gestion/tutoriales', component: TutorialsComponent },
  { path: 'gestion/tips', component: TipsComponent },
  { path: 'gestion/faqs', component: FaqsComponent },
  { path: 'gestion/calculator', component: CalculatorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
