import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SalesService } from 'src/app/services/sales.service';
import { DealerDialogComponent } from '../dialogs/dealer-dialog/dealer-dialog.component';
import * as LANGUAGE from 'src/assets/i18n/translate.json';

@Component({
  selector: 'app-dealers',
  templateUrl: './dealers.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class DealersComponent implements OnInit {
  
  dataDealers!: any[]
  loader = false
  translate: any = LANGUAGE

  displayedColumns: string[] = ['point', 'id', 'name', 'legal_id', 'active', 'created_at', 'updated_at', 'actions'];
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
    this.salesServices.getDealers().subscribe({
      next:(v) => {
        this.loader = true;
        console.log(v)
        this.dataDealers = v.dealers
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
    this.dataSource.data = this.dataDealers;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  delete(id: number): void {
    this.salesServices.deleteDealer(id).subscribe({
      next: (v) => {
        this.openSnack(v.message)
      },
      error: (e) => {
        this.openSnack(e)
      },
      complete: () => {
        this.getData()
      }
    })
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }

  openDialog(edit: boolean) {
    this.dialog.open(DealerDialogComponent, {
      data: { edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getData()
    })
  }

  openDialogUpdate(element: any, edit: boolean) {
    this.dialog.open(DealerDialogComponent, {
      data: { element, edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getData()
    })
  }
}
