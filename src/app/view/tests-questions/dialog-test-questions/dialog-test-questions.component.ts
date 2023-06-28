import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-dialog-test-questions',
  templateUrl: './dialog-test-questions.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class DialogTestQuestionsComponent implements OnInit {

  form!: FormGroup
  obj!: any
  element: any;
  edit: boolean;
  questions: any[] = []
  questionsElement: any[] = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private apiService: ApiServiceService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.edit = this.data.edit;
    if (this.data.edit) {
      this.element = this.data.element;
      this.element.test_questions.forEach(item => {
        this.questionsElement.push(item.questions)
      });
    }
    this.getData()
  }

  getData() {
    this.apiService.getQuetions().subscribe({
      next: (v) => {
        this.questions = v.question.filter(item => item.active)
      },
      error: (e) => {
        console.log(e)
      }
    })
  }

  check(idItem: number): boolean {
    const item = this.questionsElement.find(({ id }) => id === idItem);

    if (item) { return true; }

    return false;
  }

  onChange(event: any) {
    if (event.checked) {
      this.questionsElement.push(event.source.value);
    } else {
      const removeIndex = this.questionsElement.map((view) => view.id).indexOf(event.source.value.id);
      this.questionsElement.splice(removeIndex, 1);
    }
  }

  sendData() {
    let idsQuestions = []
    this.questionsElement.forEach(value => {
      idsQuestions.push(value.id)
    })
    this.apiService.addTestQuestions({ test_id: this.element.id, questions: idsQuestions }).subscribe({
      next: (v) => {
        this.openSnack(v.message)
      },
      error: (e) => {
        console.log(e)
      },
      complete: () => {
        this.dialog.closeAll()
      }
    })
  }

  openSnack(message: string) {
    this._snack.open(message, '', {
      duration: 1000,
    })
  }

}
