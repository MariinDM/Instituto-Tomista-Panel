import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class UserDialogComponent implements OnInit {

  form!: FormGroup
  obj!: any

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private userService: UsersService,
    private fb: FormBuilder) { this.createForm() }

  ngOnInit(): void {
    if (this.data.edit) {
      this.form.patchValue(this.data.element);
    }
  }

  sendData() {
    if (this.form.invalid) { return }
    this.setData()
    if (!this.data.edit) {
      this.userService.insert(this.obj).subscribe({
        next: (v) => { this.openSnack(v.message) },
        error: (e) => { this.openSnack(e) },
        complete: () => { this.dialog.closeAll() }
      })
    } else {
      this.userService.update(this.data.element.id, this.obj).subscribe({
        next: (v) => { this.openSnack(v.message) },
        error: (e) => { this.openSnack(e) },
        complete: () => { this.dialog.closeAll() }
      })
    }
  }

  createForm() {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]),
      institution_picture: new FormControl(''),
      profile_picture: new FormControl(''),
    });
  }

  setData() {
    this.obj = {
      ...this.form.value,
      id: this.data.element ? this.data.element.id : null,
      active: this.data.element ? this.data.element.active : true
    }
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }

}
