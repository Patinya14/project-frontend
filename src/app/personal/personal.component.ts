import { Component, OnInit, TemplateRef } from '@angular/core';
import { PersonalService } from '../service/personal.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html'
  
})



export class PersonalComponent implements OnInit {
  
  public rows = [];
  modalRef: BsModalRef;
  loginservice: LoginService
  constructor(
    private personalservice: PersonalService ,
    private router: Router,
    private modalService: BsModalService
  ) { }
  ngOnInit() {
    this.personalservice.getPerson().subscribe(result => {
      this.rows = result;
      console.log( this.rows)
    })
  }
  submit(data) {
    this.loginservice.addlog(data).subscribe(result => {
      this.rows = result;
    });
  }
  openModal(modal: TemplateRef<any>) {
    this.modalRef = this.modalService.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
}
  
}