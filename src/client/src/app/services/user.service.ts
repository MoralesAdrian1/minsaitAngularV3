import { Injectable } from '@angular/core';
import { userModel } from '../models/userModel';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  domain: string="http://localhost:3000";
  getUser() {
    return this.http.get<userModel[]>(`${this.domain}/api/user`).pipe(
      map(res => res)
    );
  }

  addUser(newUser: userModel){
    return this.http.post<userModel>(`${this.domain}/api/user`,newUser).pipe(
      map(res => res)
      );
  }

  deleteUser(id: string){
    return this.http.delete<userModel>(`${this.domain}/api/user/${id}`).pipe(
      map(res => res)
      );
  }
  updateUser(newUser: userModel) {
    return this.http.put(`${this.domain}/api/user/${newUser._id}`, newUser).pipe(
      map(res => res)
    );
  }
}
