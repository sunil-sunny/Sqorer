import { ProfilePage } from './profile/profile.page';
import { SubscriptionPage } from './subscription/subscription.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'subscription',
        component: SubscriptionPage
      },
      {
        path: 'profile',
        component: ProfilePage
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule { }
