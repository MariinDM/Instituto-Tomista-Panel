import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';
import { CropperComponent } from 'angular-cropperjs';

@Component({
  selector: 'app-change-picture',
  templateUrl: './change-picture.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class ChangePictureComponent implements OnInit {

  @ViewChild('img') angularCropper: CropperComponent

  form!: FormGroup
  image: any = null
  code = localStorage.getItem('code')
  imageActual: any = null
  config = {
    zoomable: false,
    aspectRatio: 1 / 1
  }
  newImg: any = null

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snack: MatSnackBar,
    private dialog: MatDialog,
    private userService: UsersService,
    private fb: FormBuilder) { this.createForm() }

  ngOnInit(): void {
    this.onImageChangeFromFile()
  }

  async sendData(): Promise<void> {
    this.imageActual = this.angularCropper.cropper.getCroppedCanvas().toDataURL()
    this.newImg = await this.convertBase64ToFile(this.imageActual, 'hola')
    var fb = new FormData()
    if (this.data.edit) {
      //Profile
      fb.set('profile_picture', this.newImg)
      this.userService.upProfile(this.code, this.data.user.id, fb).subscribe({
        next: (v) => { this.openSnack(v.message) },
        error: (e) => { this.openSnack(e) },
        complete: () => { this.dialog.closeAll() }
      })
    } else {
      //Institution
      fb.set('institution_picture', this.newImg)
      this.userService.upInstitution(this.code, this.data.user.id, fb).subscribe({
        next: (v) => { this.openSnack(v.message) },
        error: (e) => { this.openSnack(e) },
        complete: () => { this.dialog.closeAll() }
      })
    }
  }

  onImageChangeFromFile() {
    this.form.controls['image'].valueChanges.subscribe((files: any) => {
      let reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = (_event) => {
        this.image = reader.result;
      }
    })
  }
  async getImgCropper(): Promise<void> {
    this.imageActual = this.angularCropper.cropper.getCroppedCanvas().toDataURL()
    this.newImg = await this.convertBase64ToFile(this.imageActual, 'hola')
  }

  convertBase64ToFile(fileBase64: string, name: string): Promise<File> {
    const url = fileBase64;
    const type = url.substring(url.indexOf(':') + 1, url.indexOf(';base64'));
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], name, { type });
          resolve(file);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  openSnack(message: string) {
    this._snack.open(message, '', {
      duration: 1000,
    })
  }

  createForm() {
    this.form = this.fb.group({
      image: new FormControl('', []),
    });
  }
}
