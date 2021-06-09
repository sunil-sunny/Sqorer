import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanLoad, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private router: Router) { }

  async canLoad(): Promise<boolean> {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      this.router.navigateByUrl('/auth/login', { replaceUrl: true });
      return false;
    }
  }

}
