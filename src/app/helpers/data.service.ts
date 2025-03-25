import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Users } from './users.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {
  
  constructor() { }
  createDb(){
    let users:Users[] = [
      {id:100,title:"Mr",firstName:"Rahul",lastName:"Sharma",email:"rsharma@.com",dob:"01-01-1990",password:"12345678",acceptTerm:true},
      {id:101,title:"Mr",firstName:"Ajeet",lastName:"Singh",email:"asingh@.com",dob:"01-01-1990",password:"12345678",acceptTerm:true},
      {id:102,title:"Mr",firstName:"Rohit",lastName:"Sharma",email:"rsharma@.com",dob:"01-01-1990",password:"12345678",acceptTerm:true},
    ];
    return {users};
  }
}
