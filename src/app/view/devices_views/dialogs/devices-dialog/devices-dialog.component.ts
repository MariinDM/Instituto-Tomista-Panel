import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ControllerVersion, FirmwareVersion, Model } from 'src/app/interfaces/devices-intefaces';
import { DevicesService } from 'src/app/services/devices.service';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-devices-dialog',
  templateUrl: './devices-dialog.component.html',
  styleUrls: ['../../../../app.component.scss']
})
export class DevicesDialogComponent implements OnInit {
  form!: FormGroup;
  element:any;
  edit:boolean = false;
  dataControllerVersions!:ControllerVersion[];
  dataFirmwareVersions!:FirmwareVersion[];
  dataModels!:any[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialog: MatDialog,
  private _snack: MatSnackBar,
  private deviceServices: DevicesService,
  private fb: FormBuilder) {
    this.getData()
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
        active: new FormControl('',),
        password: new FormControl('', [Validators.required]),
        restarts: new FormControl('', [Validators.required]),
        serial: new FormControl('', [Validators.required]),
        comments: new FormControl('',),
        ip: new FormControl('',),
        lan: new FormControl('',),
        firmware_version_id: new FormControl('', [Validators.required]),
        controller_version_id: new FormControl('', [Validators.required]),
        model_id: new FormControl('', [Validators.required]),
      });
  }

  setData(){
    this.form.controls['password'].setValue(this.element.password)
    this.form.controls['restarts'].setValue(this.element.restarts)
    this.form.controls['serial'].setValue(this.element.serial)
    this.form.controls['comments'].setValue(this.element.comments)
    this.form.controls['ip'].setValue(this.element.ip)
    this.form.controls['lan'].setValue(this.element.lan)
    this.form.controls['firmware_version_id'].setValue(this.element.firmware_version.id)
    this.form.controls['controller_version_id'].setValue(this.element.controller_version.id)
    this.form.controls['model_id'].setValue(this.element.model.id)
    this.form.controls['active'].setValue(this.element.active)
    // this.form.disable()
  }

  getData(): void {
    this.deviceServices.getControllerVersions().subscribe({
      next:(v) => {
        console.log(v)
        this.dataControllerVersions = v.controller_versions
      },
      error:(e) => {
        console.log(e)
      }
    });
    this.deviceServices.getFirmwareVersions().subscribe({
      next:(v) => {
        console.log(v)
        this.dataFirmwareVersions = v.firmware_versions
      },
      error:(e) => {
        console.log(e)
      }
    });
    this.deviceServices.getModels().subscribe({
      next:(v) => {
        console.log(v)
        this.dataModels = v.models
      },
      error:(e) => {
        console.log(e)
      }
    });
  }

  sendData(){
    let data
    if(this.edit){
      let hardware_v = this.dataModels[this.dataModels.findIndex(obj => obj.id === this.form.controls['model_id'].value)].hardware_version.version;
      let firmware_v = this.dataFirmwareVersions[this.dataFirmwareVersions.findIndex(obj => obj.id === this.form.controls['firmware_version_id'].value)].version;
      let controller_v = this.dataControllerVersions[this.dataControllerVersions.findIndex(obj => obj.id === this.form.controls['controller_version_id'].value)].version;;
      data = {
        active: this.form.controls['active'].value,
        password: this.form.controls['password'].value,
        restarts: this.form.controls['restarts'].value,
        serial: this.form.controls['serial'].value,
        comments: this.form.controls['comments'].value,
        ip: this.form.controls['ip'].value,
        lan: this.form.controls['lan'].value,
        firmware_version: firmware_v,
        controller_version: controller_v,
        hardware_version: hardware_v,
      }
    }
    else{
      data = {
        active: this.form.controls['active'].value,
        password: this.form.controls['password'].value,
        restarts: this.form.controls['restarts'].value,
        serial: this.form.controls['serial'].value,
        comments: this.form.controls['comments'].value,
        ip: this.form.controls['ip'].value,
        lan: this.form.controls['lan'].value,
        firmware_version_id: this.form.controls['firmware_version_id'].value,
        controller_version_id: this.form.controls['controller_version_id'].value,
        model_id: this.form.controls['model_id'].value,
      }
    }
    console.log(data)
    this.deviceServices.syncDevice(data).subscribe({
      next:(v) => {
        console.log(v)
      },
      error:(e) => {
        console.log(e)
        this.openSnack(e)
      },
      complete: () => {
        this.dialog.closeAll()
      }
    })
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }
}
