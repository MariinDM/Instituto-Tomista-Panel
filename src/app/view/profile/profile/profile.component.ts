
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, ElementRef, OnInit, Renderer2, HostListener, AfterViewInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/config/config.service';
import { RightSidebarService } from 'src/app/core/service/rightsidebar.service';
import { WINDOW, WINDOW_PROVIDERS } from 'src/app/core/service/window.service';
import { LanguageService } from 'src/app/core/service/language.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import * as texts from 'src/assets/data/language.json';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { timer } from 'rxjs';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  data: any[] = []
  dataRes: any[] = []
  loader = true
  filter: string = ''

  displayedColumns: string[] = ['grade', 'section', 'active', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private rightSidebarService: RightSidebarService,
    private configService: ConfigService,
    private authService: AuthService,
    private router: Router,
    public languageService: LanguageService,
    private spinner: NgxSpinnerService,
    private apiService: ApiServiceService,
    private _snack: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getall()
  }

  applyFilter(cadena: string) {
    cadena.trim()
    cadena.toLowerCase()
    this.dataSource.filter = cadena;
    this.dataSource.paginator = this.paginator;
  }

  getall(): void {
    this.loader = false
    this.data = []
    this.apiService.getGroups().subscribe({
      next: (v) => {
        this.dataRes = v.group
        v.group.forEach(element => {
          let obj = {
            id: element.id,
            grade: element.grade.name,
            section: element.section.name,
            active: element.active,
          }
          this.data.push(obj)
        });
        this.setData()
        this.loader = true
      },
      error: (e) => {
        console.log(e)
        this.loader = true
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
    this.apiService.deleteGroup(data).subscribe({
      next: (v) => { this.openSnack(v.message) },
      error: (e) => { this.openSnack(e) },
      complete: () => { this.getall() }
    })
  }

  openSnack(message: string) {
    this._snack.open(message, '', {
      duration: 1000
    })
  }

  openDialog(edit: boolean, element?: any) {

    if (edit) {
      var index = this.dataRes.findIndex(item => item.id === element.id)
    }

    let obj = this.dataRes[index]

    // this.dialog.open(GroupDialogComponent, {
    //   data: { edit, obj },
    //   panelClass: ['dialog-responsive']
    // }).afterClosed().subscribe(() => {
    //   this.getall()
    // })
  }


  logout() {
   // this.spinner.show()
    localStorage.removeItem("token");
    this.router.navigate(['/authentication/signin']);
    //this.spinner.hide()
    // this.authService.logout().subscribe((res: any) => {
    //   // console.log(res)
    //   localStorage.clear()
    // })
    // timer(1000).subscribe(()=>{
     
    // })
  }
}

