import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { DatosLModel } from '../models/datosLModel';

@Injectable({
  providedIn: 'root'
})
export class DatosLService {

  constructor(private http: HttpClient) { }
  domain: string = "http://localhost:3000";

  getDatosL() {
    return this.http.get<DatosLModel[]>(`${this.domain}/api/datosL`).pipe(
      map(res => res.map(item => this.parseDatosLModel(item)))
    );
  }

  addDatosL(newDatosl: DatosLModel) {
    return this.http.post<DatosLModel>(`${this.domain}/api/datosL`, newDatosl).pipe(
      map(res => this.parseDatosLModel(res))
    );
  }

  deleteDatosL(id: string) {
    return this.http.delete<DatosLModel>(`${this.domain}/api/datosL/${id}`).pipe(
      map(res => this.parseDatosLModel(res))
    );
  }

  updateDatosL(newDatosl: DatosLModel) {
    return this.http.put<DatosLModel>(`${this.domain}/api/datosL/${newDatosl._id}`, newDatosl).pipe(
      map(res => this.parseDatosLModel(res))
    );
  }

  // Método para convertir la respuesta del servidor al tipo DatosLModel
  private parseDatosLModel(data: any): DatosLModel {
    // Aquí puedes implementar la lógica necesaria para convertir la respuesta del servidor al tipo DatosLModel
    return data as DatosLModel;
  }
}
