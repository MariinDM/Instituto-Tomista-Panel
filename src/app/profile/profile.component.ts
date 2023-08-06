import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../app.component.scss']
})
export class ProfileComponentDash implements OnInit {
  breadscrums = [
    {
      title: 'Profile',
      items: ['Extra'],
      active: 'Profile'
    }
  ];

  user: any = {};
  form: FormGroup;
  role: number = 0;

  constructor(
    private apiService: ApiServiceService,
    private fb: FormBuilder,
    private _snack: MatSnackBar
  ) { this.buildForm() }

  ngOnInit() {
    this.getData()
  }

  getData() {
    this.apiService.profile().subscribe({
      next: (v) => {
        this.role = v.me.role.id
        if (v.me.role.id === 3) {

          this.user.full_name = `${v.me.profile.name} ${v.me.profile.last_name}`
          this.user.role = v.me.role.name
          this.user.img = `${environment.apiUrl}get/profile/picture/${v.me.profile.image}`
          this.user.address = `${v.me.profile.number}, ${v.me.profile.street}, ${v.me.profile.suburb}`
          this.user.location = `${v.me.profile.zip_code}, ${v.me.profile.city}`
          this.user.phone = v.me.profile.phone
          this.user.group = `${v.me.student.group.grade.name} ${v.me.student.group.section.name}`
          this.user.lessons = v.me.student.group?.groupUserLessons?.map((item) => item.lesson.name) || [];
          this.user.level = v.me.student.group?.groupUserLessons[0]?.education_level.name

        } else if (v.me.role.id === 2) {

          this.user.full_name = `${v.me.profile.name} ${v.me.profile.last_name}`
          this.user.role = v.me.role.name
          this.user.img = `${environment.apiUrl}get/profile/picture/${v.me.profile.image}`
          this.user.address = `${v.me.profile.number}, ${v.me.profile.street}, ${v.me.profile.suburb}`
          this.user.location = `${v.me.profile.zip_code}, ${v.me.profile.city}`
          this.user.phone = v.me.profile.phone
          this.user.groups = v.me.groupUserLessons.map(item => ({
            education_level: item.education_level.name,
            group: `${item.group.grade.name} ${item.group.section.name}`,
            lesson: item.lesson.name
          }));

          console.log(this.user)

        }
      },
      error: (e) => {
        console.log(e)
      }
    })
    // console.log(this.user)
  }

  buildForm(): void {
    this.form = this.fb.group({
      type: new FormControl('singin'),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    })
  }

  changePassword(): void {
    if (this.form.invalid) return
    this.apiService.resetPassword(this.form.value).subscribe({
      next: (v) => {
        // console.log(v)
        this.openSnack(v.message)
        this.form.reset()
      },
      error: (e) => {
        console.log(e)
      }
    })
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }
}
