import { Component, OnInit, TemplateRef } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router'

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html'
  
})

export class PersonalComponent implements OnInit {
  
  public rows = [];
  modalRef: BsModalRef;
  constructor(
    private loginservice: LoginService,
    private router: Router,
    private modalService: BsModalService
  ) { }
  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
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
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  
}