import { ParentService } from './../../../services/parent.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.page.html',
  styleUrls: ['./add-students.page.scss'],
})
export class AddStudentsPage implements OnInit {
  children: any[];

  constructor(private parentService: ParentService, private alertController: AlertController) { }

  ngOnInit() {
    this.getAllChildern();
  }

  getAllChildern() {
    this.parentService.getAllChildrens().subscribe((data) => this.children = data);
  }

  addChild(form) {
    this.parentService.addChildren(form.value).subscribe(async (data) => {
      if (data.msg) {

        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Success',
          subHeader: '',
          message: data.msg,
          buttons: ['OK']
        });

        await alert.present();

        this.getAllChildern();
      }
    });
  }

}
