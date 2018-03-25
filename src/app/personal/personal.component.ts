import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html'
})

export class PersonalComponent implements OnInit {
  public rows = [];
  constructor(
    private loginservice: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginservice.getlog().subscribe(result => {
      this.rows = result;
    })
  }
  submit(data) {
    this.loginservice.addlog(data).subscribe(result => {
      this.rows = result;
      console.log(this.rows)
    });
  }
}