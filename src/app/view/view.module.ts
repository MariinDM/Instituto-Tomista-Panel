import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { CommunityComponent } from './community/community.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DevicesComponent } from './devices/devices.component';
import { ProfileComponent } from './profile/profile.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { ViewsComponent } from './views/views.component';
import { ViewsrolesComponent } from './viewsroles/viewsroles.component';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { AssignViewsrolesComponent } from './viewsroles/dialog/assign-viewsroles/assign-viewsroles.component';
import { CategoryDialogComponent } from './categories/category-dialog/category-dialog.component';
import { RoleDialogComponent } from './roles/role-dialog/role-dialog.component';
import { ViewDialogComponent } from './views/view-dialog/view-dialog.component';
import { UserDialogComponent } from './users/user-dialog/user-dialog.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { UserUpdateDialogComponent } from './users/user-update-dialog/user-update-dialog.component';


@NgModule({
  declarations: [
    CategoriesComponent,
    CommunityComponent,
    DashboardComponent,
    DevicesComponent,
    ProfileComponent,
    RolesComponent,
    UsersComponent,
    ViewsComponent,
    ViewsrolesComponent,
    AssignViewsrolesComponent,
    CategoryDialogComponent,
    RoleDialogComponent,
    ViewDialogComponent,
    UserDialogComponent,
    ChangePasswordComponent,
    UserUpdateDialogComponent,
  ],
  imports: [
    CommonModule,
    ViewRoutingModule,
    MaterialModule,
    SharedModule
    
  ]
})
export class ViewModule { }
