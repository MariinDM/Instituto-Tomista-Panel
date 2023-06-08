import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Rol } from 'src/app/interfaces/rol';
// import { RolesService } from 'src/app/services/roles.service';
import { RoleDialogComponent } from './role-dialog/role-dialog.component';
import * as LANGUAGE from 'src/assets/i18n/translate.json';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['../../app.component.scss']
})
export class RolesComponent implements OnInit {

  data!: any[]
  loader = false
  filter: string = ''
  translate: any = LANGUAGE

  displayedColumns: string[] = ['name', 'description', 'active', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private apiService: ApiServiceService,
    private _snack: MatSnackBar,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getall()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getall(): void {
    this.loader = false
    this.apiService.getRoles().subscribe({
      next: (v) => {
        this.data = v.roles
        this.setData()
        this.loader = true
        // this.openSnack(v.message)
      },
      error: (e) => {
        this.openSnack(e)
      }
    })
    this.filter = ''
  }

  setData(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(data: any): void {
    this.apiService.deleteRole(data).subscribe({
      next: (v) => { this.openSnack(v.message) },
      error: (e) => { this.openSnack(e) },
      complete: () => { this.getall() }
    })
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }

  openDialog(edit: boolean, element?: any) {
    this.dialog.open(RoleDialogComponent, {
      data: { element, edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getall()
    })
  }

}
