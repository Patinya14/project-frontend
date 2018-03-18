import { Component, OnInit } from '@angular/core';
import { PersonalService } from '../service/personal.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router'

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html'
})
export class PersonalComponent implements OnInit {
  public nametitle = ['นาย', 'นาง', 'นางสาว', 'ศาสตราจารย์ ( Professor )', 'ผู้ช่วยศาสตราจารย์ ( Assistant Professor )'
    , 'รองศาสตราจารย์ ( Associate Professor )', 'พระสงฆ์ ( Buddhist Monk )', 'Mr.', 'Miss', 'Mrs.'];
  public status = ['โสด ( Single )', 'แต่งงาน ( Married )', 'หม้าย ( Widowed )', 'หย่า ( Divorced )'
    , 'แยกกันอยู่ ( Separated )', 'นักบวช ( Monk )'];
  public rows = [];
  constructor(
    private personalservice: PersonalService,
    private router: Router
  ) { }
  myDateValue: Date;
  ngOnInit() {
    this.personalservice.getPerson().subscribe(result => {
      this.rows = result;
      this.myDateValue = new Date();
    })
  }
  submit(data) {
    data.myDateValue = this.myDateValue;
    this.personalservice.addPerson(data).subscribe(result => {
      this.rows = result;
      this.router.navigate(['/personal-list', data.personId]);
    });
    
  }
}



