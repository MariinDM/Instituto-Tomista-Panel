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
          // localStorage.setItem('code', this.code)
          // localStorage.setItem('rol', this.rol)
          // console.log("DATOS",v)
          this.authService.getInfo().subscribe({
            next: (v) => {
              localStorage.setItem('rol', v.me.role_id)
              this.spinner.hide()
              this.router.navigate(['/dashboard'])
            },
            error: (e) => {
              console.log(e)
            }
          })
        },
        error: (e) => {
          this.error = e;
          this.submitted = false;
          this.spinner.hide()
        }
      })
    }
  }
  createForm(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
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
