import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-profile-picture',
  templateUrl: './change-profile-picture.page.html',
  styleUrls: ['./change-profile-picture.page.scss'],
})
export class ChangeProfilePicturePage implements OnInit {

  files: any[];

  constructor() { }

  ngOnInit() {
  }

  onFileChange(event) {
    this.files = event.target.files;
    console.log(this.files);
  }

}
