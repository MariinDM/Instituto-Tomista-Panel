import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../app.component.scss']
})
export class DashboardComponent implements OnInit {

  user!: any
  code!: string

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.language()
  }

  language(): void {
    this.user = this.authService.getInfo().subscribe({
      next: (v) => { this.code = v.profile[0].languages.code },
      error: (e) => { console.log(e) },
      complete: () => { localStorage.setItem('code', this.code) }
    })
  }
}
