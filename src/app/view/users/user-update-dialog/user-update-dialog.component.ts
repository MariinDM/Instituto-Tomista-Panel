import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RolesService } from 'src/app/services/roles.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-update-dialog',
  templateUrl: './user-update-dialog.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class UserUpdateDialogComponent implements OnInit {

  form!: FormGroup
  obj!: any
  dataRoles!: any[]
  dataCities!: any[]
  dataCountries!: any[]
  dataLanguages!: any[]
  code = localStorage.getItem('code')

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private userService: UsersService,
    private roleService: RolesService,
    private fb: FormBuilder) { this.createForm() }

  ngOnInit(): void {
    this.getData()
    this.setForm()
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
    this.userService.update(this.code, this.data.element.user_id, this.obj).subscribe({
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
      phone: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      grade: new FormControl('', [Validators.required]),
      group: new FormControl('', [Validators.required]),
      institution: new FormControl('', [Validators.required]),
      premium: new FormControl(''),
    });
  }
  setData() {
    this.obj = {
      ...this.form.value,
      active: this.data.element.active
    }
  }

  setForm() {
    this.form.controls['email'].setValue(this.data.element.users.email)
    this.form.controls['role_id'].setValue(this.data.element.roles.id)
    this.form.controls['country_id'].setValue(this.data.element.users.profile[0].country_id)
    this.form.controls['city_id'].setValue(this.data.element.users.profile[0].city_id)
    this.form.controls['language_id'].setValue(this.data.element.users.profile[0].language_id)
    this.form.controls['name'].setValue(this.data.element.users.profile[0].name)
    this.form.controls['last_name'].setValue(this.data.element.users.profile[0].last_name)
    this.form.controls['phone'].setValue(this.data.element.users.profile[0].phone)
    this.form.controls['age'].setValue(this.data.element.users.profile[0].age)
    this.form.controls['grade'].setValue(this.data.element.users.profile[0].grade)
    this.form.controls['group'].setValue(this.data.element.users.profile[0].group)
    this.form.controls['institution'].setValue(this.data.element.users.profile[0].institution)
    this.form.controls['premium'].setValue(this.data.element.premium)
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }

}
