import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};

@NgModule({
  declarations: [
    DashboardComponent,
    RolesComponent,
    UsersComponent,
    RoleDialogComponent,
    UserDialogComponent,
    LimitToPipe,
    NewLinePipe,
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
    }
  ]
})
export class ViewModule { }
