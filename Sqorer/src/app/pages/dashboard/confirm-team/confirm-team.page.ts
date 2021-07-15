import { TeamService } from './../../../services/team.service';
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirm-team',
  templateUrl: './confirm-team.page.html',
  styleUrls: ['./confirm-team.page.scss'],
})
export class ConfirmTeamPage implements OnInit {

  sub: any;
  id: any;

  constructor(private activatedRoute: ActivatedRoute, private alertController: AlertController,
    private teamService: TeamService, private router: Router) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
    });
    this.acceptInvite(this.id);
  }
  acceptInvite(id: any) {
    this.teamService.acceptTeamInvite(id).subscribe((data) => {
      this.alert('Success', data.msg);
      this.router.navigate(['/dashboard']);
    }, (err) => {
      this.alert('Error', err.error.msg);
      this.router.navigate(['/dashboard']);
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
