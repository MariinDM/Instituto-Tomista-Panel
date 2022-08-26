import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SalesService } from 'src/app/services/sales.service';
import { SalesDialogComponent } from '../dialogs/sales-dialog/sales-dialog.component';
import * as LANGUAGE from 'src/assets/i18n/translate.json';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class SalesComponent implements OnInit {

  dataSales: any[] = []
  dataTable: any[] = []
  loader = false
  translate: any = LANGUAGE

  displayedColumns: string[] = ['point', 'id', 'name', 'comments', 'active', 'created_at', 'updated_at', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private salesServices: SalesService, private _snack: MatSnackBar, public dialog: MatDialog) {
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
    this.salesServices.getSales().subscribe({
      next: (v) => {
        this.loader = true;
        this.dataTable = []
        this.dataSales = v.sales
        for (let i = 0; i < v.sales.length; i++) {
          let item = {
            id: v.sales[i].id,
            name: v.sales[i].saleDevice[0].saleDeviceClient[0].client.name,
            comments: v.sales[i].comments,
            active: v.sales[i].active,
            created_at: v.sales[i].created_at,
            updated_at: v.sales[i].updated_at
          }
          this.dataTable.push(item)
        }
        this.setData()
        this.openSnack(v.message)
      },
      error: (e) => {
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

  delete(id: number) {
    this.salesServices.deleteSale(id).subscribe({
      next: (v) => {
        this.openSnack(v.message)
        this.getData()
      },
      error: (e) => {
        this.openSnack(e)
      }
    })
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }

  openDialog(edit: boolean) {
    this.dialog.open(SalesDialogComponent, {
      data: { edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getData()
    })
  }

  openDialogUpdate(element: any, edit: boolean) {
    for (let i = 0; i < this.dataSales.length; i++) {
      if (this.dataSales[i].id === element.id) {
        element = this.dataSales[i]
      }
    }
    this.dialog.open(SalesDialogComponent, {
      data: { element, edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getData()
    })
  }
}
