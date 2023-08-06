import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { GradesComponent } from './grades/grades.component';
import { SectionsComponent } from './sections/sections.component';
import { GroupsComponent } from './groups/groups.component';
import { EducationLevelsComponent } from './education-levels/education-levels.component';
import { AdminRolGuard } from '../guards/admin-rol.guard';
import { ProfileComponentDash } from '../profile/profile.component';
import { LessonsComponent } from './lessons/lessons.component';
import { QuestionsComponent } from './questions/questions.component';
import { TestsComponent } from './tests/tests.component';
import { TestsQuestionsComponent } from './tests-questions/tests-questions.component';
import { UserGroupLessonsComponent } from './user-group-lessons/user-group-lessons.component';
import { EvaluationsComponent } from './evaluations/evaluations.component';
import { EncuestasComponent } from './encuestas/encuestas.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [] },
  { path: 'users', component: UsersComponent, canActivate: [] },
  { path: 'roles', component: RolesComponent, canActivate: [AdminRolGuard] },
  { path: 'grades', component: GradesComponent, canActivate: [AdminRolGuard] },
  { path: 'sections', component: SectionsComponent, canActivate: [AdminRolGuard] },
  { path: 'groups', component: GroupsComponent, canActivate: [AdminRolGuard] },
  { path: 'profile', component: ProfileComponentDash, canActivate: [] },
  { path: 'education-levels', component: EducationLevelsComponent, canActivate: [AdminRolGuard] },
  { path: 'lessons', component: LessonsComponent, canActivate: [AdminRolGuard] },
  { path: 'questions', component: QuestionsComponent, canActivate: [AdminRolGuard] },
  { path: 'tests', component: TestsComponent, canActivate: [AdminRolGuard] },
  { path: 'tests-questions', component: TestsQuestionsComponent, canActivate: [AdminRolGuard] },
  { path: 'user-lessons', component: UserGroupLessonsComponent, canActivate: [AdminRolGuard] },
  { path: 'evaluations', component: EvaluationsComponent, canActivate: [] },
  { path: 'answers', component: EncuestasComponent, canActivate: [] },

  // { path: 'profile', component: ProfileComponent, canActivate: [] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
