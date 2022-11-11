import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TicketsService } from 'src/app/services/tickets.service';
import * as LANGUAGE from 'src/assets/i18n/translate.json';
import { TicketsDialogComponent } from './tickets-dialog/tickets-dialog.component';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class TicketsComponent implements OnInit {

  dataTable: any[] = []
  dataTickets: any[] = []
  loader = false
  rol = localStorage.getItem('rol')
  filter: string = ''
  translate: any = LANGUAGE

  displayedColumns: string[] = ['point', 'id', 'category', 'title', 'text', 'active', 'actions'];
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
    this.dataTable = []
    this.ticketSvc.getallTickets().subscribe({
      next: (v) => {
        this.loader = true;
        this.dataTickets = v.tickets
        for (let i = 0; i < v.tickets.length; i++) {
          let ticket = {
            id: v.tickets[i].id,
            category: v.tickets[i].ticket_category.name,
            title: v.tickets[i].title,
            text: v.tickets[i].text,
            status: v.tickets[i].status,
          }
          this.dataTable.push(ticket)
        }
        this.setData()
        this.openSnack(v.message)
      },
      error: (e) => {
        // console.log(e)
        this.openSnack(e)
      }
    });
    this.filter = ''
  }

  setData(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.dataTable;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(id: number) {
    this.ticketSvc.deleteTickets(id).subscribe({
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
    this.dialog.open(TicketsDialogComponent, {
      data: { edit },
      panelClass: ['dialog-tickets']
    }).afterClosed().subscribe(() => {
      this.getData()
    })
  }

  openDialogUpdate(element: any, edit: boolean) {
    for (let i = 0; i < this.dataTickets.length; i++) {
      if (this.dataTickets[i].id == element.id) {
        element = this.dataTickets[i]
      }
    }
    this.dialog.open(TicketsDialogComponent, {
      data: { element, edit },
      panelClass: ['dialog-tickets']
    }).afterClosed().subscribe(() => {
      this.getData()
    })
  }

}
