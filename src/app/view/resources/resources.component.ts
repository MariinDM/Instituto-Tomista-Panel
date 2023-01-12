import { Component, OnInit, ViewChild } from '@angular/core';
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

  data!: any[]
  loader = false
  code = localStorage.getItem('code')
  rol = localStorage.getItem('rol')
  filter: string = ''
  apiURL = environment.apiUrl
  translate: any = LANGUAGE

  displayedColumns: string[] = ['point', 'title', 'description', 'actions'] //'link',
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
    this.rscSvc.getData(this.code).subscribe((data: any) => {
      this.data = data.resources
      this.setData()
      this.loader = true
      this.openSnack(data.message)
      for (let i = 0; i < this.data.length; i++) {
        // console.log('si')
        this.data[i].link = this.getStringURL(this.data[i].link)
      }
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
    this.dialog.open(ResourcesDialogComponent, {
      data: { element, edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getData()
    })
  }
  getStringURL(url: string) {
    let cad = url.substring(0, 7);
    if (cad == 'uploads') {
      return this.apiURL + 'v1/en/resources/' + url
    }
    return url
  }

  openFile(row: any) {
    // console.log(row);
    window.open(row.link, '_blank');
  }
}
