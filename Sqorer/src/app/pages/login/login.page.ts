import { GoogleAuthService } from './../../services/google-auth.service';
/* eslint-disable quote-props */
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { firebase } from '@firebase/app';
import '@firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: any = '';
  password: any = '';
  spinner: any = false;
  auth = firebase.auth();

  constructor(private authService: AuthService, private router: Router, private alertController: AlertController,
    private afAuth: AngularFireAuth, private googleAuthService: GoogleAuthService) { }

  ngOnInit() { }

  login(form) {

    this.spinner = true;
    this.authService.loginUser(form.value).subscribe((data) => {

      if (data.msg) {
        this.alert('', data.msg);
      }

      if (data.token) {
        sessionStorage.setItem('token', data.token);
        this.authService.getUser().subscribe((data1) => {
          sessionStorage.setItem('role', data1.userType);
          // eslint-disable-next-line no-underscore-dangle
          sessionStorage.setItem('id', data1._id);
          sessionStorage.setItem('isPremium', data1.isPremium);
        });
        this.spinner = false;
        this.router.navigate(['/dashboard']);
      }
    }, (err) => {
      this.spinner = false;
      this.alert('Error', err.error.msg);
    });


  }

  setUserRole() {
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

  // Sign in with Gmail
  googleAuth() {
    this.googleAuthService.signInWithGoogle();
  }



  fbAuth() {
    console.log('in fb auth');
    this.authLoginFB(new firebase.auth.FacebookAuthProvider());
  }

  authLoginFB(provider) {

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result.additionalUserInfo.profile);

      })
      .catch((error) => {
        console.log(error);
      });

  }

}
