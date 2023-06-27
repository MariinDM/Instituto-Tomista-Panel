import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiServiceService } from 'src/app/services/api-service.service';
@Component({
  selector: 'app-dialog-lesson',
  templateUrl: './dialog-lesson.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class DialogLessonComponent implements OnInit {

  form!: FormGroup
  obj!: any
  element: any;
  edit: boolean;
  educationLevels: any[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private apiService: ApiServiceService,
    private fb: FormBuilder) { this.createForm() }

  ngOnInit(): void {
    this.edit = this.data.edit;
    this.element = this.data.element;
    this.getData()
    if (this.data.edit) {
      this.form.patchValue(this.element);
    }
  }

  sendData() {
    if (this.form.invalid) { return }
    this.setData()
    if (!this.data.edit) {
      this.apiService.addLesson(this.obj).subscribe({
        next: (v) => { this.openSnack(v.message) },
        error: (e) => { this.openSnack(e) },
        complete: () => { this.dialog.closeAll() }
      })
    } else {
      this.apiService.updateLesson(this.obj).subscribe({
        next: (v) => { this.openSnack(v.message) },
        error: (e) => { this.openSnack(e) },
        complete: () => { this.dialog.closeAll() }
      })
    }
  }

  createForm(): void {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', []),
      educa_level: new FormControl('', [Validators.required]),
    });
  }

  setData(): void {
    this.obj = {
      ...this.form.value,
      id: this.data.element ? this.data.element.id : null,
    }
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }

  getData() {
    this.apiService.getEducationLevels().subscribe({
      next: (v) => {
        this.educationLevels = v.educa.filter(item => item.active)
      },
      error: (e) => {
        console.log(e)
      }
    })
  }

}
