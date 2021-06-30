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
  premiumName: any = '';
  premiumCost: any = '';


  constructor() {
    this.setupConstants();
  }

  ngOnInit() {
    console.log(sessionStorage.getItem('role'));
    this.setupConstants();
  }

  setupConstants() {
    if (sessionStorage.getItem('role') === 'Student') {
      this.premiumName = SubscriptionConstants.premiumStudentPlan().planName;
      this.premiumCost = SubscriptionConstants.premiumStudentPlan().cost;
      this.freeFeatures = SubscriptionConstants.freeStudentFeatures();
      this.premiumFeatures = SubscriptionConstants.premiumStudentFeatures();
    }

    if (sessionStorage.getItem('role') === 'Teacher') {
      this.premiumName = SubscriptionConstants.premiumTeacherPlan().planName;
      this.premiumCost = SubscriptionConstants.premiumTeacherPlan().cost;
      this.freeFeatures = SubscriptionConstants.freeTeacherFeatures();
      this.premiumFeatures = SubscriptionConstants.premiumTeacherFeatures();
    }

    if (sessionStorage.getItem('role') === 'Parent') {
      this.premiumName = SubscriptionConstants.premiumParentPlan().planName;
      this.premiumCost = SubscriptionConstants.premiumParentPlan().cost;
      this.freeFeatures = SubscriptionConstants.freeParentFeatures();
      this.premiumFeatures = SubscriptionConstants.premiumParentFeatures();
    }
  }


}
