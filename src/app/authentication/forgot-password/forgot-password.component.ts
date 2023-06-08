import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../../app.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiServiceService,
    private _snack: MatSnackBar,
  ) { }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)]
      ]
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      this.apiService.sendMailRoute(this.loginForm.value).subscribe({
        next: (v) => {
          this.openSnack(v.message)
          this.router.navigate(['/dashboard']);
        },
        error: (e) => {
          this.openSnack(e.message)
        }
      })
    }
  }
  openSnack(message: string) {
    this._snack.open(message, '', {
      duration: 1000
    })
  }
}
