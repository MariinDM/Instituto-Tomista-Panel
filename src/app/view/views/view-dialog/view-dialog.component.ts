import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { ViewService } from 'src/app/services/view.service';

@Component({
  selector: 'app-view-dialog',
  templateUrl: './view-dialog.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class ViewDialogComponent implements OnInit {

  form!: FormGroup
  view!: any
  dataCategories!: any[]
  validateIMG = false
  image: any = null
  code = localStorage.getItem('code')

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private viewService: ViewService,
    private categoryService: CategoryService,
    private fb: FormBuilder) { this.createForm() }

  ngOnInit(): void {
    if (this.data.edit) {
      this.form.patchValue(this.data.element);
    }
    this.getallcategories()
  }

  getallcategories(): void {
    this.categoryService.getall(this.code).subscribe((data: any) => {
      this.dataCategories = data.categories
    })
  }

  sendData() {
    if (this.form.invalid) { return }

    var fd = new FormData()

    fd.set('id', this.data.element ? this.data.element.id : null)
    fd.set('name', this.form.controls['name'].value)
    fd.set('order_index', this.form.controls['order_index'].value)
    fd.set('description', this.form.controls['description'].value)
    fd.set('category_id', this.form.controls['category_id'].value)
    fd.set('image', this.image)
    fd.set('active', this.data.element ? this.data.element.active : true)

    var id = 0
    var message = ''

    if (!this.data.edit) {
      if (this.image) {
        this.viewService.insert(this.code, fd).subscribe({
          next: (v) => { message = v.message, id = v.view_id },
          error: (e) => { message = e.error.error.message },
          complete: () => {
            this.viewService.uploadImg(this.code, id, fd).subscribe({
              next: (v) => { this.openSnack(message) },
              error: (e) => { this.openSnack(e.error.error.message) },
              complete: () => { this.dialog.closeAll() }
            })
          }
        })
      }
      else {
        this.viewService.insert(this.code, fd).subscribe({
          next: (v) => { this.openSnack(v.message) },
          error: (e) => { this.openSnack(e.error.error.message) },
          complete: () => { this.dialog.closeAll() }
        })
      }
    } else {
      if (this.image) {
        fd.set('image', this.image)
        this.viewService.update(this.code, this.data.element.id, fd).subscribe({
          next: (v) => { message = v.message, id = v.view_id },
          error: (e) => { message = e.error.error.message },
          complete: () => {
            this.viewService.uploadImg(this.code, this.data.element.id, fd).subscribe({
              next: (v) => { this.openSnack(message) },
              error: (e) => { this.openSnack(e.error.error.message) },
              complete: () => { this.dialog.closeAll() }
            })
          }
        })
      }
      else {
        this.viewService.update(this.code, this.data.element.id, fd).subscribe({
          next: (v) => { this.openSnack(v.message) },
          error: (e) => { this.openSnack(e.error.error.message) },
          complete: () => { this.dialog.closeAll() }
        })
      }
    }
  }

  createForm(): void {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      order_index: new FormControl('', [Validators.required]),
      description: new FormControl('',),
      category_id: new FormControl('', [Validators.required]),
    });
  }

  setData() {

    var fd = new FormData()

    fd.set('id', this.data.element ? this.data.element.id : null)
    fd.set('name', this.form.controls['name'].value)
    fd.set('order_index', this.form.controls['order_index'].value)
    fd.set('description', this.form.controls['description'].value)
    fd.set('category_id', this.form.controls['category_id'].value)
    fd.set('image', this.image)
    fd.set('active', this.data.element ? this.data.element.active : true)

    return fd
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
      if (file.type == "image/jpeg" || file.type == "image/jpg" || file.type == "image/png") {
        this.validateIMG = false
        this.image = file
        console.log('yes')
      }
      else {
        this.validateIMG = true
        console.log('no')
      }
    }
  }
}