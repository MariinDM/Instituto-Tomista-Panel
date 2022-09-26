import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-get-file',
  templateUrl: './get-file.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class GetFileComponent implements OnInit {

  form!: FormGroup;
  image!: any;
  multiple:boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialog: MatDialogRef<GetFileComponent>) { this.createForm() }

  ngOnInit(): void {
    if(this.data.edit){
      this.multiple = true
    }
  }

  createForm() {
    this.form = this.fb.group({
      image: new FormControl('', []),
    });
  }

  onImageChangeFromFile() {
    this.form.controls['image'].valueChanges.subscribe((files: any) => {
      let reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = (_event) => {
        this.image = reader.result;
      }
    })
  }
  saveFile() {
    this.dialog.close({
      image: this.form.controls['image'].value
    })
  }

}
