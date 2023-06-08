import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../../app.component.scss']
})
export class ResetPasswordComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  loginForm: FormGroup
  submitted = false
  error = ''
  hide = true
  obj: any;
  token: string = ''

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snack: MatSnackBar,
    private apiService: ApiServiceService,
    private spinner: NgxSpinnerService) { super(); this.createForm() }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token');
    });
  }

  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.error = 'Las contraseñas no coinciden'
      return
    } else {
      this.spinner.show()
      this.setData()
      this.subs.sink = this.apiService.resetPassword(this.obj).subscribe({
        next: (v) => {
          this.openSnack(v.message)
          this.spinner.hide()
          this.router.navigate(['/dashboard'])
        },
        error: (e) => {
          this.openSnack(e.message)
          this.error = e;
          this.submitted = false;
          this.spinner.hide()
        }
      })
    }
  }
  createForm(): void {
    this.loginForm = this.fb.group({
      confirmPassword: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  setData(): void {
    this.obj = {
      token: this.token,
      ...this.loginForm.value
    }
  }
  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }

}
