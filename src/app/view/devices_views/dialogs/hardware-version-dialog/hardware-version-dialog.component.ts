import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HardwareVersion } from 'src/app/interfaces/devices-intefaces';
import { DevicesService } from 'src/app/services/devices.service';
import * as LANGUAGE from 'src/assets/i18n/translate.json';

@Component({
  selector: 'app-hardware-version-dialog',
  templateUrl: './hardware-version-dialog.component.html',
  styleUrls: ['../../../../app.component.scss']
})
export class HardwareVersionDialogComponent implements OnInit {
  form!: FormGroup;
  element:HardwareVersion;
  dataHardwareVersions:HardwareVersion[];
  edit:boolean;
  translate: any = LANGUAGE

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
  private dialog: MatDialog,
  private _snack: MatSnackBar,
  private deviceServices: DevicesService,
  private fb: FormBuilder) {
    this.createForm()
    this.getData()
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
      previous_version_id: new FormControl('', []),
      description: new FormControl('', [Validators.required]),
      numeric_value: new FormControl('', [Validators.required]),
      version: new FormControl('', [Validators.required]),
    });
  }

  setData(){
    this.form.controls['previous_version_id'].setValue(this.element.previous_version_id)
    this.form.controls['description'].setValue(this.element.description)
    this.form.controls['numeric_value'].setValue(this.element.numeric_value)
    this.form.controls['version'].setValue(this.element.version)
  }

  getData(): void {
    this.deviceServices.getHardwareVersions().subscribe({
      next:(v) => {
        console.log(v)
        this.dataHardwareVersions = v.hardware_versions
      },
      error:(e) => {
        console.log(e)
      }
    });
  }

  sendData(){
    let data = {
      previous_version_id:this.form.controls['previous_version_id'].value,
      description:this.form.controls['description'].value,
      numeric_value:this.form.controls['numeric_value'].value,
      version:this.form.controls['version'].value,
    }

    if(this.edit){
      this.deviceServices.updateHardwareVersions(this.element.id, data).subscribe({
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
      this.deviceServices.sendHardwareVersions(data).subscribe({
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
