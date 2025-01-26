import { Component, OnInit } from '@angular/core';
import { MaestrosService } from '../services/maestros.service';
import { MateriasService } from '../services/materias.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-materia',
  templateUrl: './register-materia.component.html',
  styleUrls: ['./register-materia.component.scss']
})
export class RegisterMateriaComponent implements OnInit {
  public errors: any = {};
  public editar: boolean = false;
  diasSemana: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado'];
  diasSeleccionados: { [key: string]: boolean } = {};
  public maestros: any[] = []; 
  public selectedMaestro: any; 
  public id: number = 0;
  public materia: any = {};

  constructor(
    private maestrosService: MaestrosService,
    private materiasService: MateriasService,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.diasSemana.forEach(dia => {
      this.diasSeleccionados[dia] = false;
    });
  }

  ngOnInit(): void {
    this.loadMaestros(); 
    if (this.activatedRoute.snapshot.params['id'] != undefined) {
      this.editar = true;
      this.id = this.activatedRoute.snapshot.params['id'];
      console.log("ID Materia: ", this.id);
  
      this.materiasService.getMateriaById(this.id).subscribe(
        (data) => {
          this.materia = data;
          console.log("Datos de la materia para editar:", this.materia);
  
         
          this.diasSemana.forEach(dia => {
            this.diasSeleccionados[dia] = this.materia.dias.includes(dia);
          });
  
          
          this.selectedMaestro = this.maestros.find(maestro => maestro.id === this.materia.profesor);
        },
        (error) => {
          console.error('Error al cargar los datos de la materia:', error);
        }
      );
    } else {
      this.materia = {}; 
    }
  }


  loadMaestros(): void {
    this.maestrosService.obtenerListaMaestros().subscribe(
      (data) => {
        console.log("Profes:", data);
        this.maestros = data.map((maestro: any) => ({
          ...maestro,
          nombre: maestro.user ? `${maestro.user.first_name} ${maestro.user.last_name}` : 'Nombre desconocido'
        }));
      },
      (error) => {
        console.error('Error al obtener maestros:', error);
      }
    );
  }

  // Función para manejar el envío del formulario
  onSubmit(form: any): void {
    this.errors = {};

    // Validaciones
    const nombrePattern = /^[a-zA-Z0-9\s]+$/;
    if (!form.value.nombre) {
      this.errors["nombre"] = "El nombre de la materia es obligatorio";
    } else if (!nombrePattern.test(form.value.nombre)) {
      this.errors["nombre"] = "El nombre de la materia solo puede contener letras, números y espacios";
    }

    if (!form.value.nrc) {
      this.errors["nrc"] = "El NRC es obligatorio";
    }

    if (!form.value.seccion) {
      this.errors["seccion"] = "La sección es obligatoria";
    }

    if (!Object.values(this.diasSeleccionados).includes(true)) {
      this.errors["diasSeleccionados"] = "Debes seleccionar al menos un día";
    }

    const horarioInicio = form.value.horario_inicio;
    const horarioFin = form.value.horario_fin;
    if (!horarioInicio || !horarioFin) {
      this.errors["horario"] = "El horario de inicio y fin son obligatorios";
    } else if (new Date(`1970-01-01T${horarioInicio}`) >= new Date(`1970-01-01T${horarioFin}`)) {
      this.errors["horario"] = "La hora de inicio debe ser menor a la hora de fin";
    }

    const salonPattern = /^[a-zA-Z0-9\s]+$/;
    if (!form.value.salon) {
      this.errors["salon"] = "El salón es obligatorio";
    } else if (!salonPattern.test(form.value.salon)) {
      this.errors["salon"] = "El salón solo puede contener letras, números y espacios";
    }

    if (!form.value.programa) {
      this.errors["programa"] = "El programa educativo es obligatorio";
    }

    if (!this.selectedMaestro) {
      this.errors["profesor"] = "El profesor es obligatorio";
    }

    if (!form.value.creditos) {
      this.errors["creditos"] = "Los créditos son obligatorios";
    }

    if (Object.keys(this.errors).length === 0) {
      // Preparar los datos para enviar al backend
      const materiaData = {
        nrc: form.value.nrc,
        nombre: form.value.nombre,
        seccion: form.value.seccion,
        dias: Object.keys(this.diasSeleccionados).filter(dia => this.diasSeleccionados[dia]),
        horario_inicio: form.value.horario_inicio,
        horario_fin: form.value.horario_fin,
        salon: form.value.salon,
        programa: form.value.programa,
        profesor: this.selectedMaestro,
        creditos: form.value.creditos,
      };
      console.log("Profesor seleccionado:", this.selectedMaestro);

      // Enviar los datos al servicio
      console.log("Datos enviados al backend:", materiaData);
      this.materiasService.createMateria(materiaData).subscribe(
        (response) => {
          console.log('Materia registrada exitosamente:', response);
          form.resetForm();
          this.diasSeleccionados = {};
          this.selectedMaestro = null;
        },
        (error) => {
          console.error('Error al registrar la materia:', error);
          this.errors = { general: 'Hubo un error al registrar la materia.' };
        }
      );
      
    } else {
      console.log("Errores en el formulario:", this.errors);
    }
  }

  // Función para editar materia
  actualizarMateria(form: any, materiaData: any): void {
    this.materiasService.editarMateria(this.id, materiaData).subscribe(
      (response) => {
        alert("Materia editada correctamente");
        console.log("Materia editada: ", response);
        form.resetForm();
        this.diasSeleccionados = {};
        this.selectedMaestro = null;
        this.router.navigate(['home']);
      },
      (error) => {
        alert("No se pudo editar la materia");
        console.error('Error al editar la materia:', error);
        this.errors = { general: 'Hubo un error al editar la materia.' };
      }
    );
  }

  // Función para crear materia
  crearMateria(form: any, materiaData: any): void {
    this.materiasService.createMateria(materiaData).subscribe(
      (response) => {
        console.log('Materia registrada exitosamente:', response);
        form.resetForm();
        this.diasSeleccionados = {};
        this.selectedMaestro = null;
      },
      (error) => {
        console.error('Error al registrar la materia:', error);
        this.errors = { general: 'Hubo un error al registrar la materia.' };
      }
    );
  }

  // Función para verificar que al menos un día esté seleccionado
  areDiasSeleccionados(): boolean {
    return Object.values(this.diasSeleccionados).includes(true);
  }
}
