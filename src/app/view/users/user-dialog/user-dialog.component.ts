import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RolesService } from 'src/app/services/roles.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class UserDialogComponent implements OnInit {

  form!: FormGroup
  obj!: any
  dataRoles!: any[]
  dataCities!: any[]
  dataCountries!: any[]
  dataLanguages!: any[]
  code = localStorage.getItem('code')

  constructor(
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private userService: UsersService,
    private roleService: RolesService,
    private fb: FormBuilder) { this.createForm() }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.getRoles()
    this.getLanguages()
    this.getCountries()
    this.getCities()
  }

  getRoles() {
    this.roleService.getall(this.code).subscribe({
      next: (v) => {
        this.dataRoles = v.roles
      },
      error: (e) => {
        console.log(e)
      }
    })
  }
  getCountries() {
    this.userService.getcountries(this.code).subscribe({
      next: (v) => {
        this.dataCountries = v.countries
      },
      error: (e) => {
        console.log(e)
      }
    })
  }
  getCities() {
    this.userService.getcities(this.code).subscribe({
      next: (v) => {
        this.dataCities = v.cities
      },
      error: (e) => {
        console.log(e)
      }
    })
  }
  getLanguages() {
    this.userService.getlanguages(this.code).subscribe({
      next: (v) => {
        this.dataLanguages = v.languages
      },
      error: (e) => {
        console.log(e)
      }
    })
  }

  sendData() {
    if (this.form.invalid) { return }
    this.setData()
    this.userService.insert(this.code, this.obj).subscribe({
      next: (v) => { this.openSnack(v.message) },
      error: (e) => { this.openSnack(e.error.error.message) },
      complete: () => { this.dialog.closeAll() }
    })
  }

  createForm() {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]),
      role_id: new FormControl('', [Validators.required]),
      country_id: new FormControl('', [Validators.required]),
      city_id: new FormControl('', [Validators.required]),
      language_id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern(/^[1-9]\d{6,10}$/)]),
      age: new FormControl('', [Validators.required]),
      grade: new FormControl('', [Validators.required]),
      group: new FormControl('', [Validators.required]),
      institution: new FormControl('', [Validators.required]),
      premium: new FormControl(false),
    });
  }

  setData() {
    this.obj = {
      ...this.form.value,
      password: '1n3rC1@'
    }
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }

}
