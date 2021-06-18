import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, PopoverController } from '@ionic/angular';
import { HomeHeaderPopverComponent } from 'src/app/components/home-header-popver/home-header-popver.component';
import { WindowService } from '../../services/window.service';
import { HomePageConstants } from '../../constants/home.pageconstants';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('slideWithNav2', { static: false }) slideWithNav2: IonSlides;

  homeImage: string;
  sectionThreeDetails: any[];
  sectionFourDetails: any[];

  slideOptsTwo = {
    initialSlide: 1,
    slidesPerView:  3,
    shouldLockSwipes: 1,
    loop: true,
    centeredSlides: true,
    spaceBetween: 20
  };

  isSmallScreen: boolean;

  sliderTwo: any;

  constructor(private router: Router,
    private windowService: WindowService, private popoverController: PopoverController) {

    this.setConstants();
    this.isSmallScreen = this.windowService.isSmallScreen();
    this.sliderTwo =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [
        {
          id: 324
        },
        {
          id: 321
        },
        {
          id: 435
        },
        {
          id: 524
        },
        {
          id: 235
        }
      ]
    };
  }

  setConstants() {
    this.homeImage = HomePageConstants.homePageMainImage();
    this.sectionThreeDetails = HomePageConstants.sectionThreeDetails();
    this.sectionFourDetails = HomePageConstants.sectionFourDetails();
  }
  ngOnInit() {
    this.isSmallScreen = this.windowService.isSmallScreen();
    console.log('on init' + this.isSmallScreen);
  }

  goToSignUpPage() {
    this.router.navigate(['/register']);
  }

  async openPopOver(event: any) {
    const popover = await this.popoverController.create({
      component: HomeHeaderPopverComponent,
      event,
      translucent: true
    });
    return popover.present();
  }


  checkScreen() {
    innerWidth = window.innerWidth;
    switch (true) {
      case 340 <= innerWidth && innerWidth <= 400:
        return 1;
      case 401 <= innerWidth && innerWidth <= 700:
        return 2;
      case 701 <= innerWidth && innerWidth <= 900:
        return 3;
      case 901 <= innerWidth:
        return 3;
    }
  }

  changeIon(){
    console.log('ion changed');
  }

  //Move to Next slide
  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  //Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });;
  }

  //Method called when slide is changed by drag or navigation
  slideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }

  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }

}
