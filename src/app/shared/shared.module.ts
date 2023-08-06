import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { AngularCropperjsModule } from "angular-cropperjs";
import { NgApexchartsModule } from 'ng-apexcharts';

import { MaterialModule } from "./material.module";
import { FeatherIconsModule } from "./components/feather-icons/feather-icons.module";
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    NgxSpinnerModule,
    MatTableExporterModule,
    NgxMatFileInputModule,
    AngularCropperjsModule,
    NgApexchartsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    NgxSpinnerModule,
    MaterialModule,
    FeatherIconsModule,
    MatTableExporterModule,
    NgxMatFileInputModule,
    AngularCropperjsModule,
    NgApexchartsModule
  ],
})
export class SharedModule {}
