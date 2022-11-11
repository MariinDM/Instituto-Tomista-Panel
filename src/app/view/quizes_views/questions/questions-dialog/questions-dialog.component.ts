import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizesService } from 'src/app/services/quizes.service';
import { UsersService } from 'src/app/services/users.service';
import * as LANGUAGE from 'src/assets/i18n/translate.json';

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
  language: any = 'en'
  obj: any;
  question_id: any
  dataEnglish:any;
  translate: any = LANGUAGE

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private quizesService: QuizesService,
    private userService: UsersService,
    private fb: FormBuilder) { this.createForm() }

  ngOnInit(): void {
    if (this.data.edit) {
      this.getData()
      this.form.controls['language'].setValue('en')
      // this.language = this.code
      this.selectLanguage()
    }
  }

  getData(): void {
    this.userService.getlanguages(this.code).subscribe((data: any) => {
      this.dataLanguages = data.languages
    })
    this.quizesService.getoneQuestions('en', this.data.element.id).subscribe({
      next: (v) => {
        this.dataEnglish = v.question
        this.setForm(this.dataEnglish)
      },
      error: (e) => {
        console.log(e)
      }
    })
  }

  sendData() {
    if (this.form.invalid) { return }
    this.setData()
    this.answerCorrect(this.obj.correct)
    if (!this.data.edit) {
      this.quizesService.insertQuestions(this.language, this.obj).subscribe({
        next: (v) => { this.obj.question_id = v.question_id },
        error: (e) => { this.openSnack(e) },
        complete: () => {
          this.quizesService.insertAnswers(this.language, this.obj).subscribe({
            next: (v) => { this.openSnack(v.message) },
            error: (e) => { this.openSnack(e) },
            complete: () => { this.dialog.closeAll() }
          })
        }
      })
    } else {
      this.quizesService.updateQuestions(this.language, this.data.element.id, this.obj).subscribe({
        next: (v) => { this.obj.question_id = this.data.element.id },
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
        next: (v) => {
          // this.data.element = v.question, this.setForm(this.obj)
          this.obj = v.question
          // console.log(v)
          if (this.language == 'en') {
            // this.form.patchValue(this.obj)
            this.setForm(this.obj)
          } else {
            if (this.obj.title == this.dataEnglish.title) {

              if (this.obj.answers[0].text == this.dataEnglish.answers[0].text) {

                if (this.obj.answers[1].text == this.dataEnglish.answers[1].text) {

                  if (this.obj.answers[2].text == this.dataEnglish.answers[2].text) {

                    if (this.obj.answers[3].text == this.dataEnglish.answers[3].text) {
                      this.clear()
                    } else {
                      this.setForm(this.obj)
                    }
                  } else {
                    this.setForm(this.obj)
                  }
                } else {

                  this.setForm(this.obj)
                }
              } else {
                this.setForm(this.obj)
              }
            } else {
              this.setForm(this.obj)
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

  setForm(data: any) {
    // console.log(data)
    this.form.controls['title'].setValue(data.title)
    this.answers.controls['answer1'].setValue(data.answers[0].text)
    this.answers.controls['answer2'].setValue(data.answers[1].text)
    this.answers.controls['answer3'].setValue(data.answers[2].text)
    this.answers.controls['answer4'].setValue(data.answers[3].text)
    this.setCorrectOption(data)
  }

  setCorrectOption(data: any) {
    let num = data.answers.length
    for (let i = 0; i < num; i++) {
      if (data.answers[i].correct == true) {
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

  clear() {
    this.form.controls['title'].setValue('')
    this.answers.controls['answer1'].setValue('')
    this.answers.controls['answer2'].setValue('')
    this.answers.controls['answer3'].setValue('')
    this.answers.controls['answer4'].setValue('')
    // this.form.controls['correct'].setValue('')
  }
}
