/* eslint-disable @typescript-eslint/naming-convention */
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  url: string = environment.serverUrl+'teacher/';

  constructor(private http: HttpClient) { }

  getAllStudentsUnderTeacher(): Observable<any[]> {
    const headerData = {
      // eslint-disable-next-line quote-props
      'Auth': 'Bearer' + sessionStorage.getItem('token')

    };
    const reqheaders = new HttpHeaders(headerData);
    return this.http.get<any[]>(this.url + 'getStudents', { headers: reqheaders });
  }

  addStudent(studentEmail): Observable<any> {
    const headerData = {
      // eslint-disable-next-line quote-props
      'Auth': 'Bearer' + sessionStorage.getItem('token')

    };
    const reqheaders = new HttpHeaders(headerData);
    return this.http.post<any[]>(this.url + 'addStudent', studentEmail, { headers: reqheaders });
  }

}
