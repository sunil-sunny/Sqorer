import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { HeaderProfilePopoverComponent } from '../header-profile-popover/header-profile-popover.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {


  firstName: any;
  profilePic: any;
  constructor(private popOverController: PopoverController, private authService: AuthService) { }

  ngOnInit() {
    console.log('header');
    this.authService.getUser().subscribe((data) => {
      this.firstName = data.firstname;
      this.profilePic= data.profile;
    });
  }

  async openProfilePopOver(event: any) {

    const profPopOver = await this.popOverController.create({
      component: HeaderProfilePopoverComponent,
      event,
      translucent: true
    });

    return await profPopOver.present();
  }

  isWork() {
    console.log('is work');
  }

}
