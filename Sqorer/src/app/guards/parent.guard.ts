import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanLoad, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParentGuard implements CanLoad {

  constructor(private router: Router, public alertController: AlertController) { }

  async canLoad(): Promise<boolean> {
    const role = localStorage.getItem('role');
    if (role === 'Parent') {
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
