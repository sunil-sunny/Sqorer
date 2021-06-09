import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-banner',
  templateUrl: './profile-banner.component.html',
  styleUrls: ['./profile-banner.component.scss'],
})
export class ProfileBannerComponent implements OnInit {

  @Input()
  viewButton: boolean;

  constructor() { }

  ngOnInit() { }

}
