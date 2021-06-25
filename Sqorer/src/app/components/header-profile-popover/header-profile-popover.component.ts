import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-header-profile-popover',
  templateUrl: './header-profile-popover.component.html',
  styleUrls: ['./header-profile-popover.component.scss'],
})
export class HeaderProfilePopoverComponent implements OnInit {


  constructor(private popoverController: PopoverController,
    private router: Router, private authService: AuthService,
    private alertController: AlertController) { }

  ngOnInit() { }

  logout() {

    this.authService.logout().subscribe((data) => {
      if (data.success) {
        localStorage.clear();
        this.popoverController.dismiss();
        this.router.navigate(['/home']);
      }
    }, (err) => {
      this.alert('Error', err.error.msg);
    });
  }

  goProfile() {
    this.popoverController.dismiss();
    this.router.navigate(['/dashboard/profile']);
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
