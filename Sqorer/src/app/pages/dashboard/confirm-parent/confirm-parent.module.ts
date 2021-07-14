import { ComponentsModule } from 'src/app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmParentPageRoutingModule } from './confirm-parent-routing.module';

import { ConfirmParentPage } from './confirm-parent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmParentPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ConfirmParentPage]
})
export class ConfirmParentPageModule {}
