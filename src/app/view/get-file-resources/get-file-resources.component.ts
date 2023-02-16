import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as LANGUAGE from 'src/assets/i18n/translate.json';

@Component({
  selector: 'app-get-file-resources',
  templateUrl: './get-file-resources.component.html',
  styleUrls: ['../../app.component.scss']
})
export class GetFileResourcesComponent implements OnInit {

  form!: FormGroup
  disabled: boolean = true
  icon: boolean = true
  load: boolean = false
  translate: any = LANGUAGE

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _snack: MatSnackBar,
    private dialogRef: MatDialogRef<GetFileResourcesComponent>) { this.createForm() }

  ngOnInit(): void {
  }
  sendFile() {
    let file = this.sizeFile();
    if (this.form.invalid || file) { return }
    this.dialogRef.close({
      file: this.form.controls['file'].value
    });
  }
  createForm() {
    this.form = this.fb.group({
      file: new FormControl('', [Validators.required]),
    });
  }
  sizeFile(){
    let file = this.form.controls['file'].value;
    if(file.size > 20000000){
      this.openSnack('The file is larger than 20 MB.');
      return true
    }
  }
  openSnack(message: string) {
    this._snack.open(message, '', {
      duration: 1000,
    })
  }
}
