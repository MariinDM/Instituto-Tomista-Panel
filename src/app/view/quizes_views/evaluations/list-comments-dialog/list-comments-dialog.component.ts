import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as LANGUAGE from 'src/assets/i18n/translate.json';

@Component({
  selector: 'app-list-comments-dialog',
  templateUrl: './list-comments-dialog.component.html',
  styleUrls: ['../../../../app.component.scss']
})
export class ListCommentsDialogComponent implements OnInit {

  comments:any;
  translate: any = LANGUAGE

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _snack: MatSnackBar,) { }

  ngOnInit(): void {
    this.comments = this.data.comments
  }

}
