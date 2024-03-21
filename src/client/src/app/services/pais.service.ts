import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { paisModel } from '../models/paisModel';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http: HttpClient) { }
  domain: string="http://localhost:3000";
  getPais() {
    return this.http.get<paisModel[]>(`${this.domain}/api/pais`).pipe(
      map(res => res)
    );
  }

  addPais(newPais: paisModel){
    return this.http.post<paisModel>(`${this.domain}/api/pais`,newPais).pipe(
      map(res => res)
      );
  }

  deletePais(id: string){
    return this.http.delete<paisModel>(`${this.domain}/api/pais/${id}`).pipe(
      map(res => res)
      );
  }
  updatePais(newPais: paisModel) {
    return this.http.put(`${this.domain}/api/pais/${newPais._id}`, newPais).pipe(
      map(res => res)
    );
  }
}
