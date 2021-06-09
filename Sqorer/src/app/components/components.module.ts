import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { HomeHeaderPopverComponent } from './home-header-popver/home-header-popver.component';
import { HeaderProfilePopoverComponent } from './header-profile-popover/header-profile-popover.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileBannerComponent } from './profile-banner/profile-banner.component';



@NgModule({
  declarations: [
    HeaderComponent,
    HeaderProfilePopoverComponent,
    HomeHeaderPopverComponent,
    ProfileBannerComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    HeaderComponent,
    HeaderProfilePopoverComponent,
    HomeHeaderPopverComponent,
    ProfileBannerComponent
  ]
})
export class ComponentsModule { }
