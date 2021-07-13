import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmParentPage } from './confirm-parent.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmParentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmParentPageRoutingModule {}
