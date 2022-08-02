import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizesService } from 'src/app/services/quizes.service';

@Component({
  selector: 'app-evaluation-dialog',
  templateUrl: './evaluation-dialog.component.html',
  styleUrls: ['../../../../app.component.scss']
})
export class EvaluationDialogComponent implements OnInit {

  form!: FormGroup
  obj!: any
  code = localStorage.getItem('code')

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private quizesService: QuizesService,
    private fb: FormBuilder) { this.createForm() }

  ngOnInit(): void {
    this.obj = this.data.element
    this.setForm()
  }

  sendData() {
    if (this.form.invalid) { return }
    this.obj = {
      ...this.form.value
    }
    let message = ''
    this.quizesService.updateEvaluations(this.code, this.data.element.id, this.obj).subscribe({
      next: (v) => { message = v.message },
      error: (e) => { this.openSnack(e) },
      complete: () => {
        let data = {
          evaluation_id: '',
          user_id: '',
          comments: ''
        }
        data.evaluation_id = this.data.element.id
        data.user_id = this.form.controls['student_id'].value
        data.comments = this.form.controls['comments'].value

        let leng = this.data.element.evaluation_comments.length - 1
        this.form.controls['comments'].setValue(this.data.element.evaluation_comments[leng].comments)

        if (data.comments != this.data.element.evaluation_comments[leng].comments) {
          this.quizesService.insertEvaluationsComments(this.code, data).subscribe({
            next: (v) => { this.openSnack(message) },
            error: (e) => { this.openSnack(e) },
            complete: () => {}
          })
        }
        this.dialog.closeAll()
      }
    })
  }

  createForm() {
    this.form = this.fb.group({
      assignation_id: new FormControl('', []),
      instructor_id: new FormControl('', []),
      student_id: new FormControl('', []),
      instructor: new FormControl('', [Validators.required]),
      instructor_affects_total: new FormControl('', []),
      quiz: new FormControl('', []),
      quiz_affects_total: new FormControl('', []),
      simulator: new FormControl('', []),
      simulator_affects_total: new FormControl('', []),
      comments: new FormControl('', []),
    });
  }
  setForm() {
    this.form.controls['assignation_id'].setValue(this.data.element.assignation_id)
    this.form.controls['instructor_id'].setValue(this.data.element.instructor_id)
    this.form.controls['student_id'].setValue(this.data.element.student_id)
    this.form.controls['instructor'].setValue(this.data.element.instructor)
    this.form.controls['instructor_affects_total'].setValue(this.data.element.instructor_affects_total)
    this.form.controls['quiz'].setValue(this.data.element.quiz)
    this.form.controls['quiz_affects_total'].setValue(this.data.element.quiz_affects_total)
    this.form.controls['simulator'].setValue(this.data.element.simulator)
    this.form.controls['simulator_affects_total'].setValue(this.data.element.simulator_affects_total)
    let leng = this.data.element.evaluation_comments.length - 1
    this.form.controls['comments'].setValue(this.data.element.evaluation_comments[leng].comments)

  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }

}
