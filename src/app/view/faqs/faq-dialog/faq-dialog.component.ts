import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FaqService } from 'src/app/services/faq.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-faq-dialog',
  templateUrl: './faq-dialog.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class FaqDialogComponent implements OnInit {

  form!: FormGroup
  view!: any
  dataLanguages!: any[]
  code = localStorage.getItem('code')

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private faqService: FaqService,
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
    fd.set('text', this.form.controls['text'].value)
    fd.set('url', this.form.controls['url'].value)

    var id = 0
    var message = ''

    if (!this.data.edit) {
      console.log(this.form.value)
      // this.faqService.insert(this.code, fd).subscribe({
      //   next: (v) => { this.openSnack(v.message) },
      //   error: (e) => { this.openSnack(e.error.error.message) },
      //   complete: () => { this.dialog.closeAll() }
      // })
    } else {
      this.faqService.update(this.code, this.data.element.id, fd).subscribe({
        next: (v) => { this.openSnack(v.message) },
        error: (e) => { this.openSnack(e.error.error.message) },
        complete: () => { this.dialog.closeAll() }
      })
    }
  }

  createForm(): void {
    this.form = this.fb.group({
      title: new FormControl('', [Validators.required]),
      text: new FormControl('',),
      url: new FormControl('', [Validators.required]),
    });
  }

  openSnack(message: string) {
    this._snack.open(message, '', {
      duration: 1000,
    })
  }
}
