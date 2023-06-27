import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { DialogQuestionsComponent } from './dialog-questions/dialog-questions.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['../../app.component.scss']
})
export class QuestionsComponent implements OnInit {

  data: any[] = []
  loader = true
  filter: string = ''

  displayedColumns: string[] = ['name', 'active', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private apiService: ApiServiceService,
    private _snack: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getall()
  }

  applyFilter(cadena: string) {
    cadena.trim()
    cadena.toLowerCase()
    this.dataSource.filter = cadena;
    this.dataSource.paginator = this.paginator;
  }

  getall(): void {
    this.loader = false
    this.apiService.getQuetions().subscribe({
      next: (v) => {
        this.data = v.question
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

  delete(data: any): void {
    this.apiService.deleteQuetion(data).subscribe({
      next: (v) => { this.openSnack(v.message) },
      error: (e) => { this.openSnack(e) },
      complete: () => { this.getall() }
    })
  }

  openSnack(message: string) {
    this._snack.open(message, '', {
      duration: 1000
    })
  }

  openDialog(edit: boolean, element?: any) {
    this.dialog.open(DialogQuestionsComponent, {
      data: { edit, element },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getall()
    })
  }

}
