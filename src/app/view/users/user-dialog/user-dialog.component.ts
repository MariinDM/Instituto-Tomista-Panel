import { AfterViewInit, Component, Directive, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RolesService } from 'src/app/services/roles.service';
import { UsersService } from 'src/app/services/users.service';
import * as LANGUAGE from 'src/assets/i18n/translate.json';
import { debounce, debounceTime, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class UserDialogComponent implements OnInit, AfterViewInit {

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
  translate: any = LANGUAGE

  viewIndex = 0;
  windowSize = 150;
  filteredOptions: Observable<any[]>;

  private readonly PIXEL_TOLERANCE = 3.0;
  @ViewChild('data', { static: false }) selectElem: MatSelect;
  @ViewChild('clave', { static: false }) inputCity: ElementRef;

  constructor(
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private userService: UsersService,
    private roleService: RolesService,
    private authService: AuthService,
    private fb: FormBuilder) { this.createForm() }

  ngOnInit(): void {
    this.getData();
    this.changeSelect()
    if (this.rol === '3' || this.rol === '4' || this.rol === '5') {
      this.getInfo()
    }
  }

  ngAfterViewInit(): void {
    // this.selectElem.openedChange.subscribe((v) => {
    //   if(v){
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
      // console.log('Scrolled to bottom');
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
        // console.log(v)
        switch (this.rol) {
          // DEVELOPER
          case '1':
            for (let i of v.roles) {
              if (i.id === 2 || i.id === 3 || i.id === 4) {
                this.dataRoles.push(i)
              }
            }
            break;
          // ADMIN
          case '2':
            for (let i of v.roles) {
              if (i.id === 3 || i.id === 4) {
                this.dataRoles.push(i)
              }
            }
            break;
          // DEALER
          case '3':
            for (let i of v.roles) {
              if (i.id === 4) {
                this.dataRoles.push(i)
              }
            }
            break;
          // OWNER
          case '4':
            for (let i of v.roles) {
              if (i.id === 5) {
                this.dataRoles.push(i)
              }
            }
            break;
          // INSTRUCTOR
          case '5':
            for (let i of v.roles) {
              if (i.id === 6) {
                this.dataRoles.push(i)
              }
            }
            break;
        }
        this.setRol();
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
  }

  getCities(event: any) {
    this.userService.getcities(this.code, event).subscribe({
      next: (v) => {
        this.dataCities = v.cities
        // console.log(this.dataCities)
        // console.log(v.cities)
        // this.viewCities = this.dataCities.slice(0, 150);
        this.autoComplete();
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
    this.userService.insert(this.code, this.obj).subscribe({
      next: (v) => { this.openSnack(v.message) },
      error: (e) => { this.openSnack(e), this.disabledInputs() },
      complete: () => { this.dialog.closeAll() }
    })
  }

  changeSelect() {
    this.form.controls['role_id'].valueChanges.subscribe((v) => {
      this.select = v
      // console.log(v)
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
    this.form.controls['dealer'].valueChanges.subscribe((v) => {
      this.disabledInputs(v.users)
    })
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
      dealer: new FormControl(0, []),
      instructor: new FormControl(0, [])
    });
  }

  setData() {
    this.obj = this.form.value
    // console.log(this.obj)
    this.obj.city_id = this.searchCity();
  }

  disabledInputs(data?: any) {
    // console.log(data)
    if (data) {
      this.form.controls['country_id'].setValue(data.profile[0].country_id)
      this.form.controls['language_id'].setValue(data.profile[0].language_id)
      this.getCities(data.profile[0].country_id)
      let city = data.profile[0].cities.name + ', ' + data.profile[0].cities.code;
      this.form.controls['city_id'].setValue(city)
      // this.searchCity();

      // this.form.controls['country_id'].disable()
      // this.form.controls['language_id'].disable()
      // this.form.controls['city_id'].disable()

      if (this.rol === '4' || this.rol === '5') {
        this.form.controls['institution'].setValue(data.profile[0].institution)
        this.form.controls['institution'].disable()
      }
    } else {
      //   this.form.controls['country_id'].disable()
      //   this.form.controls['language_id'].disable()
      //   this.form.controls['city_id'].disable()
      this.form.controls['institution'].disable()
    }
  }

  getInfo() {
    this.authService.getInfo().subscribe({
      next: (v) => {
        this.userInfo = v
        this.disabledInputs(v)
      },
      error: (e) => {
        console.log(e)
      }
    })
  }
  searchCity() {
    // console.log(this.userInfo)
    let city_name = this.form.controls['city_id'].value;
    let city = this.dataCities.find(aaaa => aaaa.name === city_name);
    return city.id
  }

  enableInputs() {
    this.form.controls['country_id'].enable()
    this.form.controls['language_id'].enable()
    this.form.controls['city_id'].enable()

    if (this.rol === '4' || this.rol === '5') {
      this.form.controls['institution'].enable()
    }
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }

  setRol() {
    if (this.rol === '3' || this.rol === '4' || this.rol === '5') {
      this.form.controls['role_id'].setValue(this.dataRoles[0].id);
    }
  }

  displayFn(name: any): string {
    return name ? name : '';
  }
  autoComplete() {
    setTimeout(() => {
      this.filteredOptions = this.form.controls['city_id'].valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.name;
          // console.log(name ? this._filter(name as string) : this.claveProdServ.slice());
          // console.log(name.length)
          if (name.length > 2) {
            return name ? this._filter(name as string) : this.dataCities.slice();
          }
          // }
        }),
      );
    }, 0);
  }
  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.dataCities.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  removeFocus(){
    this.inputCity.nativeElement.blur();
  }
}
