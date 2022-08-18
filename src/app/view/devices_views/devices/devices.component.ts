import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DevicesService } from 'src/app/services/devices.service';
import { DeviceCodeDialogComponent } from '../dialogs/device-code-dialog/device-code-dialog.component';
import { DevicesDialogComponent } from '../dialogs/devices-dialog/devices-dialog.component';
import * as LANGUAGE from 'src/assets/i18n/translate.json';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class DevicesComponent implements OnInit {
  dataTable: any[] = []
  dataDevices!: any[]
  loader = false
  translate: any = LANGUAGE

  displayedColumns: string[] = ['point', 'id', 'controller_version', 'firmware_version', 'model', 'device_type', 'device_version', 'hardware_version', 'active', 'restarts', 'serial', 'actions'];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private deviceServices: DevicesService, private _snack: MatSnackBar, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getData()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getData(): void {
    this.loader = false
    this.deviceServices.getDevices().subscribe({
      next:(v) => {
        this.loader = true;
        console.log(v)
        this.dataDevices = v.device
        this.dataTable = []
        for (const obj of this.dataDevices) {
          console.log(obj)
          this.dataTable.push({id:obj.id, controller_version:obj.controller_version.version, firmware_version:obj.firmware_version.version, model:obj.model.name, device_type:obj.model.device_type.name, device_version:obj.model.device_version.name, hardware_version:obj.model.hardware_version.version, active:obj.active, restarts:obj.restarts, serial:obj.serial })
        }
        this.setData()
        this.openSnack(v.message)
      },
      error:(e) => {
        console.log(e)
        this.openSnack(e.error.message)
      }
    });
  }

  setData(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.dataTable;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }

  openDialog(edit: boolean) {
    this.dialog.open(DevicesDialogComponent, {
      data: { edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getData()
    })
  }

  openDialogUpdate(element: any, edit: boolean) {
    let object = this.dataDevices[this.dataDevices.findIndex(obj => obj.id == element.id)]
    this.dialog.open(DevicesDialogComponent, {
      data: { element:object, edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getData()
    })
  }

  openDialogCode(element: any) {
    let object = this.dataDevices[this.dataDevices.findIndex(obj => obj.id == element.id)]
    this.dialog.open(DeviceCodeDialogComponent, {
      data: { element:object },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getData()
    })
  }
}
