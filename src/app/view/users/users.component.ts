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
import { environment } from 'src/environments/environment';
import * as LANGUAGE from 'src/assets/i18n/translate.json';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['../../app.component.scss']
})
export class UsersComponent implements OnInit {

  dataUser: any[] = []
  dataTable: any[] = []
  user!: any
  loader = true
  code = localStorage.getItem('code')
  rol = localStorage.getItem('rol')
  filter: string = ''
  apiURL = environment.apiUrl
  translate: any = LANGUAGE

  displayedColumns: string[] = ['point', 'name', 'lastname', 'email', 'institution_picture', 'profile_picture', 'rol', 'active', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private userService: UsersService,
    private salesSvc: SalesService,
    private _snack: MatSnackBar,
    public dialog: MatDialog,
    private aurhService: AuthService) { }

  ngOnInit(): void {
    this.getall()
  }

  applyFilter(cadena: string) {
    cadena.trim()
    cadena.toLowerCase()
    this.dataSource.filter = cadena;
    this.dataSource.paginator = this.paginator;
  }

  getall(): void {
    this.loader = false
    this.dataTable = []
    if (this.rol !== '3') {
      this.userService.getall(this.code).subscribe((data: any) => {
        console.log(data)
        this.dataUser = data.data
        for (let i = 0; i < this.dataUser.length; i++) {
          this.user = {
            id: this.dataUser[i].users.id,
            name: this.dataUser[i].users.profile[0].name,
            last_name: this.dataUser[i].users.profile[0].last_name,
            email: this.dataUser[i].users.email,
            rol: this.dataUser[i].roles.name,
            institution_picture: this.dataUser[i].users.institution_picture,
            profile_picture: this.dataUser[i].users.profile_picture,
            active: this.dataUser[i].users.active,
          }
          if (localStorage.getItem('rol') < this.dataUser[i].role_id) {
            this.dataTable.push(this.user)
          }
        }
        this.setData()
        this.loader = true
        this.openSnack(data.message)
      }, (error: any) => {
        this.openSnack(error)
      })
    } else {
      this.salesSvc.getOWners().subscribe({
        next: (v) => {
          console.log(v)
          this.dataUser = v.data
          for (let i = 0; i < this.dataUser.length; i++) {
            this.user = {
              id: this.dataUser[i].users.id,
              name: this.dataUser[i].users.profile[0].name,
              last_name: this.dataUser[i].users.profile[0].last_name,
              email: this.dataUser[i].users.email,
              rol: this.dataUser[i].roles.name,
              institution_picture: this.dataUser[i].users.institution_picture,
              profile_picture: this.dataUser[i].users.profile_picture,
              active: this.dataUser[i].users.active,
            }
            if (localStorage.getItem('rol') < this.dataUser[i].role_id) {
              this.dataTable.push(this.user)
            }
          }
          this.setData()
          this.loader = true
          this.openSnack(v.message)
        },
        error: (e) => {
          console.log(e)
        }
      })
    }
    this.filter = ''
  }

  setData(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.dataTable;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(id: number): void {
    this.userService.delete(this.code, id).subscribe({
      next: (v) => { this.openSnack(v.message) },
      error: (e) => { this.openSnack(e) },
      complete: () => { this.getall() }
    })
  }

  passwordDefault(obj: any): void {
    this.aurhService.passwordDefault(this.code, obj).subscribe({
      next: (v) => { this.openSnack(v.message) },
      error: (e) => { this.openSnack(e) }
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
    for (let i = 0; i < this.dataUser.length; i++) {
      if (this.dataUser[i].users.id == element.id) {
        element = this.dataUser[i]
      }
    }
    this.dialog.open(UserUpdateDialogComponent, {
      data: { element },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getall()
    })
    console.log(element)
  }
}
