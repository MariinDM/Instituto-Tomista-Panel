import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { UserUpdateDialogComponent } from './user-update-dialog/user-update-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['../../app.component.scss']
})
export class UsersComponent implements OnInit {

  dataUser!: any[]
  loader = true
  code = localStorage.getItem('code')

  displayedColumns: string[] = ['point', 'name', 'lastname', 'email', 'institution_picture', 'profile_picture', 'rol', 'active', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UsersService,
    private _snack: MatSnackBar,
    public dialog: MatDialog,
    private aurhService: AuthService) { }

  ngOnInit(): void {
    this.getall()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getall(): void {
    this.loader = false
    this.userService.getall(this.code).subscribe({
      next: (v) => {
        this.dataUser = v.data
        this.setData()
        this.loader = true
        this.openSnack(v.message)
        console.log(this.dataUser)
      },
      error: (e) => { this.openSnack(e.error.message) }
    })
  }

  setData(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.dataUser;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(id: number): void {
    this.userService.delete(this.code, id).subscribe({
      next: (v) => { this.openSnack(v.message) },
      error: (e) => { this.openSnack(e.error.error.message) },
      complete: () => { this.getall() }
    })
  }

  passwordDefault(obj: any): void {
    this.aurhService.passwordDefault(this.code, obj).subscribe({
      next: (v) => { this.openSnack(v.message) },
      error: (e) => { this.openSnack(e.error.error.message) }
    })
  }

  openSnack(message: string) {
    this._snack.open(message, '', {
      duration: 1000
    })
  }

  openDialog() {
    this.dialog.open(UserDialogComponent, {
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getall()
    })
  }

  openDialogUpdate(element: any) {
    this.dialog.open(UserUpdateDialogComponent, {
      data: { element },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getall()
    })
  }
}
