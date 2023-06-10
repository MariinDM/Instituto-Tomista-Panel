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
const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [] },
  { path: 'users', component: UsersComponent, canActivate: [] },
  { path: 'roles', component: RolesComponent, canActivate: [] },
  { path: 'grades', component: GradesComponent, canActivate: [] },
  { path: 'sections', component: SectionsComponent, canActivate: [] },
  { path: 'groups', component: GroupsComponent, canActivate: [] },
  { path: 'profile', component: ProfileComponent, canActivate: [] },
  { path: 'education-levels', component: EducationLevelsComponent, canActivate: [] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
