import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ChangePasswordComponent } from './change-password/change-password.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../../app.component.scss']
})
export class ProfileComponent implements OnInit {

  userInfo!: any
  loader = false

  constructor(private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getInfo()
  }

  getInfo(): void {
    this.loader = true
    this.authService.getInfo().subscribe((data: any) => {
      this.userInfo = data
      this.loader = false
    })
  }

  openDialog() {
    this.dialog.open(ChangePasswordComponent, {
      panelClass: ['dialog-responsive']
    })
  }
}
