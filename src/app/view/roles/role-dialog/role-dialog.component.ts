import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class RoleDialogComponent implements OnInit {

  form!: FormGroup
  obj!: any
  code = localStorage.getItem('code')

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private rolService: RolesService,
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
      this.rolService.insert(this.code, this.obj).subscribe({
        next: (v) => { this.openSnack(v.message) },
        error: (e) => { this.openSnack(e) },
        complete: () => { this.dialog.closeAll() }
      })
    } else {
      this.rolService.update(this.code, this.data.element.id, this.obj).subscribe({
        next: (v) => { this.openSnack(v.message) },
        error: (e) => { this.openSnack(e) },
        complete: () => { this.dialog.closeAll() }
      })
    }
  }

  createForm(): void {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  setData(): void {
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
