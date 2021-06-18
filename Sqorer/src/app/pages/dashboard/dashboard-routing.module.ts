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
  },
  {
    path: 'add-students',
    loadChildren: () => import('./add-students/add-students.module').then( m => m.AddStudentsPageModule)
  },
  {
    path: 'students-teams',
    loadChildren: () => import('./students-teams/students-teams.module').then( m => m.StudentsTeamsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule { }
