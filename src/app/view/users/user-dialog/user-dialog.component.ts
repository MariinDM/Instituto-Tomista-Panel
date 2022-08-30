import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RolesService } from 'src/app/services/roles.service';
import { UsersService } from 'src/app/services/users.service';
import * as LANGUAGE from 'src/assets/i18n/translate.json';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class UserDialogComponent implements OnInit {

  form!: FormGroup
  obj!: any
  dataRoles: any[] = []
  dataCities: any[] = []
  dataCountries!: any[]
  dataLanguages!: any[]
  image: any = null
  code = localStorage.getItem('code')
  rol = localStorage.getItem('rol')
  select!: any
  translate: any = LANGUAGE

  constructor(
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private userService: UsersService,
    private roleService: RolesService,
    private fb: FormBuilder) { this.createForm() }

  ngOnInit(): void {
    this.getData()
    this.selectRol()
  }

  getData() {
    this.getRoles()
    this.getLanguages()
    this.getCountries()
  }

  getRoles() {
    this.roleService.getall(this.code).subscribe({
      next: (v) => {
        for (let i = 0; i < v.roles.length; i++) {
          if (v.roles[i].name != 'GUEST' && v.roles[i].id > this.rol) {
            this.dataRoles.push(v.roles[i])
          }
        }
      },
      error: (e) => {
        this.openSnack(e)
      }
    })
  }

  getCountries() {
    this.userService.getcountries(this.code).subscribe({
      next: (v) => {
        this.dataCountries = v.countries
      },
      error: (e) => {
        this.openSnack(e)
      }
    })
  }

  getCities(event: any) {
    this.userService.getcities(this.code, event).subscribe({
      next: (v) => {
        this.dataCities = v.cities
      },
      error: (e) => {
        this.openSnack(e)
      }
    })
  }

  getLanguages() {
    this.userService.getlanguages(this.code).subscribe({
      next: (v) => {
        this.dataLanguages = v.languages
      },
      error: (e) => {
        this.openSnack(e)
      }
    })
  }

  sendData() {
    if (this.form.invalid) { return }
    var data = this.setData()
    this.userService.insert(this.code, data).subscribe({
      next: (v) => { this.openSnack(v.message) },
      error: (e) => { this.openSnack(e) },
      complete: () => { this.dialog.closeAll() }
    })
  }

  selectRol() {
    this.form.controls['role_id'].valueChanges.subscribe((v) => {
      this.select = v
      console.log(this.select)
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
      grade: new FormControl('', []),
      group: new FormControl('', []),
      institution: new FormControl('', []),
      premium: new FormControl(false),
    });
  }

  setData() {

    var formData = new FormData()

    formData.set('email', this.form.controls['email'].value)
    formData.set('password', '1n3rC1@')
    formData.set('role_id', this.form.controls['role_id'].value)
    formData.set('country_id', this.form.controls['country_id'].value)
    formData.set('city_id', this.form.controls['city_id'].value)
    formData.set('language_id', this.form.controls['language_id'].value)
    formData.set('name', this.form.controls['name'].value)
    formData.set('last_name', this.form.controls['last_name'].value)
    formData.set('phone', this.form.controls['phone'].value)
    formData.set('age', this.form.controls['age'].value)
    formData.set('grade', this.form.controls['grade'].value)
    formData.set('group', this.form.controls['group'].value)
    formData.set('age', this.form.controls['age'].value)
    formData.set('institution', this.form.controls['institution'].value)
    formData.set('premium', this.form.controls['premium'].value)
    // formData.set('image', this.image)

    return formData
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }

}
