import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  isOtpSent: boolean;
  email: string;
  otp: number;
  password: string;
  resetSpinner: any = true;


  constructor(private authService: AuthService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.isOtpSent = false;
  }

  sendOtp() {

    this.resetSpinner = true;
    this.authService.sendOtp(this.email).subscribe((data) => {
      if (data.msg) {
        this.alert('', data.msg);
        this.isOtpSent = true;
      }
    }, (err) => {
      this.alert('Error', err.error.msg);
    });
    this.resetSpinner = false;
  }

  resetPassword() {
    this.resetSpinner = true;
    this.authService.resetPassword(this.email, this.password, this.otp).subscribe((data) => {
      if (data.msg) {
        this.alert('', data.msg);
        this.router.navigate(['/login']);
      }
    }, (err) => {
      this.alert('Error', err.error.msg);
    });
    this.resetSpinner = false;
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
