import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanLoad {
  constructor(private router: Router) { }

  async canLoad(): Promise<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      return true;
    } else {
      this.router.navigateByUrl('/dashboard', { replaceUrl: true });
      return false;
    }
  }
}
