import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['../../app.component.scss']
})
export class UsersComponent implements AfterViewInit {

  dataUser!: any[]
  class!: string

  displayedColumns: string[] = ['point', 'email', 'institution_picture', 'profile_picture', 'active', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UsersService, private _snack: MatSnackBar, public dialog: MatDialog) {
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
    this.userService.getall().subscribe((data: any) => {
      this.dataUser = data
      // console.log(this.dataUser)
      this.dataSource = new MatTableDataSource(this.dataUser);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
  }

  delete(id: number): void {
    this.userService.delete(id).subscribe({
      next: (v) => { this.openSnack(v.message) },
      error: (e) => { this.openSnack(e.message) },
      complete: () => { this.getall() }
    })
  }

  openSnack(message: string) {
    this._snack.open(message, '', {
      duration: 1000,
      panelClass: this.class
    })
  }

  openDialog(edit: boolean) {
    this.dialog.open(UserDialogComponent, {
      data: { edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getall()
    })
  }

  openDialogUpdate(element: User, edit: boolean) {
    console.log(element)
    this.dialog.open(UserDialogComponent, {
      data: { element, edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getall()
    })
  }
}
