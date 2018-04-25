import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FollowService } from '../service/followUp.service';
import { Subject } from 'rxjs/Subject';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';




// import { Script } from 'vm';

@Component({
  selector: 'app-followUp',
  templateUrl: './followUp.component.html',

})

export class followUpComponent implements OnInit {
  public rows = [];
  public form: FormGroup;
  public data = {
   
    folName:[null, Validators.required],
    folSurName: [null, Validators.required],
    folmytimeHour:[new Date('hh-mm'), Validators.required],
    folmytimeMinute: [new Date('hh-mm'), Validators.required],
    folPhysicianName: [null, Validators.required], //ผู้รักษา
    folPurpose: [null, Validators.required], //จุดประสงค์
    folduration: [null, Validators.required], //ช่วงเวลาการรักษา


  }
  constructor(
    // private modal: NgbModal,
    private followUpservice: FollowService,
    private bsmodalservice: BsModalService,
    private modalRef: BsModalRef,
    private formBuilder: FormBuilder,


  ) { }
  ngOnInit() {
    this.form = this.formBuilder.group(this.data);
    this.followUpservice.getFollow().subscribe(result => {
      this.rows = result;
    });
  }
}




