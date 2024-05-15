import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService 
{
  //base url for api
  baseUrl:string = 'https://localhost:7211/api/';
  //CTOR
  constructor(private http:HttpClient) { }

  //all operations 1- login

}
