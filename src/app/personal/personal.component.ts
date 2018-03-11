import { Component, OnInit } from '@angular/core';
import { PersonalService } from '../service/personal.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';



@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  // styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  public rows = [];
  constructor(
    private personalservice: PersonalService,


  ) { }
  myDateValue: Date;
  
  ngOnInit() {
    this.personalservice.getPerson().subscribe(result => {
      this.rows = result;
       
      this.myDateValue = new Date();
      
    })
  }

  submit(data) {
    console.log(data)
  }

  onDateChange(newDate: Date) {
    console.log(newDate);
  }
}



