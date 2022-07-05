import { Component, Inject, OnInit } from '@angular/core'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ViewService } from 'src/app/services/view.service'
import { ViewsrolesService } from 'src/app/services/viewsroles.service'

@Component({
  selector: 'app-assign-viewsroles',
  templateUrl: './assign-viewsroles.component.html',
  styleUrls: ['../../../../app.component.scss']
})
export class AssignViewsrolesComponent implements OnInit {

  premium = false
  dataRoles: any[] = []
  viewsRole: any[] = []
  newViews: number[] = []
  dataViews: any[] = []
  code = localStorage.getItem('code')

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private vrService: ViewsrolesService,
    private viewService: ViewService) { }

  ngOnInit() {
    this.viewsRole = this.data.element.views;
    this.getallViews()
    if (this.data.element.role_view[0]) { this.premium = this.data.element.role_view[0].premium }
  }

  sendData() {
    this.newViews = [];
    this.viewsRole.forEach(view => {
      this.newViews.push(view.id);
    })
    this.vrService.update(this.code, { role_id: this.data.element.id, views: this.newViews, premium: this.premium, active: true }).subscribe({
      next: (v) => {
        this.openSnack(v.message)
      },
      error: (e) => {
        this.openSnack(e.error.error.message)
      },
      complete: () => {
        this.dialog.closeAll()
      }
    })
  }

  getallViews() {
    this.viewService.getall(this.code).subscribe((data: any) => {
      this.dataViews = data.views
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
