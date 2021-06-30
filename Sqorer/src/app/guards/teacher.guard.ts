import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TeacherGuard implements CanLoad {

  constructor(private router: Router) { }

  async canLoad(): Promise<boolean> {
    const role = sessionStorage.getItem('role');
    if (role === 'Teacher') {
      return true;
    } else {
      this.router.navigateByUrl('/dashboard', { replaceUrl: true });
      return false;
    }
  }
}
