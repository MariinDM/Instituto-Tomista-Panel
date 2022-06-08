import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Viewsroles } from 'src/app/interfaces/viewsroles'
import { RolesService } from 'src/app/services/roles.service'
import { ViewService } from 'src/app/services/view.service'
import { ViewsrolesService } from 'src/app/services/viewsroles.service'

@Component({
  selector: 'app-assign-viewsroles',
  templateUrl: './assign-viewsroles.component.html',
  styleUrls: ['../../../../app.component.scss']
})
export class AssignViewsrolesComponent implements OnInit {
  
  premium!:boolean
  dataRoles: any[] = []
  viewsRole: any[] = []
  newViews: number[] = []
  dataViews: any[] = []

  constructor(
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private vrService: ViewsrolesService,
    private rolService: RolesService,
    private viewService: ViewService) { }

  ngOnInit() {
    this.getallRoles()
    this.getallViews()
  }

  sendData() {
    this.newViews = [];
    this.viewsRole.forEach(view => {
      this.newViews.push(view.id);
    })
    console.log({ role_id: 1, views: this.newViews, premium: this.premium, active: true})

  }

  getallRoles() {
    this.rolService.getall().subscribe((data: any) => {
      this.dataRoles = data
    })
  }
  getallViews() {
    this.viewService.getall().subscribe((data: any) => {
      this.dataViews = data
    })
  }

  check(idItem: number): boolean {
    const item = this.viewsRole.find(({ id }) => id === idItem);

    if (item) { return true; }

    return false;
  }

  onChange(event: any) {
    if (event.checked) {
      this.viewsRole.push(event.source.value);
    } else {
      const removeIndex = this.viewsRole.map((view) => view.id).indexOf(event.source.value.id);
      this.viewsRole.splice(removeIndex, 1);
    }
  }

  openSnack(message: string) {
    this._snack.open(message, '', {
      duration: 1000,
    })
  }

}
