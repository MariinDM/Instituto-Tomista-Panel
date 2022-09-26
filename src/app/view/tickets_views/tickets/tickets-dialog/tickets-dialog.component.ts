import { Component, Inject, InjectFlags, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TicketsService } from 'src/app/services/tickets.service';
import { environment } from 'src/environments/environment';
import * as LANGUAGE from 'src/assets/i18n/translate.json';
import { TicketDialogFileComponent } from '../ticket-dialog-file/ticket-dialog-file.component';
import { GetFileComponent } from 'src/app/view/shared/get-file/get-file.component';

@Component({
  selector: 'app-tickets-dialog',
  templateUrl: './tickets-dialog.component.html',
  styleUrls: ['../../../../app.component.scss']
})
export class TicketsDialogComponent implements OnInit {

  form!: FormGroup;
  formComments!: FormGroup;
  element: any;
  edit: boolean;
  rol = localStorage.getItem('rol')
  dataTickets: any[] = []
  dataStatus: any[] = []
  dataDevices: any[] = []
  dataComments: any[] = []
  multimedias: any[] = []
  ticketImage: any[] = []
  selectImages: any[] = []
  srcArray: any[] = []
  imageComment: any
  url = environment.apiUrl + 'v1/en/resources/uploads/Tickets/'
  src: any;
  format: any;
  user_id = localStorage.getItem('id')
  translate: any = LANGUAGE

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _snack: MatSnackBar,
    private ticketsSvc: TicketsService,
    private fb: FormBuilder) {
    this.createForm()
    this.getData()
  }

  ngOnInit(): void {
    // console.log(this.data)
    this.edit = this.data.edit
    if (this.data.edit) {
      this.element = this.data.element
      // console.log(this.element)
      this.form.patchValue(this.element)
      this.dataComments = this.element.ticket_comments
      this.ticketImages(this.element.ticket_multimedia)
    }
  }

  getData() {
    this.ticketsSvc.getallTicketsCategories().subscribe({
      next: (v) => {
        this.dataTickets = v.ticket_categories
      },
      error: (e) => {
        console.log(e)
      }
    })
    this.ticketsSvc.getTicketsStatus().subscribe({
      next: (v) => {
        this.dataStatus = v.status
      },
      error: (e) => {
        console.log(e)
      }
    })
    if (this.rol != '1' && this.rol != '2') {
      this.ticketsSvc.getUserDevices().subscribe({
        next: (v) => {
          this.dataDevices = v.user_devices
        },
        error: (e) => {
          console.log(e)
        }
      })
    }
  }

  createForm() {
    this.form = this.fb.group({
      ticket_category_id: new FormControl('', [Validators.required]),
      user_device_id: new FormControl(null, []),
      title: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
      status: new FormControl('O', [Validators.required]),
      multimedias: new FormControl('', [])
    });
    this.formComments = this.fb.group({
      ticket_id: new FormControl(null, [Validators.required]),
      comment: new FormControl('', []),
      multimedias: new FormControl('', [])
    })
  }

  sendData() {
    if (this.form.invalid) { return }

    let img = this.selectImages;

    if (!this.data.edit) {
      for (let i in img) {
        var fd = new FormData()
        fd.set('image', img[i])

        this.ticketsSvc.uploadImageTicket(fd).subscribe({
          next: (v) => {
            console.log(v)
            this.multimedias.push(v.ticket_multimedia_id)
          },
          error: (e) => {
            console.log(e)
          }
        })
      }

      const pro1 = new Promise((resolve, rejects) => {
        setTimeout(() => {
          resolve(this.multimedias)
        }, 1500)
      })

      pro1
        .then(() => {
          let data = {
            ticket_category_id: this.form.controls['ticket_category_id'].value,
            user_device_id: this.form.controls['user_device_id'].value,
            status: this.form.controls['status'].value,
            text: this.form.controls['text'].value,
            title: this.form.controls['title'].value,
            multimedias: this.multimedias,
          }
          this.ticketsSvc.insertTickets(data).subscribe({
            next: (v) => {
              console.log(v)
              this.openSnack(v.message)
            },
            error: (e) => {
              console.log(e)
              this.openSnack(e)
            },
            complete: () => {
              this.dialog.closeAll()
            }
          })
        })
        .catch(() => this.openSnack('Error'))
    } else {
      let img = []

      for (let i in this.element.ticket_multimedia) {
        img.push(this.element.ticket_multimedia[i].id)
      }
      let data = {
        ticket_category_id: this.form.controls['ticket_category_id'].value,
        user_device_id: this.form.controls['user_device_id'].value,
        status: this.form.controls['status'].value,
        text: this.form.controls['text'].value,
        title: this.form.controls['title'].value,
        multimedias: img,
      }
      this.ticketsSvc.updateTickets(this.element.id, data).subscribe({
        next: (v) => {
          console.log(v)
          this.openSnack(v.message)
        },
        error: (e) => {
          console.log(e)
          this.openSnack(e)
        },
        complete: () => {
          this.dialog.closeAll()
        }
      })
    }
  }

  sendComment() {
    if (this.formComments.controls['comment'].value == '') { return }

    let data = {
      ticket_id: this.element.id,
      text: this.formComments.controls['comment'].value,
      multimedias: []
    }

    if (this.imageComment) {
      var fd = new FormData()
      fd.set('image', this.imageComment)

      this.ticketsSvc.uploadImageTicket(fd).subscribe({
        next: (v) => {
          console.log(v)
          data.multimedias.push(v.ticket_multimedia_id)
          this.ticketsSvc.insertTicketsComments(data).subscribe({
            next: (v) => {
              this.openSnack(v.message)
              this.refreshData()
            },
            error: (e) => {
              this.openSnack(e)
            }
          })
        },
        error: (e) => {
          console.log(e)
        }
      })
    } else {
      this.ticketsSvc.insertTicketsComments(data).subscribe({
        next: (v) => {
          this.openSnack(v.message)
        },
        error: (e) => {
          this.openSnack(e)
        }
      })
    }
    this.formComments.controls['comment'].setValue('')
  }

  refreshData() {
    this.ticketsSvc.getoneTickets(this.element.id).subscribe({
      next: (v) => {
        console.log(v)
        let a = v.ticket.ticket_comments.length
        this.dataComments.push(v.ticket.ticket_comments[a - 1])
      },
      error: (e) => {
        console.log(e)
      }
    })
  }

  deleteFile(element: any) {
    const index: number = this.srcArray.indexOf(element);
    if (index !== -1) {
      this.srcArray.splice(index, 1)
    }
  }

  ticketImages(data: any) {
    for (let i in data) {
      let f = {
        url: environment.apiUrl + 'v1/en/resources/uploads/Tickets/' + data[i].filename + '.' + data[i].extension,
        extension: data[i].extension,
      }
      this.ticketImage.push(f)
    }
  }

  openDialogImage(name: any, edit: boolean) {
    this.dialog.open(TicketDialogFileComponent, {
      data: { name },
      panelClass: ['dialog-responsive']
    })
  }

  openDialogImageComment(edit: boolean) {
    this.dialog.open(GetFileComponent, {
      data: { edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe((data) => {
      this.imageComment = data.image
      this.openSnack(this.translate.shared.captured_image)
      // console.log(this.imageComment)
    })
  }

  openDialogSelectImage(edit: boolean) {
    this.dialog.open(GetFileComponent, {
      data: { edit },
      panelClass: ['dialog-responsive']
    }).afterClosed().subscribe((data) => {
      this.selectImages = data.image
      this.uploadImage(this.selectImages)
      this.openSnack(this.translate.shared.captured_image)
    })
  }

  uploadImage(file: any) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    if (file.type === 'video/mp4') {
      this.format = 'video'
    } else {
      this.format = 'image'
    }
    reader.onload = (event) => {
      this.src = {
        url: (<FileReader>event.target).result,
        format: this.format
      }
      this.srcArray.push(this.src)
      console.log(this.srcArray)
    }
  }

  openSnack(message: string) {
    this._snack.open(message, '', { duration: 1000, })
  }

}
