import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { DialogUserGroupLessonsComponent } from './dialog-user-group-lessons/dialog-user-group-lessons.component';

@Component({
  selector: 'app-user-group-lessons',
  templateUrl: './user-group-lessons.component.html',
  styleUrls: ['../../app.component.scss']
})
export class UserGroupLessonsComponent implements OnInit {

  data: any[] = []
  dataOriginal: any[] = []
  loader = false
  filter: string = ''

  displayedColumns: string[] = ['teacher', 'lesson', 'group', 'level', 'quantity', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private apiService: ApiServiceService,
    private _snack: MatSnackBar,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getall()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getall(): void {
    this.data = []
    this.loader = false
    this.apiService.getGroupUserLessons().subscribe({
      next: (v) => {
        this.dataOriginal = v.groupUserLessons
        console.log(this.dataOriginal)

        this.dataOriginal.forEach(element => {
          let obj = {
            id: element.id,
            teacher: `${element.user.profile.name} ${element.user.profile.last_name} - ${element.user.email}`,
            lesson: element.lesson.name,
            group: `${element.group.grade.name} ${element.group.section.name}`,
            level: element.education_level.name,
            quantity: element.group.students.length
          }
          this.data.push(obj)
        });
        this.setData()
        this.loader = true
        this.openSnack(v.message)
      },
      error: (e) => {
        this.openSnack(e)
      }
    })
    this.filter = ''
  }

  setData(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(data: any): void {
    this.apiService.deleteGroupUserLessons(data).subscribe({
      next: (v) => { this.openSnack(v.message) },
      error: (e) => { this.openSnack(e) },
      complete: () => { this.getall() }
    })
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }

  openDialog(edit: boolean, element?: any) {

    if (edit) {
      element = this.dataOriginal.find(item => element.id === item.id)
    }

    this.dialog.open(DialogUserGroupLessonsComponent, {
      data: { element, edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getall()
    })
  }

}
