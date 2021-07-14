import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanLoad {

  constructor(private router: Router, private alertController: AlertController) { }

  async canLoad(): Promise<boolean> {
    const role = sessionStorage.getItem('role');
    if (role === 'Student') {
      return true;
    } else {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Un-Authorized',
        subHeader: '',
        message: 'You are not authorized to enter this page, redirecting to dashboard',
        buttons: ['OK']
      });

      await alert.present();
      this.router.navigateByUrl('/dashboard', { replaceUrl: true });
      return false;
    }
  }

}
