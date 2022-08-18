import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DevicesService } from 'src/app/services/devices.service';
import * as LANGUAGE from 'src/assets/i18n/translate.json';

@Component({
  selector: 'app-model-necessities',
  templateUrl: './model-necessities.component.html',
  styleUrls: ['../../../../app.component.scss']
})
export class ModelNecessitiesComponent implements OnInit {
  dataNecessities:any = []
  assignedNecessities:any = []
  element:any
  translate: any = LANGUAGE

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialog: MatDialog,
  private _snack: MatSnackBar,
  private deviceServices: DevicesService,
  private fb: FormBuilder) {
    this.getNecessities()
   }

  ngOnInit(): void {
    console.log(this.data)
    this.element = this.data.element
    this.fillArray()
  }

  getNecessities(){
    this.deviceServices.getNecessities().subscribe({
      next:(v) => {
        console.log(v)
        this.dataNecessities = v.necessities
      },
      error:(e) => {
        console.log(e)
      }
    });
  }

  fillArray(){
    for (const necessitie of this.element.necessities) {
      this.assignedNecessities.push(necessitie.id)
    }
  }

  check(idItem:number) :boolean{
    const item = this.element.necessities.find(({ id }) => id === idItem);
    if (item) { return true; }
    return false;
  }

  onChange(event: any) {
    console.log(event)
    if (event.checked) {
      this.assignedNecessities.push(event.source.value.id);
    } else {
      const removeIndex = this.assignedNecessities.map((view) => view).indexOf(event.source.value.id);
      this.assignedNecessities.splice(removeIndex, 1);
    }
  }

  openSnack(message: string) {
    this._snack.open(message, '', {
      duration: 1000,
    })
  }

  sendData() {
    let data = {
      device_version_id:this.element.device_version_id,
      device_type_id:this.element.device_type_id,
      hardware_version_id:this.element.hardware_version_id,
      name:this.element.name,
      active:this.element.active,
      necessities:this.assignedNecessities
    }
    this.deviceServices.updateModels(this.element.id, data).subscribe({
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
}
