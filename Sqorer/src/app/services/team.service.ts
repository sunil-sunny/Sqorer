/* eslint-disable @typescript-eslint/naming-convention */
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { identifierName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  url: string = environment.serverUrl + 'team/';

  constructor(private http: HttpClient) { }

  getAllTeams(): Observable<any[]> {

    const headerData = {
      // eslint-disable-next-line quote-props
      'Auth': 'Bearer' + sessionStorage.getItem('token')

    };
    const reqheaders = new HttpHeaders(headerData);
    return this.http.get<any[]>(this.url + 'getAllTeams/all', { headers: reqheaders });

  }

  getTeamMembers(id): Observable<any[]> {
    const headerData = {
      // eslint-disable-next-line quote-props
      'Auth': 'Bearer' + sessionStorage.getItem('token')

    };
    const reqheaders = new HttpHeaders(headerData);
    return this.http.get<any[]>(this.url + 'getTeamMembers/' + id, { headers: reqheaders });
  }

  createTeam(team): Observable<any[]> {
    const headerData = {
      // eslint-disable-next-line quote-props
      'Auth': 'Bearer' + sessionStorage.getItem('token')

    };
    const reqheaders = new HttpHeaders(headerData);
    return this.http.post<any[]>(this.url + 'createTeam', team, { headers: reqheaders });
  }

  addMemberToTeam(body): Observable<any> {
    const headerData = {
      // eslint-disable-next-line quote-props
      'Auth': 'Bearer' + sessionStorage.getItem('token')

    };
    console.log('body is ' + body);
    const reqheaders = new HttpHeaders(headerData);
    return this.http.post<any[]>(this.url + 'addMembers', body, { headers: reqheaders });
  }

  getAllStudentsWithTeam(): Observable<any[]> {
    const headerData = {
      // eslint-disable-next-line quote-props
      'Auth': 'Bearer' + sessionStorage.getItem('token')

    };
    const reqheaders = new HttpHeaders(headerData);
    return this.http.get<any[]>(this.url + 'getAllStudentsWithTeams', { headers: reqheaders });
  }


  getStudentTeams(): Observable<any[]> {
    const headerData = {
      // eslint-disable-next-line quote-props
      'Auth': 'Bearer' + sessionStorage.getItem('token')

    };
    const reqheaders = new HttpHeaders(headerData);
    return this.http.get<any[]>(this.url + 'getStudentTeams', { headers: reqheaders });
  }

  removeMember(body): Observable<any> {
    const headerData = {
      // eslint-disable-next-line quote-props
      'Auth': 'Bearer' + sessionStorage.getItem('token')

    };
    const reqheaders = new HttpHeaders(headerData);
    return this.http.put<any>(this.url + 'removeMembers', body, { headers: reqheaders });
  }

  acceptTeamInvite(id: any): Observable<any> {
    const headerData = {
      // eslint-disable-next-line quote-props
      'Auth': 'Bearer' + sessionStorage.getItem('token')

    };
    return this.http.post<any>(this.url + '/acceptStudent/' + id, null, { headers: headerData });
  }
}
