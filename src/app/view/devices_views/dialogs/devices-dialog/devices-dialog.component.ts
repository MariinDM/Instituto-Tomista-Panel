import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Model } from 'src/app/interfaces/devices-intefaces';
import { DevicesService } from 'src/app/services/devices.service';

@Component({
  selector: 'app-devices-dialog',
  templateUrl: './devices-dialog.component.html',
  styleUrls: ['../../../../app.component.scss']
})
export class DevicesDialogComponent implements OnInit {
  form!: FormGroup;
  element:any;
  edit:boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
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
      password: new FormControl('', [Validators.required]),
      restarts: new FormControl('', [Validators.required]),
      serial: new FormControl('', [Validators.required]),
      token: new FormControl('', [Validators.required]),
      comments: new FormControl('', [Validators.required]),
      ip: new FormControl('', [Validators.required]),
      lan: new FormControl('', [Validators.required]),
      created_at: new FormControl('', [Validators.required]),
      updated_at: new FormControl('', [Validators.required]),
      firmware_version_id: new FormControl('', [Validators.required]),
      controller_version_id: new FormControl('', [Validators.required]),
      hardware_version_id: new FormControl('', [Validators.required]),
      model_id: new FormControl('', [Validators.required]),
      device_version_id: new FormControl('', [Validators.required]),
    });
  }

  setData(){
    this.form.controls['password'].setValue(this.element.password)
    this.form.controls['restarts'].setValue(this.element.restarts)
    this.form.controls['serial'].setValue(this.element.serial)
    this.form.controls['token'].setValue(this.element.token)
    this.form.controls['comments'].setValue(this.element.comments)
    this.form.controls['ip'].setValue(this.element.ip)
    this.form.controls['lan'].setValue(this.element.lan)
    this.form.controls['created_at'].setValue(this.element.created_at)
    this.form.controls['updated_at'].setValue(this.element.updated_at)
    this.form.controls['firmware_version_id'].setValue(this.element.firmware_version.version)
    this.form.controls['controller_version_id'].setValue(this.element.controller_version.version)
    this.form.controls['hardware_version_id'].setValue(this.element.model.hardware_version.version)
    this.form.controls['model_id'].setValue(this.element.model.name)
    this.form.controls['device_version_id'].setValue(this.element.model.device_version.name)
  }

  getData(): void {
    // this.deviceServices.getFirmwareVersions().subscribe({
    //   next:(v) => {
    //     console.log(v)
    //     this.dataFirmwareVersions = v.firmware_versions
    //   },
    //   error:(e) => {
    //     console.log(e)
    //   }
    // });
    // this.deviceServices.getModels().subscribe({
    //   next:(v) => {
    //     console.log(v)
    //     this.dataModels = v.models
    //   },
    //   error:(e) => {
    //     console.log(e)
    //   }
    // });
  }

  sendData(){
    // let data = {
    //   previous_version_id:this.form.controls['previous_version_id'].value,
    //   model_id:this.form.controls['model_id'].value,
    //   description:this.form.controls['description'].value,
    //   version:this.form.controls['version'].value,
    // }

    // if(this.edit){
    //   this.deviceServices.updateFirmwareVersions(this.element.id, data).subscribe({
    //     next:(v) => {
    //       console.log(v)
    //     },
    //     error:(e) => {
    //       console.log(e)
    //       this.openSnack(e.error.message)
    //     },
    //     complete: () => {
    //       this.dialog.closeAll()
    //     }
    //   })
    // }
    // else{
    //   this.deviceServices.sendFirmwareVersions(data).subscribe({
    //     next:(v) => {
    //       console.log(v)
    //     },
    //     error:(e) => {
    //       console.log(e)
    //       this.openSnack(e.error.message)
    //     },
    //     complete: () => {
    //       this.dialog.closeAll()
    //     }
    //   })
    // }
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }
}
