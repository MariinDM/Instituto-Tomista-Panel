import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import * as LANGUAGE from 'src/assets/i18n/translate.json';

@Component({
  selector: 'app-ticket-dialog-file',
  templateUrl: './ticket-dialog-file.component.html',
  styleUrls: ['../../../../app.component.scss']
})
export class TicketDialogFileComponent implements OnInit {

  url: any
  extension: any
  translate: any = LANGUAGE

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _snack: MatSnackBar) { }

  ngOnInit(): void {
    if (this.data.edit) {
      this.url = this.data.name.url
      this.extension = this.data.name.extension
    } else {
      this.url = environment.apiUrl + 'v1/en/resources/uploads/Tickets/' + this.data.name.filename + '.' + this.data.name.extension
      this.extension = this.data.name.extension
    }
  }

}
