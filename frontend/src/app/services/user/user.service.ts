import { User } from './../../models/user.model';
import { environment } from './../../../environments/environment';
import { RestRoutes } from './../../config/rest-routes.config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.host}${RestRoutes.USERS}`, httpOptions);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${environment.host}${RestRoutes.USERS}/${id}`, httpOptions);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.host}${RestRoutes.USERS}`, user, httpOptions);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${environment.host}${RestRoutes.USERS}/${user.id}`,  user, httpOptions);
  }

  deleteUser(user: User): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(`${environment.host}${RestRoutes.USERS}/${user.id}`, httpOptions);
  }
}
