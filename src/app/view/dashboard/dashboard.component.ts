import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { confirmDialog } from 'src/app/functions/alerts';
import { ApiServiceService } from 'src/app/services/api-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../app.component.scss']
})
export class DashboardComponent implements OnInit {
  data: any[] = []
  loader = true
  filter: string = ''
  //DATOS
  nombre: string = "";
  email: string = "";

  //FECHA
  dia: any;
  mes: string = "";

  displayedColumns: string[] = ['name', 'active', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private apiService: ApiServiceService,
    private _snack: MatSnackBar,
    public dialog: MatDialog) { }
  ngOnInit(): void {

    // const userId = JSON.parse(localStorage.getItem('userId'));
    // this.fecha();
    // this.apiService.getUser(userId).subscribe(
    //   (response) => {
    //     // Maneja la respuesta del servidor
    //     console.log(response);

    //     const user = {
    //       id: response.id,
    //       role: response.role_id,
    //       email: response.email,
    //       name: response.name,
    //       last_name: response.last_name,
    //       street: response.street,
    //       number: response.number,
    //       suburb: response.suburb,
    //       city: response.city,
    //       state: response.state,
    //       zip_code: response.zip_code,
    //       phone: response.phone
    //     };

    //     // Convertir el objeto a una cadena de texto JSON
    //     const userJson = JSON.stringify(user);

    //     // Guardar la cadena de texto en el localStorage
    //     localStorage.setItem('UserData', userJson);

    //     const userDataJson = localStorage.getItem('UserData');
    //     const userData = JSON.parse(userDataJson);
    //     this.nombre = userData.name + " " + user.last_name
    //     // let { name, last_name } = userData;
    //     this.email = userData.email;


    //   },
    //   (error) => {
    //     // Maneja los errores de la solicitud
    //     console.error(error);
    //   }
    // );

  }

  fecha(): void {
    // Obtener la fecha actual
    const fechaActual = new Date();

    // Obtener el número del día
    const numeroDia = fechaActual.getDate();

    // Obtener el nombre del mes en español
    const nombreMes = obtenerNombreMesEnEspanol(fechaActual.getMonth());

    // Función para obtener el nombre del mes en español
    function obtenerNombreMesEnEspanol(mes) {
      const mesesEnEspanol = [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre'
      ];

      return mesesEnEspanol[mes];
    }

    // Mostrar el número del día y el nombre del mes en español
    console.log(`${numeroDia} ${nombreMes}`);
    this.dia = numeroDia;
    this.mes = nombreMes;

  }

}
