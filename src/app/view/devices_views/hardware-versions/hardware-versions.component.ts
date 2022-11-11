import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HardwareVersion } from 'src/app/interfaces/devices-intefaces';
import { DevicesService } from 'src/app/services/devices.service';
import { HardwareVersionDialogComponent } from '../dialogs/hardware-version-dialog/hardware-version-dialog.component';
import * as LANGUAGE from 'src/assets/i18n/translate.json';

@Component({
  selector: 'app-hardware-versions',
  templateUrl: './hardware-versions.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class HardwareVersionsComponent implements OnInit {
  dataHardware!: any[]
  loader = false
  translate: any = LANGUAGE

  displayedColumns: string[] = ['point', 'id', 'previous_version_id', 'description', 'numeric_value', 'version', 'created_at', 'updated_at', 'actions'];
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
    this.deviceServices.getHardwareVersions().subscribe({
      next:(v) => {
        this.loader = true;
        // console.log(v)
        this.dataHardware = v.hardware_versions
        this.setData()
        this.openSnack(v.message)
      },
      error:(e) => {
        // console.log(e)
        this.openSnack(e)
      }
    });
  }

  setData(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.dataHardware;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }

  openDialog(edit: boolean) {
    this.dialog.open(HardwareVersionDialogComponent, {
      data: { edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getData()
    })
  }

  openDialogUpdate(element: HardwareVersion, edit: boolean) {
    this.dialog.open(HardwareVersionDialogComponent, {
      data: { element, edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getData()
    })
  }

}
