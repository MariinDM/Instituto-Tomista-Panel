import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Rol } from 'src/app/interfaces/rol';
import { RolesService } from 'src/app/services/roles.service';
import { RoleDialogComponent } from './role-dialog/role-dialog.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['../../app.component.scss']
})
export class RolesComponent implements AfterViewInit {

  dataRol!: any[]

  displayedColumns: string[] = ['point', 'name', 'description', 'active', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private rolService: RolesService, private _snack: MatSnackBar, public dialog: MatDialog) {
    this.getall()
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getall(): void {
    this.rolService.getall().subscribe((data: any) => {
      this.dataRol = data
      this.dataSource = new MatTableDataSource(this.dataRol);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
  }

  delete(id: number): void {
    this.rolService.delete(id).subscribe({
      next: (v) => { this.openSnack(v.message) },
      error: (e) => { this.openSnack(e.message) },
      complete: () => { this.getall() }
    })
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }

  openDialog(edit: boolean) {
    this.dialog.open(RoleDialogComponent, {
      data: { edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getall()
    })
  }
  openDialogUpdate(element: Rol, edit: boolean) {
    this.dialog.open(RoleDialogComponent, {
      data: { element, edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getall()
    })
  }

}
