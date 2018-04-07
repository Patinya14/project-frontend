import { Component, OnInit, TemplateRef } from '@angular/core';
import { PersonalService } from '../service/personal.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html'

})

export class PersonalComponent implements OnInit {
  public rows = [];

  public form: FormGroup;
  public nametitle = ['นาย', 'นาง', 'นางสาว', 'ศาสตราจารย์ ( Professor )', 'ผู้ช่วยศาสตราจารย์ ( Assistant Professor )'
    , 'รองศาสตราจารย์ ( Associate Professor )', 'พระสงฆ์ ( Buddhist Monk )', 'Mr.', 'Miss', 'Mrs.'];
  public status = ['โสด ( Single )', 'แต่งงาน ( Married )', 'หม้าย ( Widowed )', 'หย่า ( Divorced )'
    , 'แยกกันอยู่ ( Separated )', 'นักบวช ( Monk )'];
  public data = {
    personId: [null, Validators.required],
    personGender: [null, Validators.required],
    personNameTitle: [null, Validators.required],
    personName: [null, Validators.required],
    personSurname: [null, Validators.required],
    personDate: [new Date('yyyy-mm-dd'), Validators.required],
    personMaritalStatus: [null, Validators.required],
    personNationality: [null, Validators.required],
    personCitizenship: [null, Validators.required],
    personReligion: [null, Validators.required],
    personCareer: [null, Validators.required],
    personIdentityId: [null, Validators.required],
    personBirthPlace: [null, Validators.required],
    personProvince: [null, Validators.required],
    personAddress: [null, Validators.required],
    personNumber: [null, Validators.required],
    personFamilyHistory: [null, Validators.required],
    personPersonalHistory: [null, Validators.required],
  };


  constructor(
    private personalservice: PersonalService,
    private router: Router,
    private modalRef: BsModalRef,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private loginservice: LoginService
  ) { }
  ngOnInit() {
    this.form = this.formBuilder.group( this.data );
    this.personalservice.getPerson().subscribe(result => {
      this.rows = result;
      console.log(this.rows)
    })
  }
  
    submit() {
      const value = this.form.value;
      this.personalservice.addPerson(value).subscribe(result => {
        this.rows = result;
      });
    }
    openModal(modal: TemplateRef<any>) {
      this.modalRef = this.modalService.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
    }

}