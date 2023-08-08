import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-dialog-user-group-lessons',
  templateUrl: './dialog-user-group-lessons.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class DialogUserGroupLessonsComponent implements OnInit {

  form!: FormGroup
  obj!: any
  element: any;
  edit: boolean;
  teachers: any[] = []
  students: any[] = []
  groups: any[] = []
  lessons: any[] = []
  education_levels: any[] = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private apiService: ApiServiceService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.edit = this.data.edit;
    this.buildForm()
    if (this.data.edit) {
      this.element = this.data.element;
    }
    this.getData()
    this.onChangeEducationLevel()
  }

  getData() {
    // GRUPOS
    this.apiService.getGroups().subscribe({
      next: (v) => {
        this.groups = v.group.filter(item => item.active)
      },
      error: (e) => {
        console.log(e)
      }
    })
    // DOCENTES Y ALUMNOS
    this.apiService.getUsers().subscribe({
      next: (v) => {
        this.students = v.users.filter(item => item.active && item.role_id === 3)
        this.teachers = v.users.filter(item => item.active && item.role_id === 2)

        this.students.forEach(element => {
          element['full_name'] = element.profile.name + ' ' + element.profile.last_name
        });

        this.teachers.forEach(element => {
          element['full_name'] = element.profile.name + ' ' + element.profile.last_name
        });
      },
      error: (e) => {
        console.log(e)
      }
    })
    // NIVELES EDUCATIVOS
    this.apiService.getEducationLevels().subscribe({
      next: (v) => {
        this.education_levels = v.educa.filter(item => item.active)
        // console.log(this.education_levels)
      },
      error: (e) => {
        console.log(e)
      }
    })
    // MATERIAS
    this.apiService.getLessons().subscribe({
      next: (v) => {
        // console.log(v)
        this.lessons = v.lesson.filter(item => item.active)
      },
      error: (e) => {

      }
    })

  }

  onChangeEducationLevel(): void {
    // this.form.controls['education_level_id'].valueChanges.subscribe(v => {
    //   // console.log(v)
    //   this.apiService.filterLessonsEducationLevel({ id: v }).subscribe({
    //     next: (v) => {
    //       console.log(v)
    //       this.lessons = v.educa.lessons
    //     },
    //     error: (e) => {

    //     }
    //   })
    // })
  }

  buildForm(): void {
    this.form = this.fb.group({
      group_id: new FormControl('', [Validators.required]),
      education_level_id: new FormControl('', [Validators.required]),
      lessons: new FormControl([], [Validators.required]),
      teacher_id: new FormControl('', [Validators.required]),
      students: new FormControl('', [Validators.required]),
    })
  }

  sendData() {

    const formData = this.form.value

    var dataSend = {
      group_id: formData.group_id,
      education_level_id: formData.education_level_id,
      lessons: formData.lessons,
      students: formData.students,
      user_id: formData.teacher_id
    }

    this.apiService.addGroupUserLessons(dataSend).subscribe({
      next: (v) => {
        this.openSnack(v.message)
      },
      error: (e) => {
        this.openSnack(e.message)
        // console.log(e)
      },
      complete: () => {
        this.dialog.closeAll()
      }
    })
  }

  openSnack(message: string) {
    this._snack.open(message, '', {
      duration: 1000,
    })
  }


}
