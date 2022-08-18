import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { QuizesService } from 'src/app/services/quizes.service';
import { EvaluationDialogComponent } from './evaluation-dialog/evaluation-dialog.component';
import * as LANGUAGE from 'src/assets/i18n/translate.json';

@Component({
  selector: 'app-evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class EvaluationsComponent implements OnInit {

  data: any[] = []
  dataEvaluations: any[] = []
  loader = false
  code = localStorage.getItem('code')
  filter: string = ''
  obj!: any
  translate: any = LANGUAGE

  displayedColumns: string[] = ['point', 'name', 'last_name', 'instructor', 'quiz', 'simulator', 'total', 'date', 'actions']
  dataSource: MatTableDataSource<any>

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(
    private quizesService: QuizesService,
    private _snack: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getall()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  getall(): void {
    this.loader = false
    this.data = []
    this.quizesService.getallEvaluations(this.code).subscribe((data: any) => {
      this.dataEvaluations = data.evaluations
      for (let i = 0; i < data.evaluations.length; i++) {
        this.obj = {
          id: data.evaluations[i].id,
          name: data.evaluations[i].student.profile[0].name,
          last_name: data.evaluations[i].student.profile[0].last_name,
          // email: data.evaluations[i].student.email,
          instructor: data.evaluations[i].instructor,
          simulator: data.evaluations[i].simulator,
          quiz: data.evaluations[i].quiz,
          total: data.evaluations[i].total,
          date: data.evaluations[i].date,
        }
        this.data.push(this.obj)
      }
      this.setData()
      this.loader = true
      this.openSnack(data.message)
    }, (error: any) => {
      this.openSnack(error)
    })
    this.filter = ''
  }

  setData(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(id: number): void {
    this.quizesService.deleteEvaluation(this.code, id).subscribe({
      next: (v) => { this.openSnack(v.message) },
      error: (e) => { this.openSnack(e) },
      complete: () => { this.getall() }
    })
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }

  openDialogUpdate(element: any, edit: boolean) {
    for (let i = 0; i < this.dataEvaluations.length; i++) {
      if (this.dataEvaluations[i].id == element.id) {
        element = this.dataEvaluations[i]
      }
    }
    this.dialog.open(EvaluationDialogComponent, {
      data: { element, edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getall()
    })
  }
}
