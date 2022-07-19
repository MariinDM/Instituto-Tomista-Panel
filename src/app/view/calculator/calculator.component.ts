import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { CalculatorService } from 'src/app/services/calculator.service';
import { CalculatorDialogComponent } from './calculator-dialog/calculator-dialog.component';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['../../app.component.scss']
})
export class CalculatorComponent implements OnInit {

  dataTutorials!: any[]
  loader = false
  code = localStorage.getItem('code')
  filter: string = ''

  displayedColumns: string[] = ['point', 'title', 'description', 'active', 'actions']
  dataSource: MatTableDataSource<any>

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(
    private calculatorService: CalculatorService,
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
    this.calculatorService.getall(this.code).subscribe((data: any) => {
      this.dataTutorials = data.calculator_fields
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
    this.calculatorService.delete(this.code, id).subscribe({
      next: (v) => { this.openSnack(v.message) },
      error: (e) => { this.openSnack(e.error.error.message) },
      complete: () => { this.getall() }
    })
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }

  openDialog(edit: boolean) {
    this.dialog.open(CalculatorDialogComponent, {
      data: { edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getall()
    })
  }
  openDialogUpdate(element: any, edit: boolean) {
    this.dialog.open(CalculatorDialogComponent, {
      data: { element, edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getall()
    })
  }
}
