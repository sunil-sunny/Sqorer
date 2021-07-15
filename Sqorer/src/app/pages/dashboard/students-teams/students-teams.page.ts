import { AlertController } from '@ionic/angular';
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
  spinner: any = false;
  loadTeamsSpinner: any = false;
  loadEachTeamSpinner: any = false;

  constructor(private teamsService: TeamService, private alertController: AlertController) { }

  ngOnInit() {
    this.teamName = '';
    this.addTeamMember = '';
    this.getAllTeams();
  }

  getAllTeams() {

    this.loadTeamsSpinner = true;
    if (sessionStorage.getItem('role') === 'Student') {

      this.teamsService.getStudentTeams().subscribe((data) => {
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
    } else {
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

    this.loadTeamsSpinner = false;
  }

  openTeam(teamId, name) {
    this.loadEachTeamSpinner = true;
    this.selectedTeamId = teamId;
    this.selectedTeamName = name;
    this.teamsService.getTeamMembers(teamId).subscribe((data) => {
      this.selectedTeam = data;
      this.loadEachTeamSpinner = false;
    });
  }

  createTeam() {
    console.log(sessionStorage.getItem('isPremium'));
    console.log('create team is working');
    this.spinner = true;
    const filtered = this.addEmailFeild.filter((element) => element);
    const filteredOne = new Set(filtered);
    console.log(filteredOne);

    filteredOne.forEach(element => {
      const member = {
        'email': element
      };
      this.finalizedMembers.push(member);
    });

    this.finalizedMembers.forEach((e) => console.log(e));
    if (this.finalizedMembers.length === 0 || this.teamName.length === 0) {
      this.spinner = false;
      this.alert('Warning', 'Enter required team details to proceed');
    } else {

      let isEligible = false;
      const newTeam = {
        'name': this.teamName,
        'avatar': 'https://image.freepik.com/free-vector/group-business-people-avatar-character_24877-57314.jpg',
        'members': this.finalizedMembers
      };

      if (sessionStorage.getItem('role') === 'Teacher') {
        console.log('eligible');
        isEligible = true;
      }

      if (sessionStorage.getItem('role') === 'Student') {
        if (sessionStorage.getItem('isPremium') === 'true') {
          console.log('eligible');
          isEligible = true;
        }
      }

      console.log(isEligible);

      if (isEligible) {
        this.teamsService.createTeam(newTeam).subscribe((data) => {
          this.alert('Success', 'Team Created');
          this.getAllTeams();
          this.addEmailFeild = ['', '', '', '', '', ''];
          this.teamName = '';
          this.finalizedMembers = [];
          this.spinner = false;
        }, (err) => {
          this.addEmailFeild = ['', '', '', '', '', ''];
          this.teamName = '';
          this.finalizedMembers = [];
          this.alert('Error', err.error.msg);
          this.spinner = false;
        });
      } else {
        this.spinner = false;
        this.alert('Warning', 'you are not eligible to create a team');
      }

    }
  }

  addStudent() {
    this.addEmailFeild.push('');
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }

  async alert(status, msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: status,
      subHeader: '',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  addMemberToTeam() {

    this.spinner = true;
    if (this.addTeamMember.length === 0) {
      this.spinner = false;
      this.alert('', 'Enter email to proceed');
    } else {

      const body = {
        "teamId": this.selectedTeamId,
        "members": [this.addTeamMember]
      };
      this.teamsService.addMemberToTeam(body).subscribe((data) => {
        if (data.msg) {
          this.alert('Success', data.msg);
          this.getAllTeams();
          this.addTeamMember = '';
        }
        this.spinner = false;
      }, (err) => {
        this.alert('error', err.error.msg);
        this.spinner = false;
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
        this.alert("Success", data.msg);
        this.getAllTeams();
      }
    }, (err) => {
      this.alert('Error', err);
    });
  }
}
