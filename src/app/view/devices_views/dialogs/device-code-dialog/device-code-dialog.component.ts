import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DevicesService } from 'src/app/services/devices.service';

@Component({
  selector: 'app-device-code',
  templateUrl: './device-code-dialog.component.html',
  styleUrls: ['../../../../app.component.scss']
})
export class DeviceCodeDialogComponent implements OnInit {
  element:any;
  device_code:string = "";
  expiration:string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialog: MatDialog,
  private _snack: MatSnackBar,
  private deviceServices: DevicesService,
  private fb: FormBuilder) {

  }

  ngOnInit(): void {
    console.log(this.data)
    this.element = this.data.element
    this.getData()
  }

  getData(): void {
    let body = {
      device_id: this.element.id
    }
    this.deviceServices.getDeviceCode(body).subscribe({
      next:(v) => {
        console.log(v)
        this.device_code = v.code
        this.expiration = v.expires
      },
      error:(e) => {
        console.log(e)
        this.openSnack("Error al Obtener el Codigo")
      }
    });
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }
}
