import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from './users.interface';
@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private API_BASE_PATH = "http://localhost:4200/api/"
  constructor(private http:HttpClient) { }

  getUsers(){
   return this.http.get(this.API_BASE_PATH+"users")
  }

  getUser(id:number){
    return this.http.get(`${this.API_BASE_PATH}users/${id}`)
   }

   addUser(user:Users){
    return this.http.post(`${this.API_BASE_PATH}users`,user)
   }

   updateUser(user:Users){
    return this.http.put(`${this.API_BASE_PATH}users/${user.id}`,user)
   }

   deleteUser(id:number){
    return this.http.delete(`${this.API_BASE_PATH}users/${id}`)
   }
}
