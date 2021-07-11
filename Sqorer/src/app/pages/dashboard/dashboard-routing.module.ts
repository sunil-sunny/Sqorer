import { TeacherGuard } from './../../guards/teacher.guard';
import { ParentGuard } from './../../guards/parent.guard';
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
    loadChildren: () => import('./subscription/subscription.module').then(m => m.SubscriptionPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'add-students',
    loadChildren: () => import('./add-students/add-students.module').then(m => m.AddStudentsPageModule),
    canLoad: [ParentGuard]
  },
  {
    path: 'students-teams',
    loadChildren: () => import('./students-teams/students-teams.module').then(m => m.StudentsTeamsPageModule)
  },
  {
    path: 'teacher-student',
    loadChildren: () => import('./teacher-student/teacher-student.module').then(m => m.TeacherStudentPageModule),
    canLoad: [TeacherGuard]
  },  {
    path: 'change-profile-picture',
    loadChildren: () => import('./change-profile-picture/change-profile-picture.module').then( m => m.ChangeProfilePicturePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule { }
