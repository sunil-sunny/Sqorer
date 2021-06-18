import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddStudentsPageRoutingModule } from './add-students-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { AddStudentsPage } from './add-students.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddStudentsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AddStudentsPage]
})
export class AddStudentsPageModule {}
