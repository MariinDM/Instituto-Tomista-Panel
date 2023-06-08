import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiServiceService } from 'src/app/services/api-service.service';
// import { RolesService } from 'src/app/services/roles.service';
import * as LANGUAGE from 'src/assets/i18n/translate.json';

@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class RoleDialogComponent implements OnInit {

  form!: FormGroup
  obj!: any
  element: any;
  edit: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private apiService:ApiServiceService,
    private fb: FormBuilder) { this.createForm() }

  ngOnInit(): void {
    this.edit = this.data.edit;
    this.element = this.data.element;
    if (this.data.edit) {
      this.form.patchValue(this.element);
    }
  }

  sendData() {
    if (this.form.invalid) { return }
    this.setData()
    if (!this.data.edit) {
      this.apiService.addRole(this.obj).subscribe({
        next: (v) => { this.openSnack(v.message) },
        error: (e) => { this.openSnack(e) },
        complete: () => { this.dialog.closeAll() }
      })
    } else {
      this.apiService.updateRole(this.obj).subscribe({
        next: (v) => { this.openSnack(v.message) },
        error: (e) => { this.openSnack(e) },
        complete: () => { this.dialog.closeAll() }
      })
    }
  }

  createForm(): void {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', []),
    });
  }

  setData(): void {
    this.obj = {
      ...this.form.value,
      id: this.data.element ? this.data.element.id : null,
    }
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }

}
