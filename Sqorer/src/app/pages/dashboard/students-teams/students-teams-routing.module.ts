import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentsTeamsPage } from './students-teams.page';

const routes: Routes = [
  {
    path: '',
    component: StudentsTeamsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsTeamsPageRoutingModule {}
