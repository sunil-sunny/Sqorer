import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { firebase } from '@firebase/app';
import '@firebase/auth';
import { GoogleAuthProvider } from '@firebase/auth-types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  url: string = environment.serverUrl;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router,
    private alertController: AlertController) { }

  signInWithGoogle() {
    console.log('opening popup');
    firebase.auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        const googleResponse = result.additionalUserInfo.profile;
        const googleId = googleResponse;

        this.login(googleResponse).subscribe((data) => {
          if (data.token) {
            sessionStorage.setItem('token', data.token);
            this.authService.getUser().subscribe((data1) => {
              sessionStorage.setItem('role', data1.userType);
              // eslint-disable-next-line no-underscore-dangle
              sessionStorage.setItem('id', data1._id);
              sessionStorage.setItem('isPremium', data1.isPremium);
              sessionStorage.setItem('google', 'true');
            });
            this.router.navigate(['/dashboard']);
          }
        }, (err) => {
          this.alert('Error', err.error.msg);
          this.router.navigate(['/register']);
        });
      }).catch((err) => {
        this.alert('Error', err.error.msg);
      });
  }

  login(googleResponse): Observable<any> {
    return this.http.post<any>(this.url + 'auth/google', googleResponse);
  }

  register(googleResponse, userType): Observable<any> {
    return this.http.post<any>(this.url + 'auth/google/register/' + userType, googleResponse);
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

  registerUserWithGoogle(userType) {
    firebase.auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        const googleResponse = result.additionalUserInfo.profile;
        this.register(googleResponse, userType).subscribe((data) => {
          if (data.token) {
            sessionStorage.setItem('token', data.token);
            this.authService.getUser().subscribe((data1) => {
              sessionStorage.setItem('role', data1.userType);
              // eslint-disable-next-line no-underscore-dangle
              sessionStorage.setItem('id', data1._id);
              sessionStorage.setItem('isPremium', data1.isPremium);
              sessionStorage.setItem('google', 'true');
            });
            this.router.navigate(['/dashboard']);
          }
        }, (err) => {
          this.alert('Error', err.error.msg);
          this.router.navigate(['/login']);
        });
      }).catch((err) => {
        this.alert('Error', err.error.msg);
      });
  }

  logout() {
    console.log('logging out google user');
    firebase.auth().signOut().then(() => {
      this.authService.logout().subscribe((data) => {
        this.router.navigate(['/home']);
      }, (err) => {
        this.alert('Error', err.error.msg);
      });
    }).catch((error) => {
      this.alert('Error', error.error.msg);
    });
  }

}
