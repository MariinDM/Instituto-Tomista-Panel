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
    this.categoryService.getall().subscribe((data: any) => {
      this.dataCategories = data
    })
  }

  sendData() {
    if (this.form.invalid) { return }
    this.setData();
    if (!this.data.edit) {
      this.viewService.insert(this.view).subscribe({
        next: (v) => { this.openSnack(v.message) },
        error: (e) => { this.openSnack(e) },
        complete: () => { this.dialog.closeAll() }
      })
    } else {
      this.viewService.update(this.data.element.id, this.view).subscribe({
        next: (v) => { this.openSnack(v.message) },
        error: (e) => { this.openSnack(e) },
        complete: () => { this.dialog.closeAll() }
      })
    }
  }

  createForm(): void {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      order_index: new FormControl('', [Validators.required]),
      description: new FormControl('',),
      image: new FormControl('',),
      category_id: new FormControl('', [Validators.required]),
    });
  }

  setData(): void {
    this.view = {
      ...this.form.value,
      id: this.data.element ? this.data.element.id : null,
      active: this.data.element ? this.data.element.active : true
    }
  }

  openSnack(message: string) {
    this._snack.open(message, '', {
      duration: 1000,
    })
  }

}
