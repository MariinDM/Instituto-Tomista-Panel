import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalesService } from 'src/app/services/sales.service';
import { Client } from 'src/app/interfaces/sales-interfaces';
import * as LANGUAGE from 'src/assets/i18n/translate.json';

@Component({
  selector: 'app-sales-dialog',
  templateUrl: './sales-dialog.component.html',
  styleUrls: ['../../../../app.component.scss']
})
export class SalesDialogComponent implements OnInit, AfterViewInit {

  form!: FormGroup;
  element: any;
  dataUser!: Client[];
  dataDevices!: any[];
  assignedDevices: any[] = [];
  edit: boolean;
  translate: any = LANGUAGE

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private salesServices: SalesService,
    private fb: FormBuilder) {
    this.createForm()
    this.getData()
  }

  ngOnInit(): void {
    // console.log(this.data)
    this.edit = this.data.edit
    if (this.data.edit) {
      this.element = this.data.element
      this.setData();
    }
  }

  ngAfterViewInit(): void {
    this.fillArray()
  }

  createForm() {
    this.form = this.fb.group({
      // dealer_id: new FormControl('', [Validators.required]),
      client_id: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      waranty_date: new FormControl('', [Validators.required]),
      comments: new FormControl('', []),
      shipping_date: new FormControl('', [Validators.required]),
      devices: new FormControl('', [Validators.required]),
      active: new FormControl(false, []),
    });
  }

  setData() {
    // console.log(this.element)
    // this.form.controls['dealer_id'].setValue(this.element.dealer_id)
    this.form.controls['client_id'].setValue(this.element.saleDevice[0].saleDeviceClient[0].client_id)
    this.form.controls['date'].setValue(this.element.date)
    this.form.controls['waranty_date'].setValue(this.element.waranty_date)
    this.form.controls['comments'].setValue(this.element.comments)
    this.form.controls['shipping_date'].setValue(this.element.shipping_date)
    this.form.controls['devices'].setValue(this.element.devices)
    this.form.controls['active'].setValue(this.element.active)
  }

  getData(): void {
    this.salesServices.getClients().subscribe({
      next: (v) => {
        // console.log(v)
        this.dataUser = v.clients
      },
      error: (e) => {
        console.log(e)
      }
    });
    this.salesServices.getDevices().subscribe({
      next: (v) => {
        // console.log(v)
        // this.assignedDevices = []
        this.dataDevices = v.device
        if (this.edit) {
          this.salesServices.oneSale(this.element.id).subscribe({
            next: (v) => {
              for (let i = 0; i < v.sale.devices.length; i++) {
                this.dataDevices.push(v.sale.devices[i])
              }
              console.log(this.dataDevices)
            },
            error: (e) => {
              console.log(e)
            }
          })
        }
      },
      error: (e) => {
        console.log(e)
      }
    });
  }

  sendData() {

    let data = {
      client_id: this.form.controls['client_id'].value,
      date: this.form.controls['date'].value,
      waranty_date: this.form.controls['waranty_date'].value,
      comments: this.form.controls['comments'].value,
      shipping_date: this.form.controls['shipping_date'].value,
      devices: this.assignedDevices,
      active: this.form.controls['active'].value
    }
    console.log(data)
    if (this.assignedDevices.length == 0) {
      console.log("jeje error")
      return false
    }

    if (this.edit) {
      this.salesServices.updateSale(this.element.id, data).subscribe({
        next: (v) => {
          console.log(v)
          this.openSnack(v.message)
        },
        error: (e) => {
          console.log(e)
          this.openSnack(e)
        },
        complete: () => {
          this.dialog.closeAll()
        }
      })
    }
    else {
      this.salesServices.sendSale(data).subscribe({
        next: (v) => {
          console.log(v)
          this.openSnack(v.message)
        },
        error: (e) => {
          console.log(e)
          this.openSnack(e)
        },
        complete: () => {
          this.dialog.closeAll()
        }
      })
    }
  }

  fillArray() {
    // console.log(this.element.saleDevice)
    for (const dev of this.element.saleDevice) {
      this.assignedDevices.push(dev.device_id)
    }
  }

  check(idItem: number): boolean {
    const item = this.element.saleDevice.find(({ device_id }) => device_id === idItem);
    if (item) { return true; }
    return false;
  }

  onChange(event: any) {
    if (event.checked) {
      this.assignedDevices.push(event.source.value.id);
    } else {
      const removeIndex = this.assignedDevices.map((view) => view).indexOf(event.source.value.id);
      this.assignedDevices.splice(removeIndex, 1);
    }
    // console.log(this.assignedDevices)
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }

}
