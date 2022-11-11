import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FirmwareVersion } from 'src/app/interfaces/devices-intefaces';
import { DevicesService } from 'src/app/services/devices.service';
import { FirmawareVersionDialogComponent } from '../dialogs/firmaware-version-dialog/firmaware-version-dialog.component';
import * as LANGUAGE from 'src/assets/i18n/translate.json';

@Component({
  selector: 'app-firmware-versions',
  templateUrl: './firmware-versions.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class FirmwareVersionsComponent implements OnInit {
  dataTable:any = []
  dataFirmwares!: any[]
  loader = false
  translate: any = LANGUAGE

  displayedColumns: string[] = ['point', 'id', 'previous_version_id', 'version', 'model_id', 'description', 'created_at', 'updated_at', 'actions'];
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
    this.deviceServices.getFirmwareVersions().subscribe({
      next:(v) => {
        this.loader = true;
        // console.log(v)
        this.dataFirmwares = v.firmware_versions
        this.dataTable = []
        for (const obj of this.dataFirmwares) {
          this.dataTable.push({id:obj.id, model:obj.model.name, previous_version!:obj.name, description:obj.description, version:obj.version, created_at:obj.created_at, updated_at:obj.updated_at})
        }
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
    this.dataSource.data = this.dataFirmwares;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }

  openDialog(edit: boolean) {
    this.dialog.open(FirmawareVersionDialogComponent, {
      data: { edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getData()
    })
  }

  openDialogUpdate(element: FirmwareVersion, edit: boolean) {
    let object = this.dataFirmwares[this.dataFirmwares.findIndex(obj => obj.id == element.id)]
    this.dialog.open(FirmawareVersionDialogComponent, {
      data: { element:object, edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getData()
    })
  }
}
