import { Component, Inject, InjectFlags, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalesService } from 'src/app/services/sales.service';
import { UsersService } from 'src/app/services/users.service';
import * as LANGUAGE from 'src/assets/i18n/translate.json';

@Component({
  selector: 'app-region-dialog',
  templateUrl: './region-dialog.component.html',
  styleUrls: ['../../../../app.component.scss']
})
export class RegionDialogComponent implements OnInit {

  form!: FormGroup;
  element: any;
  edit: boolean;
  dataCountries: any[] = []
  translate: any = LANGUAGE

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private salesServices: SalesService,
    private userSvc: UsersService,
    private fb: FormBuilder) {
    this.createForm()
  }

  ngOnInit(): void {
    console.log(this.data)
    // this.getCountries()
    this.edit = this.data.edit
    if (this.data.edit) {
      this.element = this.data.element
      this.setData();
    }
  }

  getCountries() {
    let code = localStorage.getItem('code')
    this.userSvc.getcountries(code).subscribe({
      next: (v) => {
        this.dataCountries = v.countries
      },
      error: (e) => {
        this.openSnack(e)
      }
    })
  }

  createForm() {
    this.form = this.fb.group({
      // country_id: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      active: new FormControl(false, [Validators.required]),
    });
  }

  setData() {
    console.log(this.element)
    // this.form.controls['country_id'].setValue(this.element.country_id)
    this.form.controls['code'].setValue(this.element.code)
    this.form.controls['description'].setValue(this.element.description)
    this.form.controls['name'].setValue(this.element.name)
    this.form.controls['active'].setValue(this.element.active)
  }

  sendData() {
    let data = {
      // country_id: this.form.controls['country_id'].value,
      code: this.form.controls['code'].value,
      description: this.form.controls['description'].value,
      name: this.form.controls['name'].value,
      active: this.form.controls['active'].value,
    }

    if (this.edit) {
      this.salesServices.updateRegion(this.element.id, data).subscribe({
        next: (v) => {
          console.log(v)
          this.openSnack(v.message)
        },
        error: (e) => {
          console.log(e)
          this.openSnack(e.error.message)
        },
        complete: () => {
          this.dialog.closeAll()
        }
      })
    }
    else {
      this.salesServices.sendRegion(data).subscribe({
        next: (v) => {
          console.log(v)
        },
        error: (e) => {
          console.log(e)
          this.openSnack(e)
        },
        complete: () => {
          this.dialog.closeAll()
        }
      })
    }
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }
}
