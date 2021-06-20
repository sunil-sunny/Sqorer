import { ComponentsModule } from 'src/app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherStudentPageRoutingModule } from './teacher-student-routing.module';

import { TeacherStudentPage } from './teacher-student.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherStudentPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TeacherStudentPage]
})
export class TeacherStudentPageModule {
}
