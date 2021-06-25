import { AlertController } from '@ionic/angular';
/* eslint-disable quote-props */
import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teacher-student',
  templateUrl: './teacher-student.page.html',
  styleUrls: ['./teacher-student.page.scss'],
})
export class TeacherStudentPage implements OnInit {

  addEmailFeild: any[] = ['', '', '', '', ''];
  allTeams: any[];
  selectedTeamId: any;
  students: any[];
  finalizedMembers: any[] = [];

  constructor(private teamsService: TeamService, private alertController: AlertController) { }

  ngOnInit() {
    this.getAllTeams();
    this.getAllStudents();
  }

  getAllStudents() {
    this.teamsService.getAllStudentsWithTeam().subscribe((data) => {
      this.students = data;
    }, (err) => {
      this.alert('Error',err.error.msg);
    });
  }
  getAllTeams() {
    this.teamsService.getAllTeams().subscribe((data) => {
      this.allTeams = data;
    }, (err) => {
      this.alert('Error',err.error.msg);
    });
  }
  addStudent() {
    this.addEmailFeild.push('');
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }

  saveStudent() {
    const filtered = this.addEmailFeild.filter((element) => element);

    filtered.forEach(element => {
      this.finalizedMembers.push(element);
    });

    if (this.finalizedMembers.length === 0) {
      this.alert('','Enter email to proceed');
    } else {

      const newTeam = {
        'teamId': this.selectedTeamId,
        'members': this.finalizedMembers
      };

      this.teamsService.addMemberToTeam(newTeam).subscribe((data) => {
        if (data.msg) {
          this.alert('Success',data.msg);
          this.addEmailFeild = ['', '', '', '', ''];
          this.selectedTeamId = '';
          this.getAllTeams();
          this.getAllStudents();
        }
      }, (err) => {
        this.alert('Error', err.error.msg);
      });
    }

  }

  async alert(header, msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header,
      subHeader: '',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }
}
