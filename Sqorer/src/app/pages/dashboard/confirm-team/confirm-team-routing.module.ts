import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmTeamPage } from './confirm-team.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmTeamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmTeamPageRoutingModule {}
