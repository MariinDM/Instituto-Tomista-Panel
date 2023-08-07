import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiServiceService } from 'src/app/services/api-service.service';

export interface Question {
  id: string,
  question: string
}

@Component({
  selector: 'app-dialog-info',
  templateUrl: './dialog-info.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class DialogInfoComponent implements OnInit {

  questions: Question[]

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private apiService: ApiServiceService) { }

  ngOnInit(): void {
    this.questions = this.data.element
  }

}
