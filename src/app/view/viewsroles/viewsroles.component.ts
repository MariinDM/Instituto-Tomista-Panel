import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { Viewsroles } from 'src/app/interfaces/viewsroles'
import { ViewsrolesService } from 'src/app/services/viewsroles.service'
import { AssignViewsrolesComponent } from './dialog/assign-viewsroles/assign-viewsroles.component'

@Component({
  selector: 'app-viewsroles',
  templateUrl: './viewsroles.component.html',
  styleUrls: ['../../app.component.scss']
})
export class ViewsrolesComponent implements OnInit {

  dataVR!: any[]
  loader = false
  code = localStorage.getItem('code')

  displayedColumns: string[] = ['point', 'name', 'premium','active', 'actions'] //'description',
  dataSource: MatTableDataSource<any>

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(
    private viewsrolesService: ViewsrolesService,
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
    this.viewsrolesService.getall(this.code).subscribe((data: any) => {
      this.dataVR = data.roles
      this.setData()
      this.loader = true
      this.openSnack(data.message)
    })
  }

  delete(id: number): void {
    this.viewsrolesService.delete(this.code, id).subscribe({
      next: (v) => {
        this.openSnack(v.message)
      },
      error: (e) => {
        this.openSnack(e.error.error.message)
      },
      complete:()=>{
        this.getall()
      }
    })
  }

  setData(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.dataVR;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openSnack(message: string) {
    this._snack.open(message, '', {
      duration: 1000,
    })
  }

  openDialogUpdate(element: Viewsroles) {
    this.dialog.open(AssignViewsrolesComponent, {
      data: { element },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getall()
    })
  }

}
