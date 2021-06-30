/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  url: any = environment.serverUrl+'parent/';

  constructor(private http: HttpClient) { }

  getAllChildrens(): Observable<any[]> {
    const headerData = {
      // eslint-disable-next-line quote-props
      'Auth': 'Bearer' + sessionStorage.getItem('token')

    };
    const reqheaders = new HttpHeaders(headerData);
    return this.http.get<any[]>(this.url + 'getChildren', { headers: reqheaders });
  }

  addChildren(studentEmail): Observable<any> {
    const headerData = {
      // eslint-disable-next-line quote-props
      'Auth': 'Bearer' + sessionStorage.getItem('token')

    };
    const reqheaders = new HttpHeaders(headerData);
    return this.http.post<any[]>(this.url + 'addStudent', studentEmail, { headers: reqheaders });
  }
}
