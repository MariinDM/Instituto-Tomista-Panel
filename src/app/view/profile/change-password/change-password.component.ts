import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmedValidator } from 'src/app/shared/functions';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  form!: FormGroup
  obj!: any
  code = localStorage.getItem('code')

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _snack: MatSnackBar) { this.createForm() }

  ngOnInit(): void {
  }

  sendData() {
    if (this.form.invalid) { return }
    this.setData();
    this.authService.changePassword(this.code, this.obj).subscribe({
      next: (v) => { this.openSnack(v.message) },
      error: (e) => { this.openSnack(e.error.error.message) },
      complete: () => { this.dialog.closeAll() }
    })
  }

  createForm(): void {
    this.form = this.fb.group({
      password: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, {
      validator: ConfirmedValidator('newPassword', 'confirmPassword')
    });
  }

  setData(): void {
    this.obj = {
      ...this.form.value,
    }
  }

  openSnack(message: string) {
    this._snack.open(message, '', {
      duration: 1000,
    })
  }

}
