import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmTeamPageRoutingModule } from './confirm-team-routing.module';

import { ConfirmTeamPage } from './confirm-team.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmTeamPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ConfirmTeamPage]
})
export class ConfirmTeamPageModule {}
