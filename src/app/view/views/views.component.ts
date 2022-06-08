import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { ViewService } from 'src/app/services/view.service'
import { View } from 'src/app/interfaces/view'
import { ViewDialogComponent } from './view-dialog/view-dialog.component'

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['../../app.component.scss']
})
export class ViewsComponent implements AfterViewInit {

  dataView!: any[]
  class!: string

  displayedColumns: string[] = ['point', 'name', 'order_index', 'description', 'image', 'category_id', 'active', 'actions']
  dataSource: MatTableDataSource<any>

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(private viewService: ViewService, private _snack: MatSnackBar, public dialog: MatDialog) {
    this.getall()
  }

  ngAfterViewInit(): void {
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

  getall(): void {
    this.viewService.getall().subscribe((data: any) => {
      this.dataView = data
      // console.log(this.dataView)
      this.dataSource = new MatTableDataSource(this.dataView)

      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort

    })
  }

  delete(id: number): void {
    this.viewService.delete(id).subscribe({
      next: (v) => { this.openSnack(v.message) },
      error: (e) => { this.openSnack(e.message) },
      complete: () => { this.getall() }
    })
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }

  openDialog(edit: boolean) {
    this.dialog.open(ViewDialogComponent, {
      data: { edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getall()
    })
  }
  openDialogUpdate(element: View, edit: boolean) {
    console.log(element)
    this.dialog.open(ViewDialogComponent, {
      data: { element, edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getall()
    })
  }

}
