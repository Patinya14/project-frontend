import { Component, OnInit } from '@angular/core';
import { PersonalService } from '../service/personal.service';
@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html'
  //styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit{
  public rows = [];
  constructor(
    private personalservice: PersonalService
  ) { }

  ngOnInit() {
    this.personalservice.getPerson().subscribe(result => {
      this.rows = result;
    })
  }
  submit(data){
    console.log(data)
  }
}
