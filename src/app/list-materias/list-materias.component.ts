import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';  // Asegúrate de importar ActivatedRoute
import { MatDialog } from '@angular/material/dialog';
import { MateriasService } from 'src/app/services/materias.service';
import { EliminarUserModalComponent } from 'src/app/modals/eliminar-user-modal/eliminar-user-modal.component';
import { FacadeService } from 'src/app/services/facade.service';
import { AuthService } from 'src/app/services/auth.service';
declare var $:any;

@Component({
  selector: 'app-list-materias',
  templateUrl: './list-materias.component.html',
  styleUrls: ['./list-materias.component.scss']
})
export class ListMateriasComponent implements OnInit, AfterViewInit {
  @Input() rol:string ="";
  public lista_materias: any[] = [];
  displayedColumns: string[] = ['nrc', 'nombre', 'seccion', 'programa', 'profesor', 'editar', 'eliminar'];
  

  dataSource = new MatTableDataSource<any>(this.lista_materias); 

  @ViewChild(MatPaginator) paginator: MatPaginator;

  editar: boolean = false; 
  id: number = 0;
  materia: any = {};

  constructor(
    private materiasService: MateriasService,
    private facadeService: FacadeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,  
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.rol = this.facadeService.getUserGroup();
    this.loadMaterias(); 
    const materiaId = this.activatedRoute.snapshot.params['id'];
    if (materiaId != undefined) {
      this.editar = true;
      this.id = materiaId;
      console.log("ID Materia: ", this.id);

      
      this.materiasService.getMateriaById(this.id).subscribe(
        (data) => {
          this.materia = data;
          console.log("Datos de la materia para editar:", this.materia);
        },
        (error) => {
          console.error('Error al cargar los datos de la materia:', error);
        }
      );
    }
  }

  ngAfterViewInit(): void {
    
    this.dataSource.paginator = this.paginator;
    this.initPaginator();
  }

  loadMaterias(): void {
    this.materiasService.obtenerMaterias().subscribe({
      next: (response) => {
        console.log('Materias recibidas del backend:', response.results);
        if (response && response.results) {
          this.lista_materias = response.results;
          this.dataSource.data = this.lista_materias; 
        } else {
          console.warn('No se encontraron materias en la respuesta del backend.');
          this.lista_materias = [];
          this.dataSource.data = [];
        }
      },
      error: (error) => {
        console.error('Error cargando materias:', error);
        alert('No se pudieron cargar las materias.');
      }
    });
  }


  public initPaginator(){
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
     
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
          return `0 / ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} de ${length}`;
      };
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.lastPageLabel = 'Última página';
      this.paginator._intl.previousPageLabel = 'Página anterior';
      this.paginator._intl.nextPageLabel = 'Página siguiente';
    },500);
  }


  editMateria(id: number): void {
    this.router.navigate([`registrar-materia/${id}`]); 
    console.log('Editar materia:', id);
  }


  deleteMateria(id: number): void {
    const dialogRef = this.dialog.open(EliminarUserModalComponent, {
      data: {
        id: id, 
        type: 'materia' 
      },
      height: '288px',
      width: '328px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.isDelete) {
        console.log("Materia eliminada");
        this.loadMaterias(); 
      } else {
        console.log("No se eliminó la materia");
      }
    });
  }


  pageEvent(event: any): void {
    console.log('Cambio de página:', event);
    
  }
}
