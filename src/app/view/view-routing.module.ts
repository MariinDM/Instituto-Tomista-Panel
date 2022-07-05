import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRolGuard } from '../guards/admin-rol.guard';
import { CalculatorComponent } from './calculator/calculator.component';
import { CategoriesComponent } from './categories/categories.component';
import { CommunityComponent } from './community/community.component';
import { DashboardComponent } from './dashboard/dashboard.component';
<<<<<<< HEAD
import { ControllerVersionsComponent } from './devices_views/controller-versions/controller-versions.component';
import { DeviceTypesComponent } from './devices_views/device-types/device-types.component';
import { DeviceVersionsComponent } from './devices_views/device-versions/device-versions.component';
import { DevicesComponent } from './devices_views/devices/devices.component';
import { FirmwareVersionsComponent } from './devices_views/firmware-versions/firmware-versions.component';
import { HardwareVersionsComponent } from './devices_views/hardware-versions/hardware-versions.component';
import { ModelsComponent } from './devices_views/models/models.component';
import { NecessitiesComponent } from './devices_views/necessities/necessities.component';
=======
import { DevicesComponent } from './devices/devices.component';
import { FaqsComponent } from './faqs/faqs.component';
>>>>>>> 9db0b87993692b1e16ebc2d39d15ce3bc3d80126
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
<<<<<<< HEAD

  { path: 'devices/controller_version', component:ControllerVersionsComponent , canActivate:[AdminRolGuard]},
  { path: 'devices/device_type', component:DeviceTypesComponent , canActivate:[AdminRolGuard]},
  { path: 'devices/device_version', component:DeviceVersionsComponent , canActivate:[AdminRolGuard]},
  { path: 'devices/devices_general', component:DevicesComponent , canActivate:[AdminRolGuard]},
  { path: 'devices/firmware_version', component:FirmwareVersionsComponent , canActivate:[AdminRolGuard]},
  { path: 'devices/hardware_version', component:HardwareVersionsComponent , canActivate:[AdminRolGuard]},
  { path: 'devices/models', component:ModelsComponent , canActivate:[AdminRolGuard]},
  { path: 'devices/necessities', component:NecessitiesComponent , canActivate:[AdminRolGuard]},
=======
  { path: 'gestion/tutoriales', component: TutorialsComponent },
  { path: 'gestion/tips', component: TipsComponent },
  { path: 'gestion/faqs', component: FaqsComponent },
  { path: 'gestion/calculator', component: CalculatorComponent },
>>>>>>> 9db0b87993692b1e16ebc2d39d15ce3bc3d80126
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
