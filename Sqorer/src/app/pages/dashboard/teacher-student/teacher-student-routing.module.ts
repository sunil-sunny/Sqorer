import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherStudentPage } from './teacher-student.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherStudentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherStudentPageRoutingModule {}
