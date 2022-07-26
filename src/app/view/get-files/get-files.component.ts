import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CropperComponent } from 'angular-cropperjs';

@Component({
  selector: 'app-get-files',
  templateUrl: './get-files.component.html',
  styleUrls: ['../../app.component.scss']
})
export class GetFilesComponent implements OnInit {

  @ViewChild('img') angularCropper: CropperComponent

  form!: FormGroup
  image: any = null
  imageActual: any = null
  config = {
    zoomable: false,
    aspectRatio: 1 / 1
  }
  newImg!: any
  load:boolean = false

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb: FormBuilder,
    private _snack: MatSnackBar,
    private dialogRef: MatDialogRef<GetFilesComponent>) { this.createForm() }

  ngOnInit(): void {
    this.onImageChangeFromFile()
    if(this.data.edit == 2){
      this.config = {
        zoomable: false,
        aspectRatio: 16 / 9
      }
    } else if ( this.data.edit == 3){
      this.config = {
        zoomable: false,
        aspectRatio: 3 / 4
      }
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
  getImgCropper() {
    this.load = true
    this.angularCropper.cropper.getCroppedCanvas().toBlob(blob => {
      let type = blob.type
      this.newImg = new File([blob], 'Image', { type });
      this.dialogRef.close({
        image: this.newImg
      })
      this.load = false
    })
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
  createForm() {
    this.form = this.fb.group({
      image: new FormControl('', []),
    });
  }
  openSnack(message: string) {
    this._snack.open(message, '', {
      duration: 1000,
    })
  }
}
