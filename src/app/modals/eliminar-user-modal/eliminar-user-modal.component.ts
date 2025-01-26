import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdministradoresService } from 'src/app/services/administradores.service';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { MaestrosService } from 'src/app/services/maestros.service';
import { MateriasService } from 'src/app/services/materias.service'; // Asegúrate de importar este servicio

@Component({
  selector: 'app-eliminar-user-modal',
  templateUrl: './eliminar-user-modal.component.html',
  styleUrls: ['./eliminar-user-modal.component.scss']
})
export class EliminarUserModalComponent implements OnInit {
  public rol: string = "";
  public itemType: string = '';  // "usuario" o "materia"
  
  constructor(
    private administradoresService: AdministradoresService,
    private maestrosService: MaestrosService,
    private alumnosService: AlumnosService,
    private materiasService: MateriasService,  // Añadir servicio de materias
    private dialogRef: MatDialogRef<EliminarUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.rol = this.data.rol || ''; // Obtener el rol o el tipo de entidad
    this.itemType = this.data.type || ''; // "usuario" o "materia"
  }

  public cerrar_modal() {
    this.dialogRef.close({ isDelete: false });
  }

  public eliminar() {
    if (this.itemType === 'usuario') {
      // Aquí gestionamos la eliminación de un usuario
      if (this.rol === 'administrador') {
        this.administradoresService.eliminarAdmin(this.data.id).subscribe(
          (response) => {
            console.log(response);
            this.dialogRef.close({ isDelete: true });
          },
          (error) => {
            console.error(error);
            this.dialogRef.close({ isDelete: false });
          }
        );
      } else if (this.rol === 'maestro') {
        this.maestrosService.eliminarMaestro(this.data.id).subscribe(
          (response) => {
            console.log(response);
            this.dialogRef.close({ isDelete: true });
          },
          (error) => {
            console.error(error);
            this.dialogRef.close({ isDelete: false });
          }
        );
      } else if (this.rol === 'alumno') {
        this.alumnosService.eliminarAlumno(this.data.id).subscribe(
          (response) => {
            console.log(response);
            this.dialogRef.close({ isDelete: true });
          },
          (error) => {
            console.error(error);
            this.dialogRef.close({ isDelete: false });
          }
        );
      }
    } else if (this.itemType === 'materia') {
      // Aquí gestionamos la eliminación de una materia
      this.materiasService.eliminarMateria(this.data.id).subscribe(
        (response) => {
          console.log(response);
          this.dialogRef.close({ isDelete: true });
        },
        (error) => {
          console.error(error);
          this.dialogRef.close({ isDelete: false });
        }
      );
    }
  }
}
