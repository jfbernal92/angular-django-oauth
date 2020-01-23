import { User } from './../../models/user.model';
import { environment } from './../../../environments/environment';
import { RestRoutes } from './../../config/rest-routes.config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${environment.host}${RestRoutes.USERS}`, httpOptions);
  }
}
