import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EliminarUserModalComponent } from 'src/app/modals/eliminar-user-modal/eliminar-user-modal.component';
import { FacadeService } from 'src/app/services/facade.service';
import { AlumnosService } from 'src/app/services/alumnos.service';

@Component({
  selector: 'app-alumnos-screen',
  templateUrl: './alumnos-screen.component.html',
  styleUrls: ['./alumnos-screen.component.scss']
})
export class AlumnosScreenComponent implements OnInit, AfterViewInit {

  public name_user: string = "";
  public rol: string = "";
  public token: string = "";
  public lista_alumnos: any[] = [];
  public autorizado: boolean = false;

  // Configuración de la tabla
  displayedColumns: string[] = ['matricula', 'nombre', 'email', 'curp', 'edad', 'telefono', 'ocupacion', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<DatosAlumno>(this.lista_alumnos as DatosAlumno[]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public facadeService: FacadeService,
    public alumnosService: AlumnosService
  ) {}

  ngOnInit(): void {
    this.name_user = this.facadeService.getUserCompleteName();
    this.rol = this.facadeService.getUserGroup();

    // Validar que haya inicio de sesión
    this.token = this.facadeService.getSessionToken();
    if (this.token === "") {
        this.router.navigate([""]);
    }

    // Obtener alumnos
    this.obtenerAlumnos();
  }

  // Método para obtener la lista de alumnos
  public obtenerAlumnos() {
    this.alumnosService.obtenerListaAlumnos().subscribe(
        (response) => {
            this.lista_alumnos = response.map((alumno: any) => ({
                ...alumno,
                first_name: alumno.user ? alumno.user.first_name : '',
                last_name: alumno.user ? alumno.user.last_name : '',
                email: alumno.user ? alumno.user.email : ''
            }));
            this.dataSource.data = this.lista_alumnos;
        },
        error => {
            alert("No se pudo obtener la lista de alumnos");
        }
    );
  }

  // Redirigir a la página de edición de un alumno
  public goEditar(idAlumno: number) {
    this.router.navigate(["registro-usuarios/alumno/" + idAlumno]);
  }

  // Eliminar un alumno
  public delete(idAlumno: number) {
    const dialogRef = this.dialog.open(EliminarUserModalComponent, {
        data: { id: idAlumno, rol: 'alumno' },
        height: '288px',
        width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isDelete){
        console.log("Alumno eliminado");
        //Recargar página
        window.location.reload();
      }else{
        alert("Alumno no eliminado ");
        console.log("No se eliminó el alumno");
      }
    });
  }
}

// Interfaz para definir los datos del alumno
export interface DatosAlumno {
  id: number;
  matricula: string;
  first_name: string;
  last_name: string;
  email: string;
  curp: string;
  edad: number;
  telefono: string;
  ocupacion: string;
}
