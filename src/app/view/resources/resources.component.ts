import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { animate, state, style, transition, trigger } from '@angular/animations';
import * as LANGUAGE from 'src/assets/i18n/translate.json';
import { ResourcesService } from 'src/app/services/resources.service';
import { ResourcesDialogComponent } from './resources-dialog/resources-dialog.component';


@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['../../app.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ResourcesComponent implements OnInit {

  dataTutorials!: any[]
  loader = false
  code = localStorage.getItem('code')
  filter: string = ''
  apiURL = environment.apiUrl
  translate: any = LANGUAGE

  displayedColumns: string[] = ['point', 'title', 'description', 'image', 'start_date', 'end_date', 'active', 'actions']
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  dataSource: MatTableDataSource<any>

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(
    private rscSvc: ResourcesService,
    private _snack: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getData()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  getData(): void {
    this.loader = false
    // this.rscSvc.getData(this.code).subscribe((data: any) => {
    //   this.dataTutorials = data.tips
    //   this.setData()
      this.loader = true
    //   this.openSnack(data.message)
    // }, (error: any) => {
    //   this.openSnack(error)
    // })
    this.filter = ''
  }

  setData(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.dataTutorials;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(id: number): void {
    this.rscSvc.deleteData(this.code, id).subscribe({
      next: (v) => { this.openSnack(v.message) },
      error: (e) => { this.openSnack(e) },
      complete: () => { this.getData() }
    })
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }

  openDialog(edit: boolean) {
    this.dialog.open(ResourcesDialogComponent, {
      data: { edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getData()
    })
  }
  openDialogUpdate(element: any, edit: boolean) {
    // this.dialog.open(TipDialogComponent, {
    //   data: { element, edit },
    //   panelClass: ['dialog-responsive']
    // }).afterClosed().subscribe(() => {
    //   this.getData()
    // })
  }
}