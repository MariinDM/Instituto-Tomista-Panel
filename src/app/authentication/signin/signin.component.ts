import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { AuthService } from 'src/app/services/auth.service';
import { Auth } from 'src/app/interfaces/user';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['../../app.component.scss']
})
export class SigninComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  loginForm: FormGroup
  submitted = false
  error = ''
  hide = true
  auth!: Auth
  user!: any

  code!: string
  rol!: string

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService) { super(); this.createForm() }
  ngOnInit() {
  }

  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.error = 'Username or Password not valid !'
      return
    } else {
      this.spinner.show()
      this.setData()
      this.subs.sink = this.authService.login(this.auth).subscribe({
        next: (v) => {
        },
        error: (e) => {
          this.error = e;
          this.submitted = false;
          this.spinner.hide()
        },
        complete: () => {
          let id = ''
          this.authService.getInfo().subscribe({
            next: (v) => { this.code = v.profile[0].languages.code, this.rol = v.rol[0].id, id = v.id },
            error: (e) => { console.log(e) },
            complete: () => {
              localStorage.setItem('code', this.code)
              localStorage.setItem('rol', this.rol)
              localStorage.setItem('id', id)
              this.submitted = true
              this.router.navigate(['/dashboard'])
              this.spinner.hide()
            }
          })
        }
      })
    }
  }
  createForm(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]),
      password: new FormControl('', [Validators.required])
    });
  }

  setData(): void {
    this.auth = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    }
  }
}
