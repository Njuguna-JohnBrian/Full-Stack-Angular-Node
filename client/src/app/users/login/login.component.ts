import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errmsg: any;
  errmsgshow = false;
  constructor(private service: ApiserviceService, private router: Router) {}
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  ngOnInit(): void {}

  loginSubmit() {
    if (this.loginForm.valid) {
      this.service.logIn(this.loginForm.value).subscribe((res) => {
        if (res.status === true) {
          // store data in localstorage
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', res.result.name);
          localStorage.setItem('email', res.result.email);

          this.router.navigate(['tutorial']).then(() => {
            window.location.reload();
          });
        } else {
          this.errmsgshow = true;
          this.errmsg = res.msg;
        }
      });
    } else {
      this.errmsgshow = true;
      this.errmsg = 'All Fields Are Required!!';
    }
  }
}
