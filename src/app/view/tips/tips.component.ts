import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { TipService } from 'src/app/services/tip.service'
import { environment } from 'src/environments/environment'
import { TipDialogComponent } from './tip-dialog/tip-dialog.component'

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['../../app.component.scss']
})
export class TipsComponent implements OnInit {

  dataTutorials!: any[]
  loader = false
  code = localStorage.getItem('code')
  filter: string = ''
  apiURL = environment.apiUrl

  displayedColumns: string[] = ['point', 'title', 'description', 'image', 'start_date', 'end_date', 'active', 'actions']
  dataSource: MatTableDataSource<any>

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(
    private tipService: TipService,
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
    this.tipService.getall(this.code).subscribe((data: any) => {
      this.dataTutorials = data.tips
      this.setData()
      this.loader = true
      this.openSnack(data.message)
    }, (error: any) => {
      this.openSnack(error)
    })
    this.filter= ''
  }

  setData(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.dataTutorials;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(id: number): void {
    this.tipService.delete(this.code, id).subscribe({
      next: (v) => { this.openSnack(v.message) },
      error: (e) => { this.openSnack(e) },
      complete: () => { this.getall() }
    })
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }

  openDialog(edit: boolean) {
    this.dialog.open(TipDialogComponent, {
      data: { edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getall()
    })
  }
  openDialogUpdate(element: any, edit: boolean) {
    this.dialog.open(TipDialogComponent, {
      data: { element, edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getall()
    })
  }

}
