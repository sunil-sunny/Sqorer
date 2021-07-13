import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-home-header-popver',
  templateUrl: './home-header-popver.component.html',
  styleUrls: ['./home-header-popver.component.scss'],
})
export class HomeHeaderPopverComponent implements OnInit {

  constructor(private router: Router, private popover: PopoverController) { }

  ngOnInit() {}

  openSignUp(){
    this.popover.dismiss();
    this.router.navigate(['/register']);
  }

  openSignIn(){
    this.popover.dismiss();
    this.router.navigate(['/login']);
  }

}
