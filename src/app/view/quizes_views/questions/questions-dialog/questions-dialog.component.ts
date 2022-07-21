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
  obj: any;
  question_id: any

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private quizesService: QuizesService,
    private userService: UsersService,
    private fb: FormBuilder) { this.createForm() }

  ngOnInit(): void {
    if (this.data.edit) {
      this.setForm()
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
    this.setData()
    this.answerCorrect(this.obj.correct)
    if (!this.data.edit) {
      this.quizesService.insertQuestions(this.code, this.obj).subscribe({
        next: (v) => { this.obj.question_id = v.question_id },
        error: (e) => { this.openSnack(e) },
        complete: () => {
          this.quizesService.insertAnswers(this.code, this.obj).subscribe({
            next: (v) => { this.openSnack(v.message) },
            error: (e) => { this.openSnack(e) },
            complete: () => { this.dialog.closeAll() }
          })
        }
      })
    } else {
      this.quizesService.updateQuestions(this.language, this.data.element.id, this.obj).subscribe({
        next: (v) => { this.openSnack(this.obj.question_id = this.data.element.id) },
        error: (e) => { this.openSnack(e) },
        complete: () => {
          this.quizesService.updateAnswers(this.language, this.obj).subscribe({
            next: (v) => { this.openSnack(v.message) },
            error: (e) => { this.openSnack(e) },
            complete: () => { this.dialog.closeAll() }
          })
        }
      })
    }
  }

  selectLanguage() {
    this.form.controls['language'].valueChanges.subscribe(() => {
      this.language = this.form.controls['language'].value
      this.quizesService.getoneQuestions(this.language, this.data.element.id).subscribe({
        next: (v) => { this.data.element = v.question, this.setForm() },
        error: (e) => { this.openSnack(e) },
        complete: () => { }
      })
    })
  }

  createForm(): void {
    if (!this.data.edit) {
      this.form = this.fb.group({
        title: new FormControl('', [Validators.required]),
        active: new FormControl(false, [Validators.required]),
        answers: new FormGroup({
          answer1: new FormControl('', [Validators.required]),
          answer2: new FormControl('', [Validators.required]),
          answer3: new FormControl('', [Validators.required]),
          answer4: new FormControl('', [Validators.required]),
        }),
        correct: new FormControl('', [Validators.required]),
        question_id: null,
      });
    } else {
      this.form = this.fb.group({
        title: new FormControl('', [Validators.required]),
        active: new FormControl(false, [Validators.required]),
        answers: new FormGroup({
          answer1: new FormControl('', [Validators.required]),
          answer2: new FormControl('', [Validators.required]),
          answer3: new FormControl('', [Validators.required]),
          answer4: new FormControl('', [Validators.required]),
        }),
        correct: new FormControl('', [Validators.required]),
        language: new FormControl('',),
        question_id: null,
      });
    }
  }

  get answers() {
    return this.form.controls.answers as FormGroup
  }

  openSnack(message: string) {
    this._snack.open(message, '', {
      duration: 1000,
    })
  }

  setData(): void {
    this.obj = {
      ...this.form.value,
      id: this.data.element ? this.data.element.id : null,
      active: this.data.element ? this.data.element.active : true
    };
  }

  setForm() {
    this.form.controls['title'].setValue(this.data.element.title)
    this.answers.controls['answer1'].setValue(this.data.element.answers[0].text)
    this.answers.controls['answer2'].setValue(this.data.element.answers[1].text)
    this.answers.controls['answer3'].setValue(this.data.element.answers[2].text)
    this.answers.controls['answer4'].setValue(this.data.element.answers[3].text)
    this.setCorrectOption()
  }

  setCorrectOption() {
    let num = this.data.element.answers.length
    for (let i = 0; i < num; i++) {
      if (this.data.element.answers[i].correct == true) {
        this.form.controls['correct'].setValue(String(i + 1))
      }
    }
  }

  answerCorrect(correct: string) {
    switch (correct) {
      case "1":
        this.obj.correct = "answer1"
        break
      case "2":
        this.obj.correct = "answer2"
        break
      case "3":
        this.obj.correct = "answer3"
        break
      case "4":
        this.obj.correct = "answer4"
        break
    }
  }
}
