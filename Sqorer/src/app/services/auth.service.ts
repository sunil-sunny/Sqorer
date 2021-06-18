/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  url: any = 'http://localhost:8082/api/';
  //url: any = 'http://test-service.sqorer.com/api/';

  constructor(private http: HttpClient) { }


  loginUser(loginDetails): Observable<any> {
    const body = {

      email: loginDetails.email,
      password: loginDetails.password,

    };

    return this.http.post<any>(this.url + 'auth/', body);
  }

  saveUser(userDetails): Observable<any> {

    const headerData = {
      // eslint-disable-next-line quote-props
      'Auth': 'Bearer' + localStorage.getItem('token')

    };
    const reqheaders = new HttpHeaders(headerData);

    return this.http.put<any>(this.url + 'user/', userDetails, { headers: reqheaders });
  }

  getUser(): Observable<any> {

    const headerData = {
      // eslint-disable-next-line quote-props
      'Auth': 'Bearer' + localStorage.getItem('token')

    };
    const reqheaders = new HttpHeaders(headerData);

    return this.http.get<any>(this.url + 'auth/getUser', { headers: reqheaders });
  }

  registerUser(registerDetails): Observable<any> {

    const body = {
      firstname: registerDetails.firstName,
      lastname: registerDetails.lastName,
      email: registerDetails.email,
      password: registerDetails.password,
      userType: registerDetails.userType
    };

    return this.http.post<any>(this.url + 'user/', body);
  }

  /* private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error('its in interceptor' + error.status); // log to console instead

      alert(error.msg);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  } */
}
