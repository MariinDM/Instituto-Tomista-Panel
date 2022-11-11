import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceType } from 'src/app/interfaces/devices-intefaces';
import { DevicesService } from 'src/app/services/devices.service';
import * as LANGUAGE from 'src/assets/i18n/translate.json';

@Component({
  selector: 'app-device-type-dialog',
  templateUrl: './device-type-dialog.component.html',
  styleUrls: ['../../../../app.component.scss']
})
export class DeviceTypeDialogComponent implements OnInit {
  form!: FormGroup;
  element:DeviceType;
  edit:boolean;
  translate: any = LANGUAGE

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
  private dialog: MatDialog,
  private _snack: MatSnackBar,
  private deviceServices: DevicesService,
  private fb: FormBuilder) {
    this.createForm()
   }

  ngOnInit(): void {
    // console.log(this.data)
    this.edit = this.data.edit
    if(this.data.edit){
      this.element = this.data.element
      this.setData();
    }
  }

  createForm() {
    this.form = this.fb.group({
      code: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
    });
  }

  setData(){
    this.form.controls['code'].setValue(this.element.code)
    this.form.controls['description'].setValue(this.element.description)
    this.form.controls['name'].setValue(this.element.name)
  }

  sendData(){
    let data = {
      code:this.form.controls['code'].value,
      description:this.form.controls['description'].value,
      name:this.form.controls['name'].value,
    }

    if(this.edit){
      this.deviceServices.updateDeviceTypes(this.element.id, data).subscribe({
        next:(v) => {
          console.log(v)
        },
        error:(e) => {
          // console.log(e)
          this.openSnack(e)
        },
        complete: () => {
          this.dialog.closeAll()
        }
      })
    }
    else{
      this.deviceServices.sendDeviceTypes(data).subscribe({
        next:(v) => {
          console.log(v)
        },
        error:(e) => {
          // console.log(e)
          this.openSnack(e)
        },
        complete: () => {
          this.dialog.closeAll()
        }
      })
    }
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }
}
