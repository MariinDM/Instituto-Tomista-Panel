import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TicketsService } from 'src/app/services/tickets.service';
import { TicketCategoriesDialogComponent } from './ticket-categories-dialog/ticket-categories-dialog.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import * as LANGUAGE from 'src/assets/i18n/translate.json';

@Component({
  selector: 'app-ticket-categories',
  templateUrl: './ticket-categories.component.html',
  styleUrls: ['../../../app.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TicketCategoriesComponent implements OnInit {

  dataTickets: any[] = []
  loader = false
  filter: string = ''
  translate: any = LANGUAGE

  displayedColumns: string[] = ['point', 'id', 'code', 'name', 'description', 'active', 'actions'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private ticketSvc: TicketsService,
    private _snack: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getData()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getData(): void {
    this.loader = false
    this.ticketSvc.getallTicketsCategories().subscribe({
      next: (v) => {
        this.loader = true;
        this.dataTickets = v.ticket_categories
        this.setData()
        this.openSnack(v.message)
      },
      error: (e) => {
        console.log(e)
        this.openSnack(e.error.message)
      }
    });
    this.filter = ''
  }

  setData(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.dataTickets;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(id: number) {
    this.ticketSvc.deleteTicketsCategories(id).subscribe({
      next: (v) => {
        this.openSnack(v.message)
        this.getData()
      },
      error: (e) => {
        this.openSnack(e)
      }
    })
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }

  openDialog(edit: boolean) {
    this.dialog.open(TicketCategoriesDialogComponent, {
      data: { edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getData()
    })
  }

  openDialogUpdate(element: any, edit: boolean) {
    this.dialog.open(TicketCategoriesDialogComponent, {
      data: { element, edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe(() => {
      this.getData()
    })
  }

}
