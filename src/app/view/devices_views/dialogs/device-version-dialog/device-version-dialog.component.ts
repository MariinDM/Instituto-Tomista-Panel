import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceVersion } from 'src/app/interfaces/devices-intefaces';
import { DevicesService } from 'src/app/services/devices.service';

@Component({
  selector: 'app-device-version-dialog',
  templateUrl: './device-version-dialog.component.html',
  styleUrls: ['../../../../app.component.scss']
})
export class DeviceVersionDialogComponent implements OnInit {
  form!: FormGroup;
  element:DeviceVersion;
  edit:boolean;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
  private dialog: MatDialog,
  private _snack: MatSnackBar,
  private deviceServices: DevicesService,
  private fb: FormBuilder) {
    this.createForm()
   }

  ngOnInit(): void {
    console.log(this.data)
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
      this.deviceServices.updateDeviceVersions(this.element.id, data).subscribe({
        next:(v) => {
          console.log(v)
        },
        error:(e) => {
          console.log(e)
          this.openSnack(e.error.message)
        },
        complete: () => {
          this.dialog.closeAll()
        }
      })
    }
    else{
      this.deviceServices.sendDeviceVersions(data).subscribe({
        next:(v) => {
          console.log(v)
        },
        error:(e) => {
          console.log(e)
          this.openSnack(e.error.message)
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