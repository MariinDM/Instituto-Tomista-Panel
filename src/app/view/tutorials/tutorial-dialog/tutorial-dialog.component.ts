import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';
import { TutorialService } from 'src/app/services/tutorial.service';
import { GetFilesComponent } from '../../get-files/get-files.component';
import { DatePipe } from '@angular/common';
import * as LANGUAGE from 'src/assets/i18n/translate.json';

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
  language: any = 'en'
  obj!: any
  dataEnglish: any;
  clear: any = {
    title: '',
    description: ''
  }
  translate: any = LANGUAGE

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private tutorialService: TutorialService,
    private userService: UsersService,
    private fb: FormBuilder) { this.createForm() }

  ngOnInit(): void {
    if (this.data.edit) {
      this.getData()
      this.form.controls['language'].setValue('en')
      // this.language = this.language
      this.selectLanguage()
    }
  }

  getData(): void {
    this.userService.getlanguages(this.code).subscribe((data: any) => {
      this.dataLanguages = data.languages
    })
    this.tutorialService.getone('en', this.data.element.id).subscribe({
      next: (v) => {
        this.dataEnglish = v.tutorial
        this.form.patchValue(this.dataEnglish)
      },
      error: (e) => {
        console.log(e)
      }
    })
  }

  sendData() {
    if (this.form.invalid) { return }

    var datePipe = new DatePipe('en-US');

    let start = ''
    let end = ''

    if (this.form.controls['start_date'].value) {
      start = datePipe.transform(this.form.controls['start_date'].value, 'yyyy-MM-dd')
      end = datePipe.transform(this.form.controls['end_date'].value, 'yyyy-MM-dd')
    }

    var fd = new FormData()

    // fd.set('id', this.data.element ? this.data.element.id : null)
    fd.set('title', this.form.controls['title'].value)
    fd.set('url', this.form.controls['url'].value)
    fd.set('image', this.form.controls['image'].value)
    fd.set('description', this.form.controls['description'].value)
    fd.set('start_date', start)
    fd.set('end_date', end)
    fd.set('active', this.form.controls['active'].value)

    var id = 0
    var message = ''

    if (!this.data.edit) {

      //IMAGE VALIDATION
      if (this.image === null) {
        this.openSnack(this.translate.validations.image)
        return
      }

      if (this.image) {
        // fd.set('image', this.image)
        this.tutorialService.insert(this.language, fd).subscribe({
          next: (v) => { message = v.message, id = v.tutorial_id },
          error: (e) => { this.openSnack(e) },
          complete: () => {
            let fd_image = new FormData();
            fd_image.append('image', this.image)
            this.tutorialService.uploadImg(this.language, id, fd_image).subscribe({
              next: (v) => { this.openSnack(message) },
              error: (e) => { this.openSnack(e) },
              complete: () => { this.dialog.closeAll() }
            })
          }
        })
      }
      else {
        this.tutorialService.insert(this.language, fd).subscribe({
          next: (v) => { this.openSnack(v.message) },
          error: (e) => { this.openSnack(e) },
          complete: () => { this.dialog.closeAll() }
        })
      }
    } else {
      if (this.image) {
        // fd.set('image', this.image)
        this.tutorialService.update(this.language, this.data.element.id, fd).subscribe({
          next: (v) => { message = v.message, id = v.view_id },
          error: (e) => { this.openSnack(e) },
          complete: () => {
            let fd_image = new FormData();
            fd_image.append('image', this.image)
            this.tutorialService.uploadImg(this.language, this.data.element.id, fd_image).subscribe({
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
            if (this.obj.title == this.dataEnglish.title) {

              if (this.obj.description == this.dataEnglish.description) {
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
        start_date: new FormControl(null,),
        end_date: new FormControl(null,),
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
