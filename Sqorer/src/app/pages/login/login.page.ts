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

      if(data.msg){
        alert(data.msg);
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/dashboard']);
      }
    });

  }


}
