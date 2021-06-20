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

  constructor(private teamsService: TeamService) { }

  ngOnInit() {
    this.getAllTeams();
    this.getAllStudents();
  }

  getAllStudents() {
    this.teamsService.getAllStudentsWithTeam().subscribe((data) => {
      this.students = data;
      console.log(data);
    }, (err) => {
      alert(err);
    });
  }
  getAllTeams() {
    this.teamsService.getAllTeams().subscribe((data) => {
      this.allTeams = data;
      console.log(data);
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

  saveStudent() {
    const filtered = this.addEmailFeild.filter((element) => element);

    filtered.forEach(element => {
      this.finalizedMembers.push(element);
    });

    if (this.finalizedMembers.length === 0) {
      alert('Enter email to proceed');
    } else {

      const newTeam = {
        'teamId': this.selectedTeamId,
        'members': this.finalizedMembers
      };

      this.teamsService.addMemberToTeam(newTeam).subscribe((data) => {
        if (data.msg) {
          alert(data.msg);
          this.addEmailFeild = ['', '', '', '', ''];
          this.selectedTeamId = '';
          this.getAllTeams();
          this.getAllStudents();
        }
      }, (err) => {
        alert(err.error.msg);
      });
    }

  }
}
