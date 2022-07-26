import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { QuizesService } from 'src/app/services/quizes.service';
import { EvaluationDialogComponent } from './evaluation-dialog/evaluation-dialog.component';

@Component({
  selector: 'app-evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class EvaluationsComponent implements OnInit {

  dataTutorials!: any[]
  loader = false
  code = localStorage.getItem('code')
  filter: string = ''

  displayedColumns: string[] = ['point', 'name', 'instructor', 'quiz', 'simulator', 'total'] //, 'actions'
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
    this.quizesService.getallEvaluations(this.code).subscribe((data: any) => {
      this.dataTutorials = data.evaluations
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
    this.dataSource.data = this.dataTutorials;
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

  openDialog() {
    this.dialog.open(EvaluationDialogComponent, {
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getall()
    })
  }
}
