import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class GroupDialogComponent implements OnInit {

  form!: FormGroup
  obj!: any
  element: any;
  edit: boolean;
  sections: any[];
  grades: any[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private apiService: ApiServiceService,
    private fb: FormBuilder) { this.createForm() }

  ngOnInit(): void {
    this.edit = this.data.edit;
    this.element = this.data.obj;
    this.getData()
    if (this.data.edit) {
      this.setForm()
    }
  }

  getData() {
    this.apiService.getGrades().subscribe({
      next: (v) => {
        this.grades = v.grade
      },
      error: (e) => {
        console.log(e)
      }
    })
    this.apiService.getSections().subscribe({
      next: (v) => {
        this.sections = v.section
      },
      error: (e) => {
        console.log(e)
      }
    })
  }

  sendData() {
    if (this.form.invalid) { return }
    this.setData()
    if (!this.data.edit) {
      this.apiService.addGroup(this.obj).subscribe({
        next: (v) => { this.openSnack(v.message) },
        error: (e) => { this.openSnack(e) },
        complete: () => { this.dialog.closeAll() }
      })
    } else {
      this.apiService.updateGroup(this.obj).subscribe({
        next: (v) => { this.openSnack(v.message) },
        error: (e) => { this.openSnack(e) },
        complete: () => { this.dialog.closeAll() }
      })
    }
  }

  setData(): void {
    this.obj = {
      ...this.form.value,
      id: this.element ? this.element.id : null,
    }
  }

  createForm(): void {
    this.form = this.fb.group({
      grade_id: new FormControl('', [Validators.required]),
      section_id: new FormControl('', [Validators.required]),
    });
  }
  
  setForm(){
    // console.log(this.element)
    this.form.controls['grade_id'].setValue(this.element.grade_id)
    this.form.controls['section_id'].setValue(this.element.section_id)
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }

}
