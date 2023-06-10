import { AfterViewInit, Component, Directive, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiServiceService } from 'src/app/services/api-service.service';

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataRow: any,
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private apiService: ApiServiceService,
    private fb: FormBuilder) { this.createForm() }

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
    }
  }

  sendData() {
    if (this.form.invalid) { return }
    this.setData()
    if (!this.edit) {
      this.apiService.addUser(this.obj).subscribe({
        next: (v) => { 
          console.log(v)
          this.openSnack(v.message) },
        error: (e) => { this.openSnack(e) },
        complete: () => { this.dialog.closeAll() }
      })
    } else {
      this.apiService.updateUser(this.obj).subscribe({
        next: (v) => { this.openSnack(v.message) },
        error: (e) => { this.openSnack(e) },
        complete: () => { this.dialog.closeAll() }
      })
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
      phone: this.element.profile.phone
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


}
