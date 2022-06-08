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
export class ViewsrolesComponent implements AfterViewInit {

  dataRol!: any[]
  class!: string

  displayedColumns: string[] = ['point', 'name', 'description', 'premium', 'active', 'actions']
  dataSource: MatTableDataSource<any>

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(private viewsrolesService: ViewsrolesService, private _snack: MatSnackBar, public dialog: MatDialog) {
    this.getall()
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator
    // this.dataSource.sort = this.sort
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  getall() {
    this.viewsrolesService.getall().subscribe((data: any) => {
      this.dataRol = data

      this.dataSource = new MatTableDataSource(this.dataRol)

      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort

    })
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
