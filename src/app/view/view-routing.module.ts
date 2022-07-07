import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRolGuard } from '../guards/admin-rol.guard';
import { CalculatorComponent } from './calculator/calculator.component';
import { CategoriesComponent } from './categories/categories.component';
import { CommunityComponent } from './community/community.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ControllerVersionsComponent } from './devices_views/controller-versions/controller-versions.component';
import { DeviceTypesComponent } from './devices_views/device-types/device-types.component';
import { DeviceVersionsComponent } from './devices_views/device-versions/device-versions.component';
import { DevicesComponent } from './devices_views/devices/devices.component';
import { FirmwareVersionsComponent } from './devices_views/firmware-versions/firmware-versions.component';
import { HardwareVersionsComponent } from './devices_views/hardware-versions/hardware-versions.component';
import { ModelsComponent } from './devices_views/models/models.component';
import { NecessitiesComponent } from './devices_views/necessities/necessities.component';
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

  { path: 'user/devices', component: DevicesComponent },
  { path: 'user/profile', component: ProfileComponent },

  { path: 'admin/users', component: UsersComponent },
  { path: 'admin/categories', component: CategoriesComponent, canActivate:[AdminRolGuard]},
  { path: 'admin/views', component: ViewsComponent, canActivate:[AdminRolGuard]},
  { path: 'admin/roles', component: RolesComponent, canActivate:[AdminRolGuard]},
  { path: 'admin/viewsroles', component: ViewsrolesComponent, canActivate:[AdminRolGuard]},
  { path: 'admin/community', component: CommunityComponent },
  { path: 'admin/tutorials', component: TutorialsComponent },
  { path: 'admin/tips', component: TipsComponent },
  { path: 'admin/faqs', component: FaqsComponent },
  { path: 'admin/calculator', component: CalculatorComponent },

  { path: 'devices/controller_version', component:ControllerVersionsComponent , canActivate:[AdminRolGuard]},
  { path: 'devices/device_type', component:DeviceTypesComponent , canActivate:[AdminRolGuard]},
  { path: 'devices/device_version', component:DeviceVersionsComponent , canActivate:[AdminRolGuard]},
  { path: 'devices/devices_general', component:DevicesComponent , canActivate:[AdminRolGuard]},
  { path: 'devices/firmware_version', component:FirmwareVersionsComponent , canActivate:[AdminRolGuard]},
  { path: 'devices/hardware_version', component:HardwareVersionsComponent , canActivate:[AdminRolGuard]},
  { path: 'devices/models', component:ModelsComponent , canActivate:[AdminRolGuard]},
  { path: 'devices/necessities', component:NecessitiesComponent , canActivate:[AdminRolGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
