import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Model } from 'src/app/interfaces/devices-intefaces';
import { DevicesService } from 'src/app/services/devices.service';
import { ModelDialogComponent } from '../dialogs/model-dialog/model-dialog.component';
import { ModelNecessitiesComponent } from '../dialogs/model-necessities/model-necessities.component';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class ModelsComponent implements OnInit {
  dataTable:any[] = []
  dataModels!: any[]
  loader = false

  displayedColumns: string[] = ['point', 'id', 'name', 'device_type', 'device_version', 'hardware_version', 'created_at', 'updated_at', 'actions'];
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
    this.deviceServices.getModels().subscribe({
      next:(v) => {
        this.loader = true;
        console.log(v)
        this.dataModels = v.models
        this.dataTable = []
        for (const model of this.dataModels) {
          this.dataTable.push({id:model.id, name:model.name, device_type:model.device_type.name, device_version:model.device_version.name, hardware_version:model.hardware_version.version, created_at:model.created_at, updated_at:model.updated_at})
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
    this.dialog.open(ModelDialogComponent, {
      data: { edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getData()
    })
  }

  openDialogUpdate(element: any, edit: boolean) {
    let object = this.dataModels[this.dataModels.findIndex(obj => obj.id == element.id)]
    this.dialog.open(ModelDialogComponent, {
      data: { element:object, edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getData()
    })
  }

  openNecessitiesDialog(element: any){
    let object = this.dataModels[this.dataModels.findIndex(obj => obj.id == element.id)]
    this.dialog.open(ModelNecessitiesComponent, {
      data: { element:object },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getData()
    })
  }
}
