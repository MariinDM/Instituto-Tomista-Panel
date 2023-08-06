import { Component, OnInit } from '@angular/core';
// import {Component} from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.scss']
})
export class EncuestasComponent implements OnInit {
  data: any = {};
  test: any = {};
  answers: any[] = [];
  question: any = {};
  i: number = 0;
  score: number = 0;
  length: number = 0;

  constructor(
    private _formBuilder: FormBuilder,
    private apiService: ApiServiceService,
    private router: Router,
    private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this.data = history.state.data;
    if (!this.data) {
      this.router.navigateByUrl('/dashboard')
    } else {
      this.test = this.data.test
      this.length = this.test.questions.length;
      this.getQuestion()
    }
  }

  getQuestion(): void {
    this.question = this.test.questions[this.i]
  }

  previousQuestion(): void {
    this.answers.splice(this.i - 1, 1)
    this.i--
    this.getQuestion()
    console.log(this.answers)
  }

  nextQuestion(): void {
    let obj = {
      question_id: this.test.questions[this.i].id,
      score: this.score
    }
    this.answers.push(obj)
    if (this.i !== this.test.questions.length) {
      this.i++
      this.getQuestion()
      this.score = 0
    }
  }

  sendData(): void {
    let item = {
      question_id: this.test.questions[this.i].id,
      score: this.score
    }
    this.answers.push(item)

    // console.log(this.answers)
    // return

    // console.log(this.data)
    // return

    let obj = {
      evaluation_id: this.data.id,
      answers: this.answers
    }

    this.apiService.sendAnswers(obj).subscribe({
      next: (v) => {
        // console.log(v)
        this.openSnack(v.message)
        this.router.navigateByUrl('dashboard')
      },
      error: (e) => {
        console.log(e)
      }
    })
  }

  openSnack(message: string) {
    this._snack.open(message, '', {
      duration: 1000
    })
  }


}
