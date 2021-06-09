import { Component, OnInit } from '@angular/core';
import { SubscriptionConstants } from 'src/app/constants/subscription.constants';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {

  freeFeatures: any[];
  premiumFeatures: any[];


  constructor() {
    this.setupConstants();
  }

  ngOnInit() {
    this.setupConstants();
  }

  setupConstants() {
    this.freeFeatures = SubscriptionConstants.freeFeatures();
    this.premiumFeatures = SubscriptionConstants.premiumFeatures();
  }


}
