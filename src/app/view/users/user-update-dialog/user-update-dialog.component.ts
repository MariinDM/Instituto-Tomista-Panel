import { Component, Inject, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { RolesService } from 'src/app/services/roles.service';
import { UsersService } from 'src/app/services/users.service';
import * as LANGUAGE from 'src/assets/i18n/translate.json';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-update-dialog',
  templateUrl: './user-update-dialog.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class UserUpdateDialogComponent implements OnInit, AfterViewInit {

  form!: FormGroup
  obj!: any
  dataRoles: any[] = []
  dataCities: any[] = []
  viewCities: any[] = []
  dataCountries: any[] = []
  dataLanguages: any[] = []
  dataSelect: any[] = []
  image: any = null
  code = localStorage.getItem('code')
  rol = localStorage.getItem('rol')
  select: any = 0
  dealer!: any;
  userInfo!: any;
  element!: any;
  translate: any = LANGUAGE

  viewIndex = 0;
  windowSize = 150;
  filteredOptions: Observable<any[]>;

  private readonly PIXEL_TOLERANCE = 3.0;
  @ViewChild('data', { static: false }) selectElem: MatSelect;

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
    this.disabledInputs(this.element)
  }

  ngAfterViewInit(): void {
    // this.selectElem.openedChange.subscribe((v) => {
    //   if (v) {
    //     this.registerPanelScrollEvent()
    //   }
    // });
  }

  registerPanelScrollEvent() {
    const panel = this.selectElem.panel.nativeElement;
    // console.log(panel)
    panel.addEventListener('scroll', event => this.loadNextOnScroll(event));
  }

  loadNextOnScroll(event) {
    if (this.hasScrolledToBottom(event.target)) {
      this.viewIndex += this.windowSize;
      this.viewCities = this.dataCities.slice(0, this.viewIndex);
    }
  }

  private hasScrolledToBottom(target): boolean {
    return Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) < this.PIXEL_TOLERANCE;
  }

  reset() {
    this.viewCities = this.dataCities.slice(0, 150);
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
        this.viewCities = this.dataCities.slice(0, 150);
        let city_id = this.element.users.profile[0].cities.id;
        let city = this.dataCities.find(aaaa => aaaa.id === city_id);
        this.dataCities.splice(city_id, city_id + 1);
        this.viewCities.unshift(city)
        this.setForm()
        this.autoComplete()
      },
      error: (e) => {
        this.openSnack(e)
      }
    })
  }

  sendData() {
    // console.log(this.obj)
    // return
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
      cityOption: new FormControl('', [Validators.required]),
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
      dealer: new FormControl(0, []),
      instructor: new FormControl(0, []),
    });
  }

  setData() {
    let city_id = this.form.controls['cityOption'].value
    this.obj = this.form.value
    delete this.obj.cityOption
    this.obj.city_id = city_id
  }

  disabledInputs(data?: any) {
    // console.log(data)
    // if (data) {
    // this.form.controls['country_id'].setValue(data.profile[0].country_id)
    // this.form.controls['language_id'].setValue(data.profile[0].language_id)
    // this.getCities(data.profile[0].country_id)
    // this.form.controls['city_id'].setValue(data.profile[0].city_id)
    // this.form.controls['country_id'].disable()
    // this.form.controls['language_id'].disable()
    // this.form.controls['city_id'].disable()

    if (this.rol === '4' || this.rol === '5') {
      console.log(data)
      this.form.controls['institution'].setValue(data.users.profile[0].institution)
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

  setForm() {
    // console.log(this.element);
    // return
    this.form.controls['email'].setValue(this.element.users.email)
    this.form.controls['role_id'].setValue(this.element.roles.id)
    this.form.controls['country_id'].setValue(this.element.users.profile[0].country_id)
    this.form.controls['cityOption'].setValue(this.element.users.profile[0].city_id)
    this.form.controls['city_id'].setValue(this.element.users.profile[0].cities.name + ', ' + this.element.users.profile[0].cities.code)
    this.form.controls['language_id'].setValue(this.element.users.profile[0].language_id)
    this.form.controls['name'].setValue(this.element.users.profile[0].name)
    this.form.controls['last_name'].setValue(this.element.users.profile[0].last_name)
    this.form.controls['phone'].setValue(this.element.users.profile[0].phone)
    this.form.controls['age'].setValue(this.element.users.profile[0].age)
    this.form.controls['grade'].setValue(this.element.users.profile[0].grade)
    this.form.controls['group'].setValue(this.element.users.profile[0].group)
    this.form.controls['institution'].setValue(this.element.users.profile[0].institution)
    this.form.controls['premium'].setValue(this.element.premium)
    // this.searchCity();
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }
  displayFn(name: any): string {
    return name ? name : '';
  }
  autoComplete() {
    this.filteredOptions = this.form.controls['city_id'].valueChanges.pipe(
      startWith('A'),
      map(value => {
        if (value.length > 2) {
          const name = typeof value === 'string' ? value : value?.name;
          return name ? this._filter(name as string) : this.dataCities.slice();
        }
        else {
          if (this.element) {
            let position = this.dataCities.find(aaaa => aaaa.id === this.element.users.profile[0].city_id);
            return [position];
          }
          return [];
        }
      }),
    );
  }
  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.dataCities.filter(option => option.name.toLowerCase().includes(filterValue));
  }

}
