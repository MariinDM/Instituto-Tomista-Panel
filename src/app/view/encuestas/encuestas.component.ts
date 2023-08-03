import { Component, OnInit } from '@angular/core';
// import {Component} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.scss']
})
export class EncuestasComponent implements OnInit {
  data: any[] = []

  constructor(private _formBuilder: FormBuilder,private apiService: ApiServiceService) { }

  ngOnInit(): void {
  }

  getall(): void {
    // this.loader = false
    this.apiService.getGrades().subscribe({
      next: (v) => {
        this.data = v.grade
        
      },
      error: (e) => {
        console.log(e)
        // this.loader = true
      }
    })
    // this.filter = ''
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  


}
