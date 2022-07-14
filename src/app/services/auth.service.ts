import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../shared/data/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseAPIurl: string;
  constructor(private httpClient:HttpClient) { 
    this.baseAPIurl=environment.baseUrl
  }
  signup(object:any) {
   
    return this.httpClient.post(this.baseAPIurl + "Account/register" ,object);
  }
  login(object:any) {
   
    return this.httpClient.post(this.baseAPIurl + "Account/login" ,object);
  }
  UserCheck(obj: any){
    return this.httpClient.get(this.baseAPIurl + 'Account/usernamecheck?username=' + obj);
  }
  getWishListItem(object: any) {
    return this.httpClient.post<User[]>(this.baseAPIurl + "Account/login" ,object);
  }

  forgotPassword(object:any) {
   
    return this.httpClient.post(this.baseAPIurl + "Account/forgotpassword" ,object);
  }
}

