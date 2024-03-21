import { Injectable } from '@angular/core';
import { PerfilModel } from '../models/perfilModel';
import { map } from 'rxjs/operators'; // Cambio en la importación de 'map'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PerfilAdminService {

  constructor(private http: HttpClient) { }
  domain: string="http://localhost:3000";
  getPerfil() {
    return this.http.get<any[]>(`${this.domain}/api/perfil`).pipe( // Cambio en el tipo de retorno
      map(res => res.map(item => this.parsePerfilModel(item))) // Mapea cada elemento al tipo PerfilModel
    );
  }

  addPerfil(newPerfil: PerfilModel){
    return this.http.post<any>(`${this.domain}/api/perfil`, this.parsePerfilData(newPerfil)).pipe( // Cambio en el tipo de retorno
      map(res => this.parsePerfilModel(res)) // Mapea la respuesta al tipo PerfilModel
    );
  }

  deletePerfil(id: string){
    return this.http.delete<any>(`${this.domain}/api/perfil/${id}`).pipe( // Cambio en el tipo de retorno
      map(res => this.parsePerfilModel(res)) // Mapea la respuesta al tipo PerfilModel
    );
  }
  
  updatePerfil(newPerfil: PerfilModel) {
    return this.http.put<any>(`${this.domain}/api/perfil/${newPerfil._id}`, this.parsePerfilData(newPerfil)).pipe( // Cambio en el tipo de retorno
      map(res => this.parsePerfilModel(res)) // Mapea la respuesta al tipo PerfilModel
    );
  }

  // Método para convertir datos del PerfilModel a formato adecuado para enviar al servidor
  private parsePerfilData(perfil: PerfilModel): any {
    // Aquí puedes implementar la lógica necesaria para convertir el modelo al formato requerido por el servidor
    return perfil;
  }

  // Método para convertir la respuesta del servidor al tipo PerfilModel
  private parsePerfilModel(data: any): PerfilModel {
    // Aquí puedes implementar la lógica necesaria para convertir la respuesta del servidor al tipo PerfilModel
    return data as PerfilModel;
  }
}
