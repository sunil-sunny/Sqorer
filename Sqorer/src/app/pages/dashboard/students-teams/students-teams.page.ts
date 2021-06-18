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
  teamName: any;
  addTeamMember: any;
  selectedTeamId: any;

  constructor(private teamsService: TeamService) { }

  ngOnInit() {
    this.getAllTeams();
  }

  getAllTeams() {
    this.teamsService.getAllTeams().subscribe((data) => {
      this.teams = data;
      // eslint-disable-next-line no-underscore-dangle
      this.selectedTeamMembers = this.teams[0].members;
      // eslint-disable-next-line no-underscore-dangle
      this.selectedTeamId = data[0]._id;
      // eslint-disable-next-line no-underscore-dangle
      this.teamsService.getTeamMembers(this.teams[0]._id).subscribe((data1) => {
        this.selectedTeam = data1;

      });
    });
  }

  openTeam(teamId) {
    this.selectedTeamId = teamId;
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
    const newTeam = {
      'name': this.teamName,
      'avatar': 'https://image.freepik.com/free-vector/group-business-people-avatar-character_24877-57314.jpg',
      'members': this.finalizedMembers
    };
    this.teamsService.createTeam(newTeam).subscribe((data) => {
      alert('Team Created');
      this.getAllTeams();
    }, (err) => {
      alert(err.error.msg);
    });
  }

  addStudent() {
    this.addEmailFeild.push('');
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }

  addMemberToTeam() {
    // eslint-disable-next-line no-underscore-dangle
    console.log(this.selectedTeamId);
    console.log(this.addTeamMember);
    const body = {
      "teamId": this.selectedTeamId,
      "member": [this.addTeamMember]
    };
    console.log(body);
  }

}
