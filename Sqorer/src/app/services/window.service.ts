import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  //1140px -xl
  //960px -lg
  //720px -md
  //540 -sm

  constructor() { }

  isExtraLargeScreen(): boolean {
    if (window.innerWidth >= 1140) {
      return true;
    }
    return false;
  }

  isLargeScreen(): boolean {
    if (window.innerWidth <= 960) {
     return true;
    }
   return false;
  }

  isMediumScreen(): boolean {
    if (window.innerWidth >= 720) {
     return true;
    }
   return false;
  }

  isSmallScreen(): boolean {

    if (window.innerWidth <= 540) {
     return true;
    }
   return false;
  }
}
