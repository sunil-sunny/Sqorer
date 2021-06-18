import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: any = '';
  password: any = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  login(form) {

    this.authService.loginUser(form.value).subscribe((data) => {

      if (data.msg) {
        alert(data.msg);
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        this.authService.getUser().subscribe((data1) => {
          console.log(data1);
          console.log('logged in and after');
          console.log(data1.userType);
          localStorage.setItem('role', data1.userType);
          // eslint-disable-next-line no-underscore-dangle
          localStorage.setItem('id', data1._id);
          // eslint-disable-next-line no-underscore-dangle
          console.log(data1._id);
        });
        this.router.navigate(['/dashboard']);
      }
    });


  }

  setUserRole() {
  }

}
