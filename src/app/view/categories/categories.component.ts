import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['../../app.component.scss']
})
export class CategoriesComponent implements OnInit {

  dataCategory!: any[]
  loader = true
  code = localStorage.getItem('code')
  filter: string = ''
  apiURL = environment.apiUrl

  displayedColumns: string[] = ['point', 'name', 'order_index', 'description', 'image', 'active', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private categoryService: CategoryService,
    private _snack: MatSnackBar,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getall()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getall(): void {
    this.loader = false
    this.categoryService.getall(this.code).subscribe({
      next: (v) => {
        this.dataCategory = v.categories
        this.setData()
        this.loader = true
        this.openSnack(v.message)
      },
      error: (e) => {
        this.openSnack(e.error.message)
      }
    })
    this.filter= ''
  }

  setData(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.dataCategory;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(id: number): void {
    this.categoryService.delete(this.code, id).subscribe({
      next: (v) => {
        this.openSnack(v.message)
      },
      error: (e) => {
        this.openSnack(e.error.error.message)
      },
      complete: () => {
        this.getall()
      }
    })
  }

  openSnack(message: string) {
    this._snack.open(message, '', {
      duration: 1000,
    })
  }

  openDialog(edit: boolean) {
    this.dialog.open(CategoryDialogComponent, {
      data: { edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getall()
    })
  }

  openDialogUpdate(element: Category, edit: boolean) {
    this.dialog.open(CategoryDialogComponent, {
      data: { element, edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getall()
    })
  }

}
