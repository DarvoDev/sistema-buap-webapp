import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';
import { FacadeService } from './facade.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  private apiUrl = `${environment.url_api}/materias/`; 

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private facadeService: FacadeService,
  ) { }

  // Obtener todas las materias
  public obtenerMaterias(): Observable<any> {
    return this.http.get<any>(`${environment.url_api}/materias/list/`, httpOptions);
  }

  // Crear una nueva materia
  public createMateria(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url_api}/materias/`, data, httpOptions);
  }

  // Obtener una materia por ID
  getMateriaById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.url_api}/materias/${id}`);
  }
  
  

  // Editar una materia existente
  public editarMateria(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${environment.url_api}/materias/edit/`, { id, ...data }, httpOptions);
  }

  // Eliminar una materia
  public eliminarMateria(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.url_api}/materias/delete/?id=${id}`, httpOptions);
  }

  // Validación para los formularios de materia
  public validarMateria(data: any, editar: boolean): any {
    let error: any = [];

    if (!this.validatorService.required(data["nrc"])) {
      error["nrc"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["nombre"])) {
      error["nombre"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["seccion"])) {
      error["seccion"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["dias"])) {
      error["dias"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["horario_inicio"])) {
      error["horario_inicio"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["horario_fin"])) {
      error["horario_fin"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["salon"])) {
      error["salon"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["programa"])) {
      error["programa"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["profesor_nombre"])) {
      error["profesor_nombre"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["creditos"])) {
      error["creditos"] = this.errorService.required;
    }

    
    return error;
  }
}
