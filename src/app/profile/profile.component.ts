import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { environment } from 'src/environments/environment';

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

  constructor(
    private apiService: ApiServiceService
  ) { }

  ngOnInit() {
    this.getData()
  }

  getData() {
    this.apiService.profile().subscribe({
      next: (v) => {
        this.user.full_name = `${v.me.profile.name} ${v.me.profile.last_name}`
        this.user.role = v.me.role.name
        this.user.img = `${environment.apiUrl}get/profile/picture/${v.me.profile.image}`
        this.user.address = `${v.me.profile.number}, ${v.me.profile.street}, ${v.me.profile.suburb}`
        this.user.location = `${v.me.profile.zip_code}, ${v.me.profile.city}`
        this.user.phone = v.me.profile.phone
      },
      error: (e) => {
        console.log(e)
      }
    })
  }
}
