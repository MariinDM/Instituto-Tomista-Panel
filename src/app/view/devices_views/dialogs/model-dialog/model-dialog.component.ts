import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceType, DeviceVersion, HardwareVersion } from 'src/app/interfaces/devices-intefaces';
import { DevicesService } from 'src/app/services/devices.service';
import * as LANGUAGE from 'src/assets/i18n/translate.json';

@Component({
  selector: 'app-model-dialog',
  templateUrl: './model-dialog.component.html',
  styleUrls: ['../../../../app.component.scss']
})
export class ModelDialogComponent implements OnInit {
  form!: FormGroup;
  element:any;
  dataDeviceVersion!:DeviceVersion[];
  dataDeviceType!:DeviceType[];
  dataHardwareVersion!:HardwareVersion[];
  edit:boolean;
  assignedNecessities:any = []
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
    // console.log(this.data)
    this.edit = this.data.edit
    if(this.data.edit){
      this.element = this.data.element
      this.setData();
      this.fillArray()
    }
  }

  fillArray(){
    for (const necessitie of this.element.necessities) {
      this.assignedNecessities.push(necessitie.id)
    }
  }

  createForm() {
    this.form = this.fb.group({
      device_version_id: new FormControl('', [Validators.required]),
      device_type_id: new FormControl('', [Validators.required]),
      hardware_version_id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      active: new FormControl('',),
    });
  }

  setData(){
    // console.log(this.element)
    this.form.controls['device_version_id'].setValue(this.element.device_version_id)
    this.form.controls['device_type_id'].setValue(this.element.device_type_id)
    this.form.controls['hardware_version_id'].setValue(this.element.hardware_version_id)
    this.form.controls['name'].setValue(this.element.name)
    this.form.controls['active'].setValue(this.element.active)
  }

  getData(): void {
    this.deviceServices.getDeviceVersions().subscribe({
      next:(v) => {
        // console.log(v)
        this.dataDeviceVersion = v.device_versions
      },
      error:(e) => {
        console.log(e)
      }
    });
    this.deviceServices.getDeviceTypes().subscribe({
      next:(v) => {
        // console.log(v)
        this.dataDeviceType = v.device_types
      },
      error:(e) => {
        console.log(e)
      }
    });
    this.deviceServices.getHardwareVersions().subscribe({
      next:(v) => {
        // console.log(v)
        this.dataHardwareVersion = v.hardware_versions
      },
      error:(e) => {
        console.log(e)
      }
    });
  }

  sendData(){
    let data = {
      device_version_id:this.form.controls['device_version_id'].value,
      device_type_id:this.form.controls['device_type_id'].value,
      hardware_version_id:this.form.controls['hardware_version_id'].value,
      name:this.form.controls['name'].value,
      active:this.form.controls['active'].value,
      necessities:this.assignedNecessities
    }

    if(this.edit){
      this.deviceServices.updateModels(this.element.id, data).subscribe({
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
      this.deviceServices.sendModels(data).subscribe({
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
