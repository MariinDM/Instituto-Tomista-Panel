import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { DialogTestQuestionsComponent } from './dialog-test-questions/dialog-test-questions.component';

@Component({
  selector: 'app-tests-questions',
  templateUrl: './tests-questions.component.html',
  styleUrls: ['../../app.component.scss']
})
export class TestsQuestionsComponent implements OnInit {

  data: any[] = []
  dataOriginal: any[] = []
  loader = false
  filter: string = ''

  displayedColumns: string[] = ['name', 'description', 'quantity', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private apiService: ApiServiceService,
    private _snack: MatSnackBar,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getall()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getall(): void {
    this.data = []
    this.loader = false
    this.apiService.getTestsQuestions().subscribe({
      next: (v) => {
        this.dataOriginal = v.testquestion
        this.dataOriginal.forEach(element => {
          let obj = {
            id: element.id,
            name: element.name,
            description: element.description,
            quantity: element.test_questions.length
          }
          this.data.push(obj)
        });
        // console.log(this.data)
        this.setData()
        this.loader = true
        // this.openSnack(v.message)
      },
      error: (e) => {
        this.openSnack(e)
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
  //   this.apiService.deleteRole(data).subscribe({
  //     next: (v) => { this.openSnack(v.message) },
  //     error: (e) => { this.openSnack(e) },
  //     complete: () => { this.getall() }
  //   })
  // }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }

  openDialog(edit: boolean, element?: any) {
    
    if (edit) {
      element = this.dataOriginal.find(item => element.id === item.id)
    }

    this.dialog.open(DialogTestQuestionsComponent, {
      data: { element, edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getall()
    })
  }

}
