import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  firstName: any = '';
  lastName: any = '';
  email: any = '';
  password: any = '';
  userType: any = '';

  constructor(private authService: AuthService, private router: Router, private alertController: AlertController) { }

  ngOnInit() { }

  register(form) {

    this.authService.registerUser(form.value).subscribe((data) => {

      if (data.msg) {
        this.alert('', data.msg);
      }

      if (data.token) {
        sessionStorage.setItem('token', data.token);
        this.router.navigate(['/dashboard']);
      }
    });
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
