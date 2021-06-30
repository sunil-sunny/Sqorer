import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: any = '';
  password: any = '';

  constructor(private authService: AuthService, private router: Router, private alertController: AlertController) { }

  ngOnInit() { }

  login(form) {

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
        this.router.navigate(['/dashboard']);
      }
    }, (err) => {
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

}
