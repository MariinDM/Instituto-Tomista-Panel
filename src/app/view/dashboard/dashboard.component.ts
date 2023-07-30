import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiServiceService } from 'src/app/services/api-service.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../app.component.scss']
})
export class DashboardComponent implements OnInit {
  data: any[] = []
  loader = true
  filter: string = ''
  user: any = {};

  constructor(
    private apiService: ApiServiceService,
    private _snack: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.apiService.profile().subscribe({
      next: (v) => {
        // console.log(v)
        this.user.email = v.me.email
        this.user.full_name = `${v.me.profile.name} ${v.me.profile.last_name}`
        this.user.group = v.me.student ? `${v.me.student?.group.grade.name} ${v.me.student?.group.section.name}` : 
        this.user.level = v.me.student?.group?.groupUserLessons[0]?.education_level.name
      },
      error: (e) => {
        console.log(e)
      }
    })
    // console.log(this.user)
  }

}
