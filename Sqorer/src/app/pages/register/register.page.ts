import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  firstName: any = '';
  lastName: any = '';
  email: any = '';
  password: any = '';
  userType: any = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  doRegister() {

    console.log(this.firstName);
  }

  register(form) {

    this.authService.registerUser(form.value).subscribe((data) => {

      if (data.msg) {
        alert(data.msg);
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/dashboard']);
      }
    });
  }


}
