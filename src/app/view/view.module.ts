import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { RoleDialogComponent } from './roles/role-dialog/role-dialog.component';
import { UserDialogComponent } from './users/user-dialog/user-dialog.component';
import { QRCodeModule } from 'angularx-qrcode';

//PIPE
import { LimitToPipe } from 'src/app/shared/pipes/limit-to.pipe'
import { NewLinePipe } from '../shared/pipes/new-line.pipe';

import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { EducationLevelsComponent } from './education-levels/education-levels.component';
import { GradesComponent } from './grades/grades.component';
import { SectionsComponent } from './sections/sections.component';
import { GroupsComponent } from './groups/groups.component';
import { GradeDialogComponent } from './grades/grade-dialog/grade-dialog.component';
import { SectionDialogComponent } from './sections/section-dialog/section-dialog.component';
import { GroupDialogComponent } from './groups/group-dialog/group-dialog.component';
import { LevelDialogComponent } from './education-levels/level-dialog/level-dialog.component';
import { QuestionsComponent } from './questions/questions.component';
import { DialogQuestionsComponent } from './questions/dialog-questions/dialog-questions.component';
import { LessonsComponent } from './lessons/lessons.component';
import { DialogLessonComponent } from './lessons/dialog-lesson/dialog-lesson.component';
import { ProfileComponentDash } from '../profile/profile.component';
import { ProfileComponent } from './profile/profile.component';
import { TestsComponent } from './tests/tests.component';
import { DialogTestComponent } from './tests/dialog-test/dialog-test.component';
import { TestsQuestionsComponent } from './tests-questions/tests-questions.component';
import { DialogTestQuestionsComponent } from './tests-questions/dialog-test-questions/dialog-test-questions.component';
import { GetFilesComponent } from './get-files/get-files.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};

@NgModule({
  declarations: [
    DashboardComponent,
    LevelDialogComponent,
    RolesComponent,
    ProfileComponent,
    UsersComponent,
    RoleDialogComponent,
    UserDialogComponent,
    LimitToPipe,
    NewLinePipe,
    EducationLevelsComponent,
    GradesComponent,
    SectionsComponent,
    GroupsComponent,
    GradeDialogComponent,
    SectionDialogComponent,
    GroupDialogComponent,
    QuestionsComponent,
    DialogQuestionsComponent,
    LessonsComponent,
    DialogLessonComponent,
    ProfileComponentDash,
    TestsComponent,
    DialogTestComponent,
    TestsQuestionsComponent,
    DialogTestQuestionsComponent,
    GetFilesComponent
  ],
  imports: [
    CommonModule,
    ViewRoutingModule,
    MaterialModule,
    SharedModule,
    QRCodeModule,
    PerfectScrollbarModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    DatePipe
  ]
})
export class ViewModule { }
