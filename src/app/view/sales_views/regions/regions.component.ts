import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SalesService } from 'src/app/services/sales.service';
import { RegionDialogComponent } from '../dialogs/region-dialog/region-dialog.component';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class RegionsComponent implements OnInit {
  dataRegions!: any[]
  loader = false

  displayedColumns: string[] = ['point', 'code', 'name', 'description', 'actions'];
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
    this.salesServices.getRegions().subscribe({
      next:(v) => {
        this.loader = true;
        console.log(v)
        this.dataRegions = v.clients
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
    this.dataSource.data = this.dataRegions;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }

  openDialog(edit: boolean) {
    this.dialog.open(RegionDialogComponent, {
      data: { edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getData()
    })
  }

  openDialogUpdate(element: any, edit: boolean) {
    this.dialog.open(RegionDialogComponent, {
      data: { element, edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getData()
    })
  }
}