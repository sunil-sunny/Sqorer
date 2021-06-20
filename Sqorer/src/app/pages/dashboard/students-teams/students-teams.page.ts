/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable quote-props */
import { TeamService } from './../../../services/team.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-students-teams',
  templateUrl: './students-teams.page.html',
  styleUrls: ['./students-teams.page.scss'],
})

export class StudentsTeamsPage implements OnInit {

  teams: any[];
  selectedTeam: any;
  limit: any = 4;
  selectedTeamMembers: any[];
  addEmailFeild: any[] = ['', '', '', '', '', ''];
  finalizedMembers: any[] = [];
  teamName: string;
  addTeamMember: any;
  selectedTeamId: any;
  selectedTeamName: any;

  constructor(private teamsService: TeamService) { }

  ngOnInit() {
    this.teamName = '';
    this.addTeamMember = '';
    this.getAllTeams();
  }

  getAllTeams() {
    this.teamsService.getAllTeams().subscribe((data) => {
      this.teams = data;
      // eslint-disable-next-line no-underscore-dangle
      this.selectedTeamMembers = this.teams[0].members;
      // eslint-disable-next-line no-underscore-dangle
      this.selectedTeamId = data[0]._id;
      this.selectedTeamName = data[0].name;
      // eslint-disable-next-line no-underscore-dangle
      this.teamsService.getTeamMembers(this.teams[0]._id).subscribe((data1) => {
        this.selectedTeam = data1;

      });
    });
  }

  openTeam(teamId,name) {
    this.selectedTeamId = teamId;
    this.selectedTeamName = name;
    this.teamsService.getTeamMembers(teamId).subscribe((data) => {
      this.selectedTeam = data;
    });
  }

  createTeam() {
    console.log('create team is working');
    const filtered = this.addEmailFeild.filter((element) => element);
    filtered.forEach(element => {
      const member = {
        'email': element
      };
      this.finalizedMembers.push(member);
    });

    if (this.finalizedMembers.length === 0 || this.teamName.length === 0) {
      alert('Enter required team details to proceed');
    } else {

      const newTeam = {
        'name': this.teamName,
        'avatar': 'https://image.freepik.com/free-vector/group-business-people-avatar-character_24877-57314.jpg',
        'members': this.finalizedMembers
      };
      this.teamsService.createTeam(newTeam).subscribe((data) => {
        alert('Team Created');
        this.getAllTeams();
        this.addEmailFeild = ['', '', '', '', '', ''];
        this.teamName = '';
        this.finalizedMembers = [];
      }, (err) => {
        alert(err.error.msg);
      });
    }
  }

  addStudent() {
    this.addEmailFeild.push('');
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }

  addMemberToTeam() {

    if (this.addTeamMember.length === 0) {
      alert('Enter email to proceed');
    } else {

      const body = {
        "teamId": this.selectedTeamId,
        "members": [this.addTeamMember]
      };
      this.teamsService.addMemberToTeam(body).subscribe((data) => {
        if (data.msg) {
          alert(data.msg);
          this.getAllTeams();
          this.addTeamMember = '';
        }

      }, (err) => {
        console.log(err);
      });
    }
  }

  removeMember(email) {
    console.log('removed email is ' + email);
    const body = {
      'teamId': this.selectedTeamId,
      'member': email
    };
    this.teamsService.removeMember(body).subscribe((data) => {
      if (data.msg) {
        alert(data.msg);
        this.getAllTeams();
      }
    }, (err) => {
      alert(err);
    });
  }
}
