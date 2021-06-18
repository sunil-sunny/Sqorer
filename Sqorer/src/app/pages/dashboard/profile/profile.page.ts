
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from './user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {

  user: User;

  userType: any = '';
  firstname: any = '';
  lastname: any = '';
  title: any = '';
  googleId: any = '';
  email: any = '';
  isOnline: any = '';
  lastLogin: any = '';
  isPremium: any = '';
  lastDatePaid: any = '';
  address: any = '';
  city: any = '';
  country: any = '';
  zipCode: any = '';
  phone: any = '';
  profile: any = '';
  school: any = '';
  certifications: any = '';
  experiance: any = '';
  facebookLink: any = '';
  linkedinLink: any = '';
  parentEmail: any = '';
  grade: any = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {

    this.authService.getUser().subscribe((data1) => {
      console.log(data1);
      console.log('logged in and after');
      console.log(data1.userType);
      localStorage.setItem('role', data1.userType);
      // eslint-disable-next-line no-underscore-dangle
      localStorage.setItem('id', data1._id);
      // eslint-disable-next-line no-underscore-dangle
      console.log(data1._id);
    });

    this.authService.getUser().subscribe((user) => {
      console.log(user);
      this.user = user;
      this.userType = user.userType;
      this.firstname = user.firstname;
      this.lastname = user.lastname;
      this.title = user.title;
      this.googleId = user.googleId;
      this.email = user.email;
      this.address = user.address;
      this.city = user.city;
      this.country = user.country;
      this.zipCode = user.zipCode;
      this.phone = user.phone;
      this.profile = user.profile;
      this.school = user.school;
      this.certifications = user.certifications;
      this.experiance = user.experiance;
      this.facebookLink = user.facebookLink;
      this.linkedinLink = user.linkedinLink;
      this.parentEmail = user.parentEmail;
      this.grade = user.grade;

    });


  }

  saveUser(form) {
    this.authService.saveUser(form.value).subscribe((user) => {
      this.user = user;
      this.userType = user.userType;
      this.firstname = user.firstname;
      this.lastname = user.lastname;
      this.title = user.title;
      this.googleId = user.googleId;
      this.email = user.email;
      this.address = user.address;
      this.city = user.city;
      this.country = user.country;
      this.zipCode = user.zipCode;
      this.phone = user.phone;
      this.profile = user.profile;
      this.school = user.school;
      this.certifications = user.certifications;
      this.experiance = user.experiance;
      this.facebookLink = user.facebookLink;
      this.linkedinLink = user.linkedinLink;
      this.parentEmail = user.parentEmail;
      this.grade = user.grade;
      alert('profile updated');
    });
  }

}
