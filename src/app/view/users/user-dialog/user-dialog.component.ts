import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { GetFilesComponent } from '../../get-files/get-files.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class UserDialogComponent implements OnInit {

  form!: FormGroup
  obj!: any;
  data!: any;
  roles!: any[]
  element!: any;
  edit!: any;
  minDate: Date;
  maxDate: Date;
  image: any;


  constructor(
    @Inject(MAT_DIALOG_DATA) public dataRow: any,
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private apiService: ApiServiceService,
    private datePipe: DatePipe,
    private fb: FormBuilder) {
    this.createForm()
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 80, 0, 1);
    this.maxDate = new Date(currentYear - 6, 11, 31);
  }

  ngOnInit(): void {
    this.element = this.dataRow.element
    this.edit = this.dataRow.edit
    this.getData();
    if (this.edit) {
      this.setForm()
    }
  }

  getData() {
    this.apiService.getRoles().subscribe({
      next: (v) => {
        this.roles = v.roles.filter(item => item.active);
      },
      error: (e) => { this.openSnack(e) },
    })
  }

  setData() {
    if (!this.edit) {
      this.obj = this.form.value
      this.obj.password = this.generatePassword()
    } else {
      this.obj = {
        id: this.element.id,
        ...this.form.value
      }
      this.obj.birthday = this.datePipe.transform(this.obj.birthday, 'MM/dd/yyyy');
    }
  }

  sendData() {
    if (this.form.invalid) { return }
    this.setData()
    if (!this.edit) {
      if (!this.image) { this.openSnack('Favor de seleccionar una imagen') }
      let message = '';
      this.apiService.addUser(this.obj).subscribe({
        next: (v) => {
          message = v.message
          let fd_image = new FormData();
          fd_image.append('context', 'Profile')
          fd_image.append('profile_pic', this.image)
          this.apiService.uploadFile({ id: v.user_id }, fd_image).subscribe({
            next: (v) => {
              this.openSnack(message)
              this.dialog.closeAll()
            },
            error: (e) => {
              console.log(e)
            }
          })
        },
        error: (e) => { this.openSnack(e) }
      })
    } else {
      if (this.image) {
        let message = '';
        this.apiService.updateUser(this.obj).subscribe({
          next: (v) => {
            message = v.message
            let fd_image = new FormData();
            fd_image.append('context', 'Profile')
            fd_image.append('profile_pic', this.image)
            this.apiService.uploadFile({ context: 'Profile', id: v.user_id }, fd_image).subscribe({
              next: (v) => {
                this.openSnack(message)
                this.dialog.closeAll()
              },
              error: (e) => {
                console.log(e)
              }
            })
          },
          error: (e) => { this.openSnack(e) },
        })
      } else {
        this.apiService.updateUser(this.obj).subscribe({
          next: (v) => { this.openSnack(v.message), this.dialog.closeAll() },
          error: (e) => { this.openSnack(e) },
        })
      }
    }
  }

  createForm() {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      role_id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      suburb: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zip_code: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern(/^[1-9]\d{6,10}$/)]),
      birthday: new FormControl('', [Validators.required]),
    });
  }

  setForm() {
    // console.log(this.element)
    let formObj = {
      email: this.element.email,
      role_id: this.element.role_id,
      name: this.element.profile.name,
      last_name: this.element.profile.last_name,
      street: this.element.profile.street,
      number: this.element.profile.number,
      suburb: this.element.profile.suburb,
      city: this.element.profile.city,
      state: this.element.profile.state,
      zip_code: this.element.profile.zip_code,
      phone: this.element.profile.phone,
      birthday: this.element.profile.birthday
    }

    this.form.patchValue(formObj)

    this.form.get('email').disable();

  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }

  generatePassword(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';

    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }

    return password;
  }

  getFile() {
    this.dialog.open(GetFilesComponent, {
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe((result) => {
      this.image = result.image
    })
  }


}
