import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-dialog-evaluations',
  templateUrl: './dialog-evaluations.component.html',
  styleUrls: ['./dialog-evaluations.component.scss']
})
export class DialogEvaluationsComponent implements OnInit {

  form!: FormGroup
  obj!: any
  element: any;
  edit: boolean;
  users: any[];
  groups: any[];
  surveys: any[];

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
    this.apiService.getUsers().subscribe({
      next: (v) => {
        this.users = v.users.filter(item => item.active && item.role_id === 2)
      },
      error: (e) => {
        console.log(e)
      }
    })
    this.apiService.getGroups().subscribe({
      next: (v) => {
        this.groups = v.group
      },
      error: (e) => {
        console.log(e)
      }
    })

    this.apiService.getTests().subscribe({
      next: (v) => {
        this.surveys = v.test
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
      this.apiService.addEvaluations(this.obj).subscribe({
        next: (v) => { this.openSnack(v.message) },
        error: (e) => { this.openSnack(e) },
        complete: () => { this.dialog.closeAll() }
      })
    } else {
      this.apiService.updateEvaluations(this.obj).subscribe({
        next: (v) => { this.openSnack(v.message) },
        error: (e) => { this.openSnack(e) },
        complete: () => { this.dialog.closeAll() }
      })
    }
  }

  setData(): void {
    console.log(this.element)
    this.obj = {
      ...this.form.value,
      user_id: this.element ? this.element.user_id : null,
      group_id: this.element ? this.element.group_id : null,
      test_id: this.element ? this.element.test_id : null,
      date: this.element ? this.element.date : null,
    }
  }

  createForm(): void {
    this.form = this.fb.group({
      user_id: new FormControl('', [Validators.required]),
      group_id: new FormControl('', [Validators.required]),
      test_id: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
    });
  }
  
  setForm(){
    console.log(this.element)
    this.form.controls['user_id'].setValue(this.element.user_id)
    this.form.controls['group_id'].setValue(this.element.group_id)
    this.form.controls['group_id'].setValue(this.element.test_id)
    this.form.controls['date'].setValue(this.element.date)
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }

}

