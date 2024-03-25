import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatosCvModel, PerfilCvModel } from '../models/plantillaCvModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantillaCvService {

  private datosPUrl = 'http://localhost:3000/api/datosP'; // Ajusta la URL según tu API
  private perfilUrl = 'http://localhost:3000/api/perfil'; // Ajusta la URL según tu API

  constructor(private http: HttpClient) { }

  getDatosP(): Observable<DatosCvModel[]> {
    return this.http.get<DatosCvModel[]>(this.datosPUrl);
  }

  getPerfil(): Observable<PerfilCvModel[]> {
    return this.http.get<PerfilCvModel[]>(this.perfilUrl);
  }
}
