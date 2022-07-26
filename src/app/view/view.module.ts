import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { CommunityComponent } from './community/community.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DevicesComponent } from './devices_views/devices/devices.component';
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
import { ChangePictureComponent } from './profile/change-picture/change-picture.component';
import { NecessitiesComponent } from './devices_views/necessities/necessities.component';
import { ControllerVersionsComponent } from './devices_views/controller-versions/controller-versions.component';
import { ModelsComponent } from './devices_views/models/models.component';
import { FirmwareVersionsComponent } from './devices_views/firmware-versions/firmware-versions.component';
import { HardwareVersionsComponent } from './devices_views/hardware-versions/hardware-versions.component';
import { DeviceTypesComponent } from './devices_views/device-types/device-types.component';
import { DeviceVersionsComponent } from './devices_views/device-versions/device-versions.component';
import { ControllerVersionDialogComponent } from './devices_views/dialogs/controller-version-dialog/controller-version-dialog.component';
import { HardwareVersionDialogComponent } from './devices_views/dialogs/hardware-version-dialog/hardware-version-dialog.component';
import { DeviceVersionDialogComponent } from './devices_views/dialogs/device-version-dialog/device-version-dialog.component';
import { DeviceTypeDialogComponent } from './devices_views/dialogs/device-type-dialog/device-type-dialog.component';
import { NecessitieDialogComponent } from './devices_views/dialogs/necessitie-dialog/necessitie-dialog.component';
import { ModelDialogComponent } from './devices_views/dialogs/model-dialog/model-dialog.component';
import { DevicesDialogComponent } from './devices_views/dialogs/devices-dialog/devices-dialog.component';
import { ModelNecessitiesDialogComponent } from './devices_views/dialogs/model-necessities-dialog/model-necessities-dialog.component';
import { DeviceCalibrationDialogComponent } from './devices_views/dialogs/device-calibration-dialog/device-calibration-dialog.component';
import { FirmawareVersionDialogComponent } from './devices_views/dialogs/firmaware-version-dialog/firmaware-version-dialog.component';
import { TutorialsComponent } from './tutorials/tutorials.component';
import { TutorialDialogComponent } from './tutorials/tutorial-dialog/tutorial-dialog.component';
import { TipsComponent } from './tips/tips.component';
import { TipDialogComponent } from './tips/tip-dialog/tip-dialog.component';
import { FaqsComponent } from './faqs/faqs.component';
import { FaqDialogComponent } from './faqs/faq-dialog/faq-dialog.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { CalculatorDialogComponent } from './calculator/calculator-dialog/calculator-dialog.component';
import { GetFilesComponent } from './get-files/get-files.component';
import { ModelNecessitiesComponent } from './devices_views/dialogs/model-necessities/model-necessities.component';
import { DeviceCalibrationComponent } from './devices_views/device-calibration/device-calibration.component';
import { SalesComponent } from './sales_views/sales/sales.component';
import { DealersComponent } from './sales_views/dealers/dealers.component';
import { ClientsComponent } from './sales_views/clients/clients.component';
import { RegionsComponent } from './sales_views/regions/regions.component';
import { ClientDialogComponent } from './sales_views/dialogs/client-dialog/client-dialog.component';
import { RegionDialogComponent } from './sales_views/dialogs/region-dialog/region-dialog.component';
import { SalesDialogComponent } from './sales_views/dialogs/sales-dialog/sales-dialog.component';
import { DealerDialogComponent } from './sales_views/dialogs/dealer-dialog/dealer-dialog.component';
import { QuestionsComponent } from './quizes_views/questions/questions.component';
import { QuestionsDialogComponent } from './quizes_views/questions/questions-dialog/questions-dialog.component';
import { EvaluationsComponent } from './quizes_views/evaluations/evaluations.component';
import { EvaluationDialogComponent } from './quizes_views/evaluations/evaluation-dialog/evaluation-dialog.component';
import { UserCalculatorsComponent } from './quizes_views/user-calculators/user-calculators.component';
import { UserCalculatorDialogComponent } from './quizes_views/user-calculators/user-calculator-dialog/user-calculator-dialog.component';

//PIPE
import { LimitToPipe } from 'src/app/shared/pipes/limit-to.pipe'
import { NewLinePipe } from '../shared/pipes/new-line.pipe';

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
    ChangePictureComponent,
    NecessitiesComponent,
    ControllerVersionsComponent,
    ModelsComponent,
    FirmwareVersionsComponent,
    HardwareVersionsComponent,
    DeviceTypesComponent,
    DeviceVersionsComponent,
    ControllerVersionDialogComponent,
    HardwareVersionDialogComponent,
    DeviceVersionDialogComponent,
    DeviceTypeDialogComponent,
    NecessitieDialogComponent,
    ModelDialogComponent,
    DevicesDialogComponent,
    ModelNecessitiesDialogComponent,
    DeviceCalibrationDialogComponent,
    FirmawareVersionDialogComponent,
    TutorialsComponent,
    TutorialDialogComponent,
    TipsComponent,
    TipDialogComponent,
    FaqsComponent,
    FaqDialogComponent,
    CalculatorComponent,
    CalculatorDialogComponent,
    GetFilesComponent,
    ModelNecessitiesComponent,
    DeviceCalibrationComponent,
    SalesComponent,
    DealersComponent,
    ClientsComponent,
    RegionsComponent,
    ClientDialogComponent,
    RegionDialogComponent,
    SalesDialogComponent,
    DealerDialogComponent,
    QuestionsComponent,
    QuestionsDialogComponent,
    EvaluationsComponent,
    EvaluationDialogComponent,
    UserCalculatorsComponent,
    UserCalculatorDialogComponent,

    //PIPE
    LimitToPipe,
    NewLinePipe
  ],
  imports: [
    CommonModule,
    ViewRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class ViewModule { }
