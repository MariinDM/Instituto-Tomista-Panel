import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Region } from 'src/app/interfaces/sales-interfaces';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-dealer-dialog',
  templateUrl: './dealer-dialog.component.html',
  styleUrls: ['../../../../app.component.scss']
})
export class DealerDialogComponent implements OnInit {
  form!: FormGroup;
  element:any;
  dataRegions!:Region[];
  edit:boolean;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
  private dialog: MatDialog,
  private _snack: MatSnackBar,
  private salesServices: SalesService,
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
      regions_id: new FormControl('', [Validators.required]),
      legal_id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      active: new FormControl('',),
    });
  }

  setData(){
    console.log(this.element)
    this.form.controls['regions_id'].setValue(this.element.regions_id)
    this.form.controls['legal_id'].setValue(this.element.legal_id)
    this.form.controls['name'].setValue(this.element.name)
    this.form.controls['active'].setValue(this.element.active)
  }

  getData(): void {
    this.salesServices.getRegions().subscribe({
      next:(v) => {
        console.log(v)
        this.dataRegions = v.regions
      },
      error:(e) => {
        console.log(e)
      }
    });
  }

  sendData(){
    let data = {
      regions_id:this.form.controls['regions_id'].value,
      legal_id:this.form.controls['legal_id'].value,
      name:this.form.controls['name'].value,
      active:this.form.controls['active'].value,
    }

    if(this.edit){
      this.salesServices.updateDealer(this.element.id, data).subscribe({
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
      this.salesServices.sendDealer(data).subscribe({
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

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }
}
