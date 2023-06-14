import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { GradesComponent } from './grades/grades.component';
import { SectionsComponent } from './sections/sections.component';
import { GroupsComponent } from './groups/groups.component';
import { EducationLevelsComponent } from './education-levels/education-levels.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { AdminRolGuard } from '../guards/admin-rol.guard';
const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [] },
  { path: 'users', component: UsersComponent, canActivate: [AdminRolGuard] },
  { path: 'roles', component: RolesComponent, canActivate: [AdminRolGuard] },
  { path: 'grades', component: GradesComponent, canActivate: [AdminRolGuard] },
  { path: 'sections', component: SectionsComponent, canActivate: [AdminRolGuard] },
  { path: 'groups', component: GroupsComponent, canActivate: [AdminRolGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AdminRolGuard] },
  { path: 'education-levels', component: EducationLevelsComponent, canActivate: [AdminRolGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
