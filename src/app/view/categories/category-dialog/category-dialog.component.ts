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
  image: any = null

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

    var fd = new FormData()

    fd.set('id', this.data.element ? this.data.element.id : null)
    fd.set('name', this.form.controls['name'].value)
    fd.set('order_index', this.form.controls['order_index'].value)
    fd.set('description', this.form.controls['description'].value)
    fd.set('active', this.data.element ? this.data.element.active : true)

    var id = 0
    var message = ''

    if (!this.data.edit) {
      if (this.image) {
        fd.set('image', this.image)
        this.categoryService.insert(this.code, fd).subscribe({
          next: (v) => { message = v.message, id = v.category_id },
          error: (e) => { message = e.error.error.message },
          complete: () => {
            this.categoryService.uploadImg(this.code, id, fd).subscribe({
              next: (v) => { this.openSnack(message) },
              error: (e) => { this.openSnack(e.error.error.message) },
              complete: () => { this.dialog.closeAll() }
            })
          }
        })
      } else {
        this.categoryService.insert(this.code, fd).subscribe({
          next: (v) => { this.openSnack(v.message) },
          error: (e) => { this.openSnack(e.error.error.message) },
          complete: () => { this.dialog.closeAll() }
        })
      }
    } else {
      if (this.image) {
        fd.set('image', this.image)
        this.categoryService.update(this.code, this.data.element.id, fd).subscribe({
          next: (v) => { message = v.message },
          error: (e) => { message = e.error.error.message },
          complete: () => {
            this.categoryService.uploadImg(this.code, this.data.element.id, fd).subscribe({
              next: (v) => { this.openSnack(message) },
              error: (e) => { this.openSnack(e.error.error.message), console.log(e.error.error) },
              complete: () => { this.dialog.closeAll() }
            })
          }
        })
      } else {
        this.categoryService.update(this.code, this.data.element.id, fd).subscribe({
          next: (v) => { this.openSnack(v.message) },
          error: (e) => { this.openSnack(e.error.error.message) },
          complete: () => { this.dialog.closeAll() }
        })
      }
    }
  }

  createForm() {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      order_index: new FormControl('', [Validators.required]),
      description: new FormControl('', []),
    });
  }

  setData() {

    var data = new FormData()

    data.set('id', this.data.element ? this.data.element.id : null)
    data.set('name', this.form.controls['name'].value)
    data.set('order_index', this.form.controls['order_index'].value)
    data.set('description', this.form.controls['description'].value)
    data.set('image', this.image)
    data.set('active', this.data.element ? this.data.element.active : true)

    return data

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
        this.image = file
      }
      else {
        this.validateIMG = true
      }
    }
  }
}