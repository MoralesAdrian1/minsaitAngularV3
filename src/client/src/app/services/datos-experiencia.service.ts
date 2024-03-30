import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatosExModel } from '../models/datosExperienciaModel';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosExperienciaService {

  constructor(private http: HttpClient) { }
  domain: string = "http://localhost:3000";

  getDatosEx() {
    return this.http.get<DatosExModel[]>(`${this.domain}/api/datosEx`).pipe(
      map(res => res.map(item => this.parseDatosExModel(item)))
    );
  }

  addDatosEx(newDatosEx: DatosExModel) {
    return this.http.post<DatosExModel>(`${this.domain}/api/datosEx`, newDatosEx).pipe(
      map(res => this.parseDatosExModel(res))
    );
  }

  deleteDatosEx(id: string) {
    return this.http.delete<DatosExModel>(`${this.domain}/api/datosEx/${id}`).pipe(
      map(res => this.parseDatosExModel(res))
    );
  }

  updateDatosEx(newDatosEx: DatosExModel) {
    return this.http.put<DatosExModel>(`${this.domain}/api/datosEx/${newDatosEx._id}`, newDatosEx).pipe(
      map(res => this.parseDatosExModel(res))
    );
  }

  // Método para convertir la respuesta del servidor al tipo DatosLModel
  private parseDatosExModel(data: any): DatosExModel {
    // Aquí puedes implementar la lógica necesaria para convertir la respuesta del servidor al tipo DatosLModel
    return data as DatosExModel;
  }
}
