import { Component, Inject, InjectFlags, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TicketsService } from 'src/app/services/tickets.service';
import * as LANGUAGE from 'src/assets/i18n/translate.json';

@Component({
  selector: 'app-ticket-categories-dialog',
  templateUrl: './ticket-categories-dialog.component.html',
  styleUrls: ['../../../../app.component.scss']
})
export class TicketCategoriesDialogComponent implements OnInit {

  form!: FormGroup;
  element: any;
  edit: boolean;
  translate: any = LANGUAGE

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private ticketsSvc: TicketsService,
    private fb: FormBuilder) {
    this.createForm()
  }

  ngOnInit(): void {
    console.log(this.data)
    this.edit = this.data.edit
    if (this.data.edit) {
      this.element = this.data.element
      this.form.patchValue(this.element)
    }
  }

  createForm() {
    this.form = this.fb.group({
      code: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      active: new FormControl(true, [Validators.required]),
    });
  }

  sendData() {
    if (this.form.invalid) { return }

    let data = this.form.value;

    if (this.edit) {
      this.ticketsSvc.updateTicketsCategories(this.element.id, data).subscribe({
        next: (v) => {
          console.log(v)
          this.openSnack(v.message)
        },
        error: (e) => {
          console.log(e)
          this.openSnack(e.error.message)
        },
        complete: () => {
          this.dialog.closeAll()
        }
      })
    }
    else {
      this.ticketsSvc.insertTicketsCategories(data).subscribe({
        next: (v) => {
          console.log(v)
          this.openSnack(v.message)
        },
        error: (e) => {
          console.log(e)
          this.openSnack(e)
        },
        complete: () => {
          this.dialog.closeAll()
        }
      })
    }
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }

}
