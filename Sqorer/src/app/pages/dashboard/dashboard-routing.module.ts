import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
  },
  {
    path: 'subscription',
    loadChildren: ()=> import('./subscription/subscription.module').then(m => m.SubscriptionPageModule)
  },
  {
    path: 'profile',
    loadChildren: ()=> import('./profile/profile.module').then(m => m.ProfilePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule { }
