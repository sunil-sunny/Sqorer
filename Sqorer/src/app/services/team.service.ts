/* eslint-disable @typescript-eslint/naming-convention */
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {


  url: any = 'http://localhost:8082/api/team/';
  //url: any = 'http://test-service.sqorer.com/api/team';

  constructor(private http: HttpClient) { }

  getAllTeams(): Observable<any[]> {

    const headerData = {
      // eslint-disable-next-line quote-props
      'Auth': 'Bearer' + localStorage.getItem('token')

    };
    const reqheaders = new HttpHeaders(headerData);
    return this.http.get<any[]>(this.url + 'getAllTeams/all', { headers: reqheaders });

  }

  getTeamMembers(id): Observable<any[]> {
    const headerData = {
      // eslint-disable-next-line quote-props
      'Auth': 'Bearer' + localStorage.getItem('token')

    };
    const reqheaders = new HttpHeaders(headerData);
    return this.http.get<any[]>(this.url + 'getTeamMembers/' + id, { headers: reqheaders });
  }

  createTeam(team): Observable<any[]>{
    const headerData = {
      // eslint-disable-next-line quote-props
      'Auth': 'Bearer' + localStorage.getItem('token')

    };
    const reqheaders = new HttpHeaders(headerData);
    return this.http.post<any[]>(this.url + 'createTeam',team, { headers: reqheaders });
  }
}
