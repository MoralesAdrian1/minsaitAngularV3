import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadoModel } from '../models/estadoModel';
import { Observable, catchError, map, throwError } from 'rxjs';
import { paisModel } from '../models/paisModel';
@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor(private http: HttpClient) { }
  domain: string="http://localhost:3000";
  getEstado() {
    return this.http.get<EstadoModel[]>(`${this.domain}/api/estado`).pipe(
      map(res => res)
    );
  }

  addEstado(newEstado: EstadoModel){
    return this.http.post<EstadoModel>(`${this.domain}/api/estado`,newEstado).pipe(
      map(res => res)
      );
  }

  deleteEstado(id: string){
    return this.http.delete<EstadoModel>(`${this.domain}/api/estado/${id}`).pipe(
      map(res => res)
      );
  }
  updateEstado(newEstado: EstadoModel) {
    return this.http.put(`${this.domain}/api/estado/${newEstado._id}`, newEstado).pipe(
      map(res => res)
    );
  }
  getPaises(): Observable<paisModel[]> {
    return this.http.get<paisModel[]>(`${this.domain}/api/pais`).pipe(
      catchError((error: any) => throwError('Error al cargar Paises'))
    );
  }
}
