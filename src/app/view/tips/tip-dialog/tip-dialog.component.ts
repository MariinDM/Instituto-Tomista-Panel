import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';
import { TipService } from 'src/app/services/tip.service';
import { GetFilesComponent } from '../../get-files/get-files.component';
import { DatePipe } from '@angular/common';
import * as LANGUAGE from 'src/assets/i18n/translate.json';

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
  language!: any
  obj!: any
  clear: any = {
    title: '',
    description: ''
  }
  translate: any = LANGUAGE

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
      this.form.controls['language'].setValue(this.code)
      this.language = this.code
      this.selectLanguage()
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

    var datePipe = new DatePipe('en-US');

    let start = datePipe.transform(this.form.controls['start_date'].value, 'yyyy-MM-dd')
    let end = datePipe.transform(this.form.controls['end_date'].value, 'yyyy-MM-dd')

    fd.set('id', this.data.element ? this.data.element.id : null)
    fd.set('title', this.form.controls['title'].value)
    fd.set('description', this.form.controls['description'].value)
    fd.set('start_date', start)
    fd.set('end_date', end)
    fd.set('active', this.form.controls['active'].value)

    var id = 0
    var message = ''

    if (!this.data.edit) {
      if (this.image) {
        fd.set('image', this.image)
        this.tipService.insert(this.code, fd).subscribe({
          next: (v) => { message = v.message, id = v.tip_id },
          error: (e) => { this.openSnack(e) },
          complete: () => {
            this.tipService.uploadImg(this.code, id, fd).subscribe({
              next: (v) => { this.openSnack(message) },
              error: (e) => { this.openSnack(e) },
              complete: () => { this.dialog.closeAll() }
            })
          }
        })
      }
      else {
        this.tipService.insert(this.code, fd).subscribe({
          next: (v) => { this.openSnack(v.message) },
          error: (e) => { this.openSnack(e) },
          complete: () => { this.dialog.closeAll() }
        })
      }
    } else {
      if (this.image) {
        fd.set('image', this.image)
        this.tipService.update(this.language, this.data.element.id, fd).subscribe({
          next: (v) => { message = v.message, id = v.view_id },
          error: (e) => { this.openSnack(e) },
          complete: () => {
            this.tipService.uploadImg(this.code, this.data.element.id, fd).subscribe({
              next: (v) => { this.openSnack(message) },
              error: (e) => { this.openSnack(e) },
              complete: () => { this.dialog.closeAll() }
            })
          }
        })
      }
      else {
        this.tipService.update(this.language, this.data.element.id, fd).subscribe({
          next: (v) => { this.openSnack(v.message) },
          error: (e) => { this.openSnack(e) },
          complete: () => { this.dialog.closeAll() }
        })
      }
    }
  }

  selectLanguage() {
    this.form.controls['language'].valueChanges.subscribe(() => {
      this.language = this.form.controls['language'].value
      this.tipService.getone(this.language, this.data.element.id).subscribe({
        next: (v) => {
          this.obj = v.tip
          if (this.language == 'en') {
            this.form.patchValue(this.obj)
          } else {
            if (this.obj.title == this.data.element.title) {

              if (this.obj.description == this.data.element.description) {
                this.form.patchValue(this.clear)
              } else {
                this.form.patchValue(this.obj)
              }
            } else {
              this.form.patchValue(this.obj)
            }
          }
        },
        error: (e) => { this.openSnack(e) },
        complete: () => { }
      })
    })
  }

  createForm(): void {
    if (!this.data.edit) {
      this.form = this.fb.group({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        image: new FormControl('',),
        start_date: new FormControl('',),
        end_date: new FormControl('',),
        active: new FormControl(false)
      });
    } else {
      this.form = this.fb.group({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        image: new FormControl('',),
        start_date: new FormControl('',),
        end_date: new FormControl('',),
        language: new FormControl(''),
        active: new FormControl(false)
      });
    }
  }

  openSnack(message: string) {
    this._snack.open(message, '', {
      duration: 1000,
    })
  }
  getFile() {
    this.dialog.open(GetFilesComponent, {
      data: { edit: 3 },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe((result) => {
      this.image = result.image
    })
  }

}
