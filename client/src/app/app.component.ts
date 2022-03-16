import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from './users/apiservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  showmenu = false;
  constructor(private service: ApiserviceService, private router: Router) {}
  token = this.service.getToken();
  name = localStorage.getItem('username');
  ngOnInit(): void {
    if (this.token) {
      this.showmenu = true;
    } else {
      this.showmenu = false;
    }
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }
}
