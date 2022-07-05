import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';
import { TipService } from 'src/app/services/tip.service';

@Component({
  selector: 'app-tip-dialog',
  templateUrl: './tip-dialog.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class TipDialogComponent implements OnInit {

  form!: FormGroup
  view!: any
  dataLanguages!: any[]
  validateIMG = false
  image: any = null
  code = localStorage.getItem('code')

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private tipService: TipService,
    private userService: UsersService,
    private fb: FormBuilder) { this.createForm() }

  ngOnInit(): void {
    if (this.data.edit) {
      this.form.patchValue(this.data.element);
    }
    this.getLanguages()
  }

  getLanguages(): void {
    this.userService.getlanguages(this.code).subscribe((data: any) => {
      this.dataLanguages = data.languages
    })
  }

  sendData() {
    if (this.form.invalid) { return }

    var fd = new FormData()

    fd.set('id', this.data.element ? this.data.element.id : null)
    fd.set('title', this.form.controls['title'].value)
    fd.set('description', this.form.controls['description'].value)
    fd.set('image', this.image)
    fd.set('start_date', this.form.controls['start_date'].value)
    fd.set('end_date', this.form.controls['end_date'].value)
    fd.set('active', this.data.element ? this.data.element.active : true)

    var id = 0
    var message = ''

    if (!this.data.edit) {
      if (this.image) {
        console.log(this.form.value)
        // this.tipService.insert(this.code, fd).subscribe({
        //   next: (v) => { message = v.message, id = v.view_id },
        //   error: (e) => { message = e.error.error.message },
        //   complete: () => {
        //     this.tipService.uploadImg(this.code, id, fd).subscribe({
        //       next: (v) => { this.openSnack(message) },
        //       error: (e) => { this.openSnack(e.error.error.message) },
        //       complete: () => { this.dialog.closeAll() }
        //     })
        //   }
        // })
      }
      else {
        console.log(this.form.value)
        // this.tipService.insert(this.code, fd).subscribe({
        //   next: (v) => { this.openSnack(v.message) },
        //   error: (e) => { this.openSnack(e.error.error.message) },
        //   complete: () => { this.dialog.closeAll() }
        // })
      }
    } else {
      if (this.image) {
        fd.set('image', this.image)
        this.tipService.update(this.code, this.data.element.id, fd).subscribe({
          next: (v) => { message = v.message, id = v.view_id },
          error: (e) => { message = e.error.error.message },
          complete: () => {
            this.tipService.uploadImg(this.code, this.data.element.id, fd).subscribe({
              next: (v) => { this.openSnack(message) },
              error: (e) => { this.openSnack(e.error.error.message) },
              complete: () => { this.dialog.closeAll() }
            })
          }
        })
      }
      else {
        this.tipService.update(this.code, this.data.element.id, fd).subscribe({
          next: (v) => { this.openSnack(v.message) },
          error: (e) => { this.openSnack(e.error.error.message) },
          complete: () => { this.dialog.closeAll() }
        })
      }
    }
  }

  createForm(): void {
    this.form = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('',),
      image: new FormControl('',),
      start_date: new FormControl('',),
      end_date: new FormControl('',),
    });
  }

  openSnack(message: string) {
    this._snack.open(message, '', {
      duration: 1000,
    })
  }
  onImageChangeFromFile($event: any) {
    if ($event.target.files && $event.target.files[0]) {
      let file = $event.target.files[0];
      // console.log(file);
      if (file.type == "image/jpeg" || file.type == "image/jpg" || file.type == "image/png") {
        this.validateIMG = false
        this.image = file
        console.log('yes')
      }
      else {
        this.validateIMG = true
        console.log('no')
      }
    }
  }

}
