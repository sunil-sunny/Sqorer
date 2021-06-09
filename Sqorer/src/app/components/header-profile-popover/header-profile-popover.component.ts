import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-header-profile-popover',
  templateUrl: './header-profile-popover.component.html',
  styleUrls: ['./header-profile-popover.component.scss'],
})
export class HeaderProfilePopoverComponent implements OnInit {


  constructor(private popoverController: PopoverController, private router: Router) { }

  ngOnInit() { }

  logout() {
    localStorage.clear();
    this.popoverController.dismiss();
    this.router.navigate(['/home']);
  }

  goProfile() {
    this.popoverController.dismiss();
    this.router.navigate(['/dashboard/profile']);
  }



}
