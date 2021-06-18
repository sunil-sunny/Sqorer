import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentsTeamsPageRoutingModule } from './students-teams-routing.module';

import { StudentsTeamsPage } from './students-teams.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentsTeamsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [StudentsTeamsPage]
})
export class StudentsTeamsPageModule {}
