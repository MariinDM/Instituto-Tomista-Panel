import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';
import { TutorialService } from 'src/app/services/tutorial.service';
import { GetFilesComponent } from '../../get-files/get-files.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tutorial-dialog',
  templateUrl: './tutorial-dialog.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class TutorialDialogComponent implements OnInit {

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private tutorialService: TutorialService,
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
    }, (error: any) => {
      this.openSnack(error)
    })
  }

  sendData() {
    if (this.form.invalid) { return }

    var datePipe = new DatePipe('en-US');

    let start = datePipe.transform(this.form.controls['start_date'].value, 'yyyy-MM-dd')
    let end = datePipe.transform(this.form.controls['end_date'].value, 'yyyy-MM-dd')

    var fd = new FormData()

    fd.set('id', this.data.element ? this.data.element.id : null)
    fd.set('title', this.form.controls['title'].value)
    fd.set('url', this.form.controls['url'].value)
    fd.set('description', this.form.controls['description'].value)
    fd.set('start_date', start)
    fd.set('end_date', end)
    fd.set('active', this.form.controls['active'].value)

    var id = 0
    var message = ''

    if (!this.data.edit) {
      if (this.image) {
        fd.set('image', this.image)
        this.tutorialService.insert(this.code, fd).subscribe({
          next: (v) => { message = v.message, id = v.tutorial_id },
          error: (e) => { this.openSnack(e) },
          complete: () => {
            this.tutorialService.uploadImg(this.code, id, fd).subscribe({
              next: (v) => { this.openSnack(message) },
              error: (e) => { this.openSnack(e) },
              complete: () => { this.dialog.closeAll() }
            })
          }
        })
      }
      else {
        this.tutorialService.insert(this.code, fd).subscribe({
          next: (v) => { this.openSnack(v.message) },
          error: (e) => { this.openSnack(e) },
          complete: () => { this.dialog.closeAll() }
        })
      }
    } else {
      if (this.image) {
        fd.set('image', this.image)
        this.tutorialService.update(this.language, this.data.element.id, fd).subscribe({
          next: (v) => { message = v.message, id = v.view_id },
          error: (e) => { this.openSnack(e) },
          complete: () => {
            this.tutorialService.uploadImg(this.code, this.data.element.id, fd).subscribe({
              next: (v) => { this.openSnack(message) },
              error: (e) => { this.openSnack(e) },
              complete: () => { this.dialog.closeAll() }
            })
          }
        })
      }
      else {
        this.tutorialService.update(this.language, this.data.element.id, fd).subscribe({
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
      this.tutorialService.getone(this.language, this.data.element.id).subscribe({
        next: (v) => {
          this.obj = v.tutorial
          if (this.language == 'en') {
            this.form.patchValue(this.obj)
          } else {
            if (this.obj.title == this.data.element.title) {
              console.log('si')

              if (this.obj.description == this.data.element.description) {
                this.form.patchValue(this.clear)
              } else {
                console.log('no')
              }

            } else {
              console.log('no')
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
        url: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        image: new FormControl('',),
        start_date: new FormControl('',),
        end_date: new FormControl('',),
        active: new FormControl(false)
      });
    } else {
      this.form = this.fb.group({
        title: new FormControl('', [Validators.required]),
        url: new FormControl('', [Validators.required]),
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
      data: { edit: 2 },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe((result) => {
      this.image = result.image
    })
  }

}
