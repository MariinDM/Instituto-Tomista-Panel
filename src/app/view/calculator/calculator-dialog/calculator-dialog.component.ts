import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CalculatorService } from 'src/app/services/calculator.service';
import { UsersService } from 'src/app/services/users.service';
import * as LANGUAGE from 'src/assets/i18n/translate.json';

@Component({
  selector: 'app-calculator-dialog',
  templateUrl: './calculator-dialog.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class CalculatorDialogComponent implements OnInit {

  form!: FormGroup
  view!: any
  dataLanguages!: any[]
  code = localStorage.getItem('code')
  language: any = 'en'
  obj!: any
  dataEnglish: any;
  clear: any = {
    title: '',
    description: ''
  }
  translate: any = LANGUAGE

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private calculatorService: CalculatorService,
    private userService: UsersService,
    private fb: FormBuilder) { this.createForm() }

  ngOnInit(): void {
    if (this.data.edit) {
      this.getData()
      this.form.controls['language'].setValue('en')
      // this.language = this.code
      this.selectLanguage()
    }
  }

  getData(): void {
    this.userService.getlanguages(this.code).subscribe((data: any) => {
      this.dataLanguages = data.languages
    })
    this.calculatorService.getone('en', this.data.element.id).subscribe({
      next: (v) => {
        this.dataEnglish = v.calculator_field
        this.form.patchValue(this.dataEnglish)
      },
      error: (e) => {

      }
    })
  }

  sendData() {
    if (this.form.invalid) { return }

    var fd = new FormData()

    fd.set('id', this.data.element ? this.data.element.id : null)
    fd.set('title', this.form.controls['title'].value)
    fd.set('description', this.form.controls['description'].value)
    fd.set('active', this.form.controls['active'].value)

    var id = 0
    var message = ''

    if (!this.data.edit) {
      this.calculatorService.insert(this.language, fd).subscribe({
        next: (v) => { this.openSnack(v.message) },
        error: (e) => { this.openSnack(e) },
        complete: () => { this.dialog.closeAll() }
      })
    } else {
      this.calculatorService.update(this.language, this.data.element.id, fd).subscribe({
        next: (v) => { this.openSnack(v.message) },
        error: (e) => { this.openSnack(e) },
        complete: () => { this.dialog.closeAll() }
      })
    }
  }

  selectLanguage() {
    this.form.controls['language'].valueChanges.subscribe(() => {
      this.language = this.form.controls['language'].value
      this.calculatorService.getone(this.language, this.data.element.id).subscribe({
        next: (v) => {
          console.log(this.language)
          this.obj = v.calculator_field
          if (this.language == 'en') {
            this.form.patchValue(this.obj)
          } else {
            if (this.obj.title == this.dataEnglish.title) {

              if (this.obj.description == this.dataEnglish.description) {
                this.form.patchValue(this.clear)
              } else {
                this.form.patchValue(v.calculator_field)
              }

            } else {
              this.form.patchValue(v.calculator_field)
            }
          }
        },
        error: (e) => { this.openSnack(e) },
        complete: () => { }
      })
    })
  }

  createForm(): void {
    if (!this.data.edit) {
      this.form = this.fb.group({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        active: new FormControl(false)
      });
    } else {
      this.form = this.fb.group({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        active: new FormControl(false),
        language: new FormControl('',),
      });
    }
  }

  openSnack(message: string) {
    this._snack.open(message, '', {
      duration: 1000,
    })
  }

}
