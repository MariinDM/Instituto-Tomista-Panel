import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { ViewService } from 'src/app/services/view.service'
import { View } from 'src/app/interfaces/view'
import { ViewDialogComponent } from './view-dialog/view-dialog.component'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['../../app.component.scss']
})
export class ViewsComponent implements OnInit {

  dataView!: any[]
  loader = false
  code = localStorage.getItem('code')
  filter:string = ''
  apiURL = environment.apiUrl

  displayedColumns: string[] = ['point', 'name', 'order_index', 'url', 'description', 'image', 'category', 'active', 'actions']
  dataSource: MatTableDataSource<any>

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(
    private viewService: ViewService,
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
    this.viewService.getall(this.code).subscribe((data: any) => {
      this.dataView = data.views
      this.setData()
      this.loader = true
      this.openSnack(data.message)
    },(error:any)=>{
      this.openSnack(error)
    })
    this.filter = ''
  }

  setData(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.dataView;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(id: number): void {
    this.viewService.delete(this.code, id).subscribe({
      next: (v) => { this.openSnack(v.message) },
      error: (e) => { this.openSnack(e) },
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
    this.dialog.open(ViewDialogComponent, {
      data: { element, edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getall()
    })
  }

}
