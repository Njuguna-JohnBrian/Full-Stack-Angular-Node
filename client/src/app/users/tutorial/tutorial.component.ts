import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css'],
})
export class TutorialComponent implements OnInit {
  constructor(private service: ApiserviceService, private router: Router) {}

  errmsg: any;
  errmsgshow = false;
  data: any;

  ngOnInit(): void {
    this.service.tutorial().subscribe((res) => {
      if (res.status === false) {
        this.errmsgshow = true;
        this.errmsg = 'Access Denied';
      } else {
        this.data = res.data;
      }
    });
  }
}
