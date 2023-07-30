import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { DialogEvaluationsComponent } from './dialog-evaluations/dialog-evaluations.component';

@Component({
  selector: 'app-evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.scss']
})
export class EvaluationsComponent implements OnInit {

  data: any[] = []
  loader = true
  filter: string = ''

  displayedColumns: string[] = ['test', 'email','group', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private apiService: ApiServiceService,
    private _snack: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getall();
  }

  getall(): void {
    this.loader = false
    this.apiService.getEvaluations().subscribe({
      next: (v) => {
        this.data = v.evaluations
        // console.log("v",v.evaluations)
        this.setData()
        this.loader = true
      },
      error: (e) => {
        console.log(e)
        this.loader = true
      }
    })
    this.filter = ''
  }

  setData(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // delete(data: any): void {
  //   this.apiService.deleteGrade(data).subscribe({
  //     next: (v) => { this.openSnack(v.message) },
  //     error: (e) => { this.openSnack(e) },
  //     complete: () => { this.getall() }
  //   })
  // }

  openSnack(message: string) {
    this._snack.open(message, '', {
      duration: 1000
    })
  }

  openDialog(edit: boolean, element?: any) {
    this.dialog.open(DialogEvaluationsComponent, {
      data: { edit, element },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {

    })
  }

}
