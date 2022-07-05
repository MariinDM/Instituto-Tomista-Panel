import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangePictureComponent } from './change-picture/change-picture.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../../app.component.scss']
})
export class ProfileComponent implements OnInit {

  userInfo!: any
  loader = false
  profile: any = null
  institution: any = null
  code = localStorage.getItem('code')
  rol = localStorage.getItem('rol')
  id!: number

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private _snack: MatSnackBar) { }

  ngOnInit(): void {
    this.getInfo()
  }

  getInfo(): void {
    this.loader = true
    this.authService.getInfo().subscribe((data: any) => {
      this.userInfo = data
      this.institution = environment.apiUrl + 'v1/en/resources/' + data.institution_picture
      this.profile = environment.apiUrl + 'v1/en/resources/' + data.profile_picture
      this.loader = false
    })
  }

  openDialog() {
    this.dialog.open(ChangePasswordComponent, {
      panelClass: ['dialog-responsive']
    })
  }
  openProfile(user: any, edit: boolean) {
    this.dialog.open(ChangePictureComponent, {
      data: { user, edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getInfo()
    })
  }
  openInstitution(user: any, edit: boolean) {
    this.dialog.open(ChangePictureComponent, {
      data: { user, edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getInfo()
    })
  }
  openSnack(message: string) {
    this._snack.open(message, '', {
      duration: 1000,
    })
  }
}
