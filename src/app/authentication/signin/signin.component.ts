import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { AuthService } from 'src/app/services/auth.service';
import { Auth } from 'src/app/interfaces/user';

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

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    super();
    this.createForm()
  }
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
      this.setData()
      this.subs.sink = this.authService.login(this.auth).subscribe({
        next: (v) => {
          this.router.navigate(['/dashboard'])
        },
        error: (e) => {
          this.error = 'Invalid Credentials';
          this.submitted = false;
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
