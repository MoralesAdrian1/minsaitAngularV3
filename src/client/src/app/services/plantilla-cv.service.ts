import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatosCvModel, DatosEsCvModel, DatosExCVModel, PerfilCvModel } from '../models/plantillaCvModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantillaCvService {

  private datosPUrl = 'http://localhost:3000/api/datosP'; // Ajusta la URL según tu API
  private datosLUrl = 'http://localhost:3000/api/datosL';
  private datosEsUrl = 'http://localhost:3000/api/datosEs';
  private datosExUrl = 'http://localhost:3000/api/datosEx'; // Ajusta la URL según tu API

  constructor(private http: HttpClient) { }

  getDatosP(): Observable<DatosCvModel[]> {
    return this.http.get<DatosCvModel[]>(this.datosPUrl);
  }

  getPerfil(): Observable<PerfilCvModel[]> {
    return this.http.get<PerfilCvModel[]>(this.datosLUrl);
  }
getDatosEs(): Observable<DatosEsCvModel[]> {
  return this.http.get<DatosEsCvModel[]>(this.datosEsUrl);
  }
getDatosEx(): Observable<DatosExCVModel[]> {
  return this.http.get<DatosExCVModel[]>(this.datosExUrl);
  }
}
