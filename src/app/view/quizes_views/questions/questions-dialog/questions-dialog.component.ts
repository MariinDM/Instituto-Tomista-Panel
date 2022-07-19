import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizesService } from 'src/app/services/quizes.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-questions-dialog',
  templateUrl: './questions-dialog.component.html',
  styleUrls: ['../../../../app.component.scss']
})
export class QuestionsDialogComponent implements OnInit {

  form!: FormGroup
  view!: any
  dataLanguages!: any[]
  code = localStorage.getItem('code')
  language!: any

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private quizesService: QuizesService,
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

    if (!this.data.edit) {
      console.log(this.form.value)
      // this.quizesService.insertQuestions(this.code, this.form.value).subscribe({
      //   next: (v) => { this.openSnack(v.message) },
      //   error: (e) => { this.openSnack(e) },
      //   complete: () => { this.dialog.closeAll() }
      // })
    } else {
      this.quizesService.updateQuestions(this.language, this.data.element.id, this.form.value).subscribe({
        next: (v) => { this.openSnack(v.message) },
        error: (e) => { this.openSnack(e) },
        complete: () => { this.dialog.closeAll() }
      })
    }
  }

  selectLanguage() {
    this.form.controls['language'].valueChanges.subscribe(() => {
      this.language = this.form.controls['language'].value
      this.quizesService.getoneQuestions(this.language, this.data.element.id).subscribe({
        next: (v) => { this.form.patchValue(v.faq) },
        error: (e) => { this.openSnack(e) },
        complete: () => { }
      })
    })
  }

  createForm(): void {
    if (!this.data.edit) {
      this.form = this.fb.group({
        question: new FormControl('', [Validators.required]),
        answers: new FormGroup({
          answer1: new FormControl('', [Validators.required]),
          answer2: new FormControl('', [Validators.required]),
          answer3: new FormControl('', [Validators.required]),
          answer4: new FormControl('', [Validators.required]),
        }),
        correct: new FormControl(0, [Validators.required]),
      });
    } else {
      this.form = this.fb.group({
        question: new FormControl('', [Validators.required]),
        answers: new FormGroup({
          answer1: new FormControl('', [Validators.required]),
          answer2: new FormControl('', [Validators.required]),
          answer3: new FormControl('', [Validators.required]),
          answer4: new FormControl('', [Validators.required]),
        }),
        correct: new FormControl(0, [Validators.required]),
        language: new FormControl('',),
      });
    }
  }

  get answers(){
    return this.form.controls.answers as FormGroup
  }

  openSnack(message: string) {
    this._snack.open(message, '', {
      duration: 1000,
    })
  }

}
