import { Injectable } from '@angular/core';
import { User } from '../user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  authenticateUser(user:User){
    return this.http.post('http://localhost:3000/auth/v1/',user);
  }

  setBearerToken(token:string){
    localStorage.setItem('bearer-token',token);
  }

  getBearerToken(){
    return localStorage.getItem('bearer-token');
  } 

  isUserAuthenticated(token): Promise<boolean> {
    return this.http.post(`http://localhost:3000/auth/v1/isAuthenticated`, {}, {
       headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
     })
     .map((res) => res['isAuthenticated'])
     .toPromise();
    }

}