/* eslint-disable @typescript-eslint/naming-convention */
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  //url: any = 'http://localhost:8082/api/teacher/';
  url: any = 'http://test-service.sqorer.com/api/teacher/';

  constructor(private http: HttpClient) { }

  getAllStudentsUnderTeacher(): Observable<any[]> {
    const headerData = {
      // eslint-disable-next-line quote-props
      'Auth': 'Bearer' + localStorage.getItem('token')

    };
    const reqheaders = new HttpHeaders(headerData);
    return this.http.get<any[]>(this.url + 'getStudents', { headers: reqheaders });
  }

  addStudent(studentEmail): Observable<any> {
    const headerData = {
      // eslint-disable-next-line quote-props
      'Auth': 'Bearer' + localStorage.getItem('token')

    };
    const reqheaders = new HttpHeaders(headerData);
    return this.http.post<any[]>(this.url + 'addStudent', studentEmail, { headers: reqheaders });
  }

}
