import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import{DatosPModel} from'../models/datosPModel';
import { Observable, throwError } from 'rxjs';
import { paisModel } from '../models/paisModel';
import { CiudadModel } from '../models/ciudadModel';
import { EstadoModel } from '../models/estadoModel';

@Injectable({
  providedIn: 'root'
})
export class DatosPService {

  constructor(private http: HttpClient) { }
  domain: string="http://localhost:3000";
  getDatosP() {
    return this.http.get<DatosPModel[]>(`${this.domain}/api/datosP`).pipe(
      map(res => res)
    );
  }

  addDatosP(newDatosP: DatosPModel){
    return this.http.post<DatosPModel>(`${this.domain}/api/datosP`,newDatosP).pipe(
      map(res => res)
      );
  }

  deleteDatosP(id: string){
    return this.http.delete<DatosPModel>(`${this.domain}/api/datosP/${id}`).pipe(
      map(res => res)
      );
  }
  updateDatosP(newDatosP: DatosPModel) {
    return this.http.put(`${this.domain}/api/datosP/${newDatosP._id}`, newDatosP).pipe(
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
  getCiudades(): Observable<CiudadModel[]> {
    return this.http.get<CiudadModel[]>(`${this.domain}/api/ciudad`).pipe(
      catchError((error: any) => throwError('Error al cargar Ciudad'))
    );
  }


}
