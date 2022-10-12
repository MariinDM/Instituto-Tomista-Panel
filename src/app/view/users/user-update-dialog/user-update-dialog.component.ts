import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { RolesService } from 'src/app/services/roles.service';
import { UsersService } from 'src/app/services/users.service';
import * as LANGUAGE from 'src/assets/i18n/translate.json';

@Component({
  selector: 'app-user-update-dialog',
  templateUrl: './user-update-dialog.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class UserUpdateDialogComponent implements OnInit {

  form!: FormGroup
  obj!: any
  dataRoles: any[] = []
  dataCities: any[] = []
  dataCountries: any[] = []
  dataLanguages: any[] = []
  dataSelect: any[] = []
  image: any = null
  code = localStorage.getItem('code')
  rol = localStorage.getItem('rol')
  select!: any
  dealer!: any;
  userInfo!: any;
  element!: any;
  translate: any = LANGUAGE

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private userService: UsersService,
    private roleService: RolesService,
    private authService: AuthService,
    private fb: FormBuilder) { this.createForm() }

  ngOnInit(): void {
    this.element = this.data.element
    this.select = this.element.roles.id
    this.getData()
    this.changeSelect()
    this.setForm()
    this.disabledInputs()
  }

  getData() {
    this.roleService.getall(this.code).subscribe({
      next: (v) => {
        this.dataRoles = v.roles
      },
      error: (e) => {
        this.openSnack(e)
      }
    })
    this.userService.getcountries(this.code).subscribe({
      next: (v) => {
        this.dataCountries = v.countries
      },
      error: (e) => {
        this.openSnack(e)
      }
    })
    this.userService.getlanguages(this.code).subscribe({
      next: (v) => {
        this.dataLanguages = v.languages
      },
      error: (e) => {
        this.openSnack(e)
      }
    })
    this.getCities(this.element.users.profile[0].country_id)
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

  sendData() {
    if (this.form.invalid) { return }
    this.enableInputs()
    this.setData()
    if (this.obj.role_id === 6 && this.obj.age === 0) {
      this.openSnack('Age is required')
      this.disabledInputs()
      return
    }
    this.userService.update(this.code, this.element.user_id, this.obj).subscribe({
      next: (v) => { this.openSnack(v.message) },
      error: (e) => { this.openSnack(e), this.disabledInputs() },
      complete: () => { this.dialog.closeAll() }
    })
  }

  changeSelect() {
    this.form.controls['role_id'].valueChanges.subscribe((v) => {
      this.select = v
      if (this.select === 4) {
        this.userService.getDealers().subscribe({
          next: (v) => {
            this.dataSelect = v.data
          },
          error: (e) => {
            this.openSnack(e)
          }
        })
      } else if (this.select === 6) {
        this.userService.getInstructors().subscribe({
          next: (v) => {
            for (let item of v.data) {
              if (item.users.profile[0].institution === this.form.controls['institution'].value) {
                this.dataSelect.push(item)
              }
            }
          },
          error: (e) => {
            this.openSnack(e)
          }
        })
      }
    })
    // this.form.controls['dealer'].valueChanges.subscribe((v) => {
    //   this.disabledInputs(v.users)
    // })
  }

  createForm() {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      role_id: new FormControl('', [Validators.required]),
      country_id: new FormControl('', [Validators.required]),
      city_id: new FormControl('', [Validators.required]),
      language_id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern(/^[1-9]\d{6,10}$/)]),
      age: new FormControl(0, []),
      grade: new FormControl('', []),
      group: new FormControl('', []),
      institution: new FormControl('', []),
      premium: new FormControl(false, []),
      password: new FormControl('1n3rC1@', []),
      // dealer: new FormControl(0, []),
      instructor: new FormControl(0, [])
    });
  }

  setData() {
    this.obj = this.form.value
    console.log(this.obj)
  }

  disabledInputs(data?: any) {
    console.log(data)
    // if (data) {
    // this.form.controls['country_id'].setValue(data.profile[0].country_id)
    // this.form.controls['language_id'].setValue(data.profile[0].language_id)
    // this.getCities(data.profile[0].country_id)
    // this.form.controls['city_id'].setValue(data.profile[0].city_id)
    // this.form.controls['country_id'].disable()
    // this.form.controls['language_id'].disable()
    // this.form.controls['city_id'].disable()

    if (this.rol === '4' || this.rol === '5') {
      this.form.controls['institution'].setValue(data.profile[0].institution)
      this.form.controls['institution'].disable()
    }
    // } else {
    //   this.form.controls['country_id'].disable()
    //   this.form.controls['language_id'].disable()
    //   this.form.controls['city_id'].disable()
    this.form.controls['institution'].disable()
    this.form.controls['role_id'].disable()
    // }
  }

  enableInputs() {
    // this.form.controls['country_id'].enable()
    // this.form.controls['language_id'].enable()
    // this.form.controls['city_id'].enable()
    this.form.controls['role_id'].enable()

    if (this.rol === '4' || this.rol === '5') {
      this.form.controls['institution'].enable()
    }
  }

  inputInstitution() {
    if (this.select === '4') {

    }
  }

  setForm() {
    this.form.controls['email'].setValue(this.element.users.email)
    this.form.controls['role_id'].setValue(this.element.roles.id)
    this.form.controls['country_id'].setValue(this.element.users.profile[0].country_id)
    this.form.controls['city_id'].setValue(this.element.users.profile[0].city_id)
    this.form.controls['language_id'].setValue(this.element.users.profile[0].language_id)
    this.form.controls['name'].setValue(this.element.users.profile[0].name)
    this.form.controls['last_name'].setValue(this.element.users.profile[0].last_name)
    this.form.controls['phone'].setValue(this.element.users.profile[0].phone)
    this.form.controls['age'].setValue(this.element.users.profile[0].age)
    this.form.controls['grade'].setValue(this.element.users.profile[0].grade)
    this.form.controls['group'].setValue(this.element.users.profile[0].group)
    this.form.controls['institution'].setValue(this.element.users.profile[0].institution)
    this.form.controls['premium'].setValue(this.element.premium)
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }

}
