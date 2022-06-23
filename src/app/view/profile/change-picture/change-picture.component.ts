import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-change-picture',
  templateUrl: './change-picture.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class ChangePictureComponent implements OnInit {

  validateIMG = false
  image: any = null
  code = localStorage.getItem('code')

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snack: MatSnackBar,
    private dialog: MatDialog,
    private userService: UsersService) { }

  ngOnInit(): void {
  }

  sendData(): void {
    var fb = new FormData()
    if (this.data.edit) {
      //Profile
      fb.set('profile_picture', this.image)
      this.userService.upProfile(this.code, this.data.user.id, fb).subscribe({
        next: (v) => { this.openSnack(v.message) },
        error: (e) => { this.openSnack(e.error.error.message) },
        complete: () => { this.dialog.closeAll() }
      })
    } else {
      //Institution
      fb.set('institution_picture', this.image)
      this.userService.upInstitution(this.code, this.data.user.id, fb).subscribe({
        next: (v) => { this.openSnack(v.message) },
        error: (e) => { this.openSnack(e.error.error.message) },
        complete: () => { this.dialog.closeAll() }
      })
    }

  }

  onImageChangeFromFile($event: any) {
    if ($event.target.files && $event.target.files[0]) {
      let file = $event.target.files[0];
      // console.log(file);
      if (file.type == "image/jpeg" || file.type == "image/jpg" || file.type == "image/png") {
        this.validateIMG = false
        this.image = file
        // console.log('yes')
      }
      else {
        this.validateIMG = true
        // console.log('no')
      }
    }
  }

  openSnack(message: string) {
    this._snack.open(message, '', {
      duration: 1000,
    })
  }
}
