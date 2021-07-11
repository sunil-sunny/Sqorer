import { ChangeProfilePicturePage } from './../change-profile-picture/change-profile-picture.page';

import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';

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
  spinner: any = false;

  constructor(private authService: AuthService, private alertController: AlertController, private modalController: ModalController, 
    private popOverController: PopoverController) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {

    this.authService.getUser().subscribe((data1) => {
      sessionStorage.setItem('role', data1.userType);
      // eslint-disable-next-line no-underscore-dangle
      sessionStorage.setItem('id', data1._id);
    });

    this.authService.getUser().subscribe((user) => {
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
    this.spinner = true;
    this.authService.saveUser(form.value).subscribe(async (user) => {
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
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Success',
        subHeader: '',
        message: 'Profile has been updated',
        buttons: ['OK']
      });
      this.spinner = false;
      await alert.present();
    });
  }

  async changeProfilePicture() {
    const modal = await this.popOverController.create({
      component: ChangeProfilePicturePage
    });
    return await modal.present();
  }

}
