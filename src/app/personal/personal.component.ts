import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PersonalService } from '../service/personal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',

})

export class PersonalComponent implements OnInit {
  public rows = [];
  public id = '';
  public form: FormGroup;
  edit = {}
  public nametitle = ['นาย', 'นาง', 'นางสาว', 'ศาสตราจารย์ ', 'ผู้ช่วยศาสตราจารย์ '
    , 'รองศาสตราจารย์ ', 'พระสงฆ์ ', 'Mr.', 'Miss', 'Mrs.'];
  public status = ['โสด ( Single )', 'แต่งงาน ( Married )', 'หม้าย ( Widowed )', 'หย่า ( Divorced )'
    , 'แยกกันอยู่ ( Separated )', 'นักบวช ( Monk )'];
  public data = {
    personId: [null, Validators.required],
    personGender: [null, Validators.required],
    personNameTitle: [null, Validators.required],
    personName: [null, Validators.required],
    personSurname: [null, Validators.required],
    personBirth: [new Date('yyyy-mm-dd'), Validators.required],
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
    private modalRef: BsModalRef,
    private bsmodalservice: BsModalService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }
  ngOnInit() {
    this.form = this.formBuilder.group(this.data);
    this.personalservice.getPerson().subscribe(result => {
      this.rows = result;
    });
  }
  login() {
    if (this.id !== '') {
      this.rows.forEach(element => {
        if(element.personId === this.id) {
          this.router.navigate(['/personal-list', element._id]);
        }
      });
    }
  }
  submit() {
    const value = this.form.value;
    if (value !== undefined) {
      if (this.form.value.status === 'edit') {
        this.personalservice.updatePerson(value.id, value)
          .mergeMap(() => this.personalservice.getPerson())
          .subscribe(result => {
            this.rows = result;
          })
      } else {
        this.personalservice.addPerson(value)
          .mergeMap(() => this.personalservice.getPerson())
          .subscribe(result => {
            this.rows = result;
          })
      }
    }
  }
  delete(data) {
    if (data !== undefined) {
      this.personalservice.deletePerson(data._id)
        .mergeMap(() => this.personalservice.getPerson())
        .subscribe(result => {
          this.rows = result;
        })
    }
  }
  openEdit(modal, data) {
    let edit = {
      id: data._id,
      personGender: data.personGender,
      personNameTitle: data.personNameTitle,
      personName: data.personName,
      personSurname: data.personSurname,
      personBirth: [new Date('yyyy-mm-dd'), data.personBirth],
      personMaritalStatus: data.personMaritalStatus,
      personNationality: data.personNationality,
      personCitizenship: data.personCitizenship,
      personReligion: data.personReligion,
      personCareer: data.personCareer,
      personIdentityId: data.personIdentityId,
      personBirthPlace: data.personBirthPlace,
      personProvince: data.personProvince,
      personAddress: data.personAddress,
      personNumber: data.personNumber,
      personFamilyHistory: data.personFamilyHistory,
      personPersonalHistory: data.personPersonalHistory,
      status: 'edit'
    }
    this.form = this.formBuilder.group(edit);
    this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
  }
  openModal(modal: TemplateRef<any>) {
    this.form = this.formBuilder.group(this.data);
    this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
  }

}