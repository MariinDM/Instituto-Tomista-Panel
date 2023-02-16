import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as LANGUAGE from 'src/assets/i18n/translate.json';
import { ResourcesService } from 'src/app/services/resources.service';
import { UsersService } from 'src/app/services/users.service';
import { MatRadioChange } from '@angular/material/radio';
import { GetFileResourcesComponent } from '../../get-file-resources/get-file-resources.component';



@Component({
  selector: 'app-resources-dialog',
  templateUrl: './resources-dialog.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class ResourcesDialogComponent implements OnInit {

  form!: FormGroup
  rol = localStorage.getItem('rol')
  dataLanguages!: any[]
  file: any = null
  code = localStorage.getItem('code')
  language: any = 'en'
  obj!: any
  dataEnglish: any;
  clear: any = {
    // title: '',
    // description: '',
    link: ''
  }
  select!: any;
  translate: any = LANGUAGE
  url: boolean = null
  ext!: boolean
  disabled: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private rscService: ResourcesService,
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
    this.rscService.getDataOne('en', this.data.element.id).subscribe({
      next: (v) => {
        this.dataEnglish = v.resource
        this.getStringURL(this.dataEnglish.link)
        this.getExtensionFile(this.dataEnglish.link)
        this.form.patchValue(this.dataEnglish)
      },
      error: (e) => {
        console.log(e)
      }
    })
  }
  sendData() {
    if (this.form.invalid) { return }

    this.obj = this.form.value;

    if (!this.data.edit) {
      // Insert Data  
      if (this.select == 1) {
        this.rscService.sendData('en', this.obj).subscribe({
          next: (v) => { this.openSnack(v.message), this.dialog.closeAll() },
          error: (e) => { this.openSnack(e), this.dialog.closeAll() }
        })
      } else {
        this.disabled = true;
        var fd = new FormData();
        fd.append('file', this.file)
        // setTimeout(()=>{
          this.rscService.uploadFile('en', fd).subscribe({
            next: (v) => {
              this.obj.link = v.fullpath
              this.rscService.sendData('en', this.obj).subscribe({
                next: (v) => { this.openSnack(v.message), this.dialog.closeAll() },
                error: (e) => { this.openSnack(e), this.disabled = false; }
              })
            },
            error: (e) => {
              this.openSnack(e)
              this.disabled = false;
            }
          });
        // },10000)
      }
    } else {
      // Update Data
      if (this.url) {
        this.rscService.updateData(this.language, this.data.element.id, this.obj).subscribe({
          next: (v) => { this.openSnack(v.message), this.dialog.closeAll() },
          error: (e) => { this.openSnack(e), this.dialog.closeAll() }
        })
      } else {
        if (this.file) {
          this.disabled = true;
          var fd = new FormData();
          fd.append('file', this.file)
          this.rscService.uploadFile('en', fd).subscribe({
            next: (v) => {
              this.obj.link = v.fullpath
              this.rscService.updateData(this.language, this.data.element.id, this.obj).subscribe({
                next: (v) => { this.openSnack(v.message), this.dialog.closeAll() },
                error: (e) => { this.openSnack(e), this.disabled = false; }
              })
            },
            error: (e) => {
              this.openSnack(e)
              this.disabled = false;
            }
          });
        } else {
          // this.obj.link = this.data.element.link
          this.rscService.updateData(this.language, this.data.element.id, this.obj).subscribe({
            next: (v) => { this.openSnack(v.message), this.dialog.closeAll() },
            error: (e) => { this.openSnack(e), this.dialog.closeAll() }
          })
        }
      }

    }
  }
  selectLanguage() {
    this.form.controls['language'].valueChanges.subscribe(() => {
      this.language = this.form.controls['language'].value
      this.rscService.getDataOne(this.language, this.data.element.id).subscribe({
        next: (v) => {
          this.obj = v.resource
          if (this.language == 'en') {
            this.form.patchValue(this.obj)
          } else {
            // if (this.obj.title == this.dataEnglish.title) {

            // if (this.obj.description == this.dataEnglish.description) {

            if (this.obj.link == this.dataEnglish.link) {
              this.form.patchValue(this.clear)
              this.file = ''
            } else {
              this.form.patchValue(this.obj)
            }
            //   } else {
            //     this.form.patchValue(this.obj)
            //   }
            // } else {
            //   this.form.patchValue(this.obj)
            // }
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
        link: new FormControl('', []),
        active: new FormControl(true, [])
      });
    } else {
      this.form = this.fb.group({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        link: new FormControl('', []),
        language: new FormControl(''),
        active: new FormControl(true, [])
      });
    }
  }
  openSnack(message: string) {
    this._snack.open(message, '', {
      duration: 1000,
    })
  }
  getFile() {
    this.dialog.open(GetFileResourcesComponent, {
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe((result) => {
      this.file = result.file
    })
  }
  radioChange($event: MatRadioChange) {
    this.select = $event.value
  }
  getStringURL(link: string) {
    let cad = link.substring(0, 7);
    if (cad == 'uploads') {
      return this.url = false
    }
    return this.url = true
  }
  getExtensionFile(link: string) {
    let ext = link.split('.').pop();
    if (ext == 'pdf') {
      return this.ext = true
    }
    return this.ext = false
  }
}
