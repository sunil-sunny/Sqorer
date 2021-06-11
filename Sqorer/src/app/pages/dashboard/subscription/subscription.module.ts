import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SubscriptionPageRoutingModule } from './subscription-routing.module';
import { SubscriptionPage } from './subscription.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscriptionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SubscriptionPage]
})
export class SubscriptionPageModule {}
