import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class CategoryDialogComponent implements OnInit {

  form!: FormGroup
  obj!: any
  validateIMG = false
  code = localStorage.getItem('code')

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private categoryService: CategoryService,
    private fb: FormBuilder) { this.createForm() }

  ngOnInit() {
    if (this.data.edit) {
      this.form.patchValue(this.data.element);
    }
  }

  sendData() {
    if (this.form.invalid) { return }
    this.setData()
    if (!this.data.edit) {
      this.categoryService.insert(this.code, this.obj).subscribe({
        next: (v) => { this.openSnack(v.message) },
        error: (e) => { this.openSnack(e.error.error.message) },
        complete: () => { this.dialog.closeAll() }
      })
    } else {
      this.categoryService.update(this.code, this.data.element.id, this.obj).subscribe({
        next: (v) => { this.openSnack(v.message) },
        error: (e) => { this.openSnack(e.error.error.message) },
        complete: () => { this.dialog.closeAll() }
      })
    }
  }

  createForm() {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      order_index: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      image: new FormControl(''),
    });
  }

  setData(): void {
    this.obj = {
      ...this.form.value,
      id: this.data.element ? this.data.element.id : null,
      active: this.data.element ? this.data.element.active : true
    };
  }

  openSnack(message: string) {
    this._snack.open(message, '', {
      duration: 1000,
    })
  }

  onImageChangeFromFile($event: any) {
    if ($event.target.files && $event.target.files[0]) {
      let file = $event.target.files[0];
      // console.log(file);
      if (file.type == "image/jpeg" || file.type == "image/png" || file.type == "image/jpg") {
        this.validateIMG = false
      }
      else {
        this.validateIMG = true
      }
    }
  }
}
