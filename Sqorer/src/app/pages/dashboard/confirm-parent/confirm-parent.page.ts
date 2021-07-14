import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ParentService } from './../../../services/parent.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-parent',
  templateUrl: './confirm-parent.page.html',
  styleUrls: ['./confirm-parent.page.scss'],
})
export class ConfirmParentPage implements OnInit {

  parentDetails: any;

  constructor(private parentService: ParentService, private alertController: AlertController, private router: Router) { }

  ngOnInit() {
    this.getPendingRequest();
  }

  getPendingRequest() {
    this.parentService.getPendingRequestForStudent().subscribe((data) => {
      this.parentDetails = data;
      console.log(this.parentDetails);
    }, (err) => {
      console.log(err);
      this.alert('Error', err.error.msg);
    });
  }

  accept() {
    this.parentService.acceptParent().subscribe((data) => {
      this.alert('Success', data.msg);
      this.getPendingRequest();
      this.router.navigate(['/dashboard']);
    }, (err) => {
      console.log(err);
      this.alert('Error', err.error.msg);
      this.router.navigate(['/dashboard']);
    });
  }

  decline() {
    this.parentService.declineParent().subscribe((data) => {
      this.alert('Success', data.msg);
      this.getPendingRequest();
      this.router.navigate(['/dashboard']);
    }, (err) => {
      console.log(err);
      this.alert('Error', err.error.msg);
    });
  }


  async alert(header, msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header,
      subHeader: '',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

}
