import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CiudadModel } from '../models/ciudadModel';
import { Observable, catchError, map, throwError } from 'rxjs';
import { EstadoModel } from '../models/estadoModel';
import { paisModel } from '../models/paisModel';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  constructor(private http: HttpClient) { }
  domain: string="http://localhost:3000";
  getCiudad() {
    return this.http.get<CiudadModel[]>(`${this.domain}/api/ciudad`).pipe(
      map(res => res)
    );
  }

  addCiudad(newCiudad: CiudadModel){
    return this.http.post<CiudadModel>(`${this.domain}/api/ciudad`,newCiudad).pipe(
      map(res => res)
      );
  }

  deleteCiudad(id: string){
    return this.http.delete<CiudadModel>(`${this.domain}/api/ciudad/${id}`).pipe(
      map(res => res)
      );
  }
  updateCiudad(newCiudad: CiudadModel) {
    return this.http.put(`${this.domain}/api/ciudad/${newCiudad._id}`, newCiudad).pipe(
      map(res => res)
    );
  }
  getPaises(): Observable<paisModel[]> {
    return this.http.get<paisModel[]>(`${this.domain}/api/pais`).pipe(
      catchError((error: any) => throwError('Error al cargar Paises'))
    );
  }
  getEstados(): Observable<EstadoModel[]> {
    return this.http.get<EstadoModel[]>(`${this.domain}/api/estado`).pipe(
      catchError((error: any) => throwError('Error al cargar Estados'))
    );
  }
}
