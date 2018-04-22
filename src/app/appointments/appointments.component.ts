import { Component, OnInit} from '@angular/core';
import { AppointmentsService } from '../service/appointments.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { style } from '@angular/core/src/animation/dsl';

// import { Script } from 'vm';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  //styleUrls: ['./menu.component.css']
  // styles: [`
  //       .ui-grid-row div {
  //         padding: 4px 10px
  //       }
        
  //       .ui-grid-row div label {
  //         font-weight: bold;
  //       }
  // `]
})

export class AppointmentsComponent implements OnInit {
 mytime: Date = new Date();
  // events: any[];
  // header: any;

  // constructor(
  //   private appointmentsService: AppointmentsService
  // ) { }
  ngOnInit() {
    // this.appointmentsService.getApp().subscribe(events => { 
    //   this.events = events; 
    // });

    // this.header = {
    //   left: 'prev,next today',
    //   center: 'title',
    //   right: 'month,agendaWeek,agendaDay'
    // };
  }

}
export class MyEvent{
  // id: number;
  // title: string;
  // start: string;
  // end: string;
  // allDay: boolean = true;
}



