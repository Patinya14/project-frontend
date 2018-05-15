import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonalService } from '../service/personal.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TabsetComponent } from 'ngx-bootstrap';
import { ActivatedRoute } from '@angular/router'
@Component({
    selector: 'app-personal-list',
    templateUrl: './personal-list.component.html',
})

export class PersonalListComponent implements OnInit {
    public rows: any = {};
    public id;
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
  
    @ViewChild('staticTabs') staticTabs: TabsetComponent;
    constructor(
        private personalservice: PersonalService,
        private activatedroute: ActivatedRoute,
        private modalRef: BsModalRef,
        private bsmodalservice: BsModalService,
        private formBuilder: FormBuilder,
    ) {
        this.id = this.activatedroute.snapshot.params['personalId'];
    }
    ngOnInit() {
        this.form = this.formBuilder.group(this.data);
        this.personalservice.getPersonById(this.id).subscribe(result => {
            this.rows = result;
            console.log(this.data)
        })
    }
    submit() {
        const value = this.form.value;
        if (value !== undefined) {
          if (this.form.value.status === 'edit') {
            console.log(value)
            this.personalservice.updatePerson(value.id, value)
              .mergeMap(() => this.personalservice.getPersonById(this.id))
              .subscribe(result => {
                this.rows = result;
              })
          } else {
            this.personalservice.addPerson(value)
              .mergeMap(() => this.personalservice.getPersonById(this.id))
              .subscribe(result => {
                this.rows = result;
              })
          }
        }
      }
      delete(data) {
        if (data !== undefined) {
          this.personalservice.deletePerson(data._id)
            .mergeMap(() => this.personalservice.getPersonById(this.id))
            .subscribe(result => {
              this.rows = result;
            })
        }
      }
      openEdit(modal) {
        var edit: any = this.rows;
        edit.status = 'edit';
        edit.id = this.rows._id;
        this.form = this.formBuilder.group(edit);
        this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
      }
      openModal(modal: TemplateRef<any>) {
        this.form = this.formBuilder.group(this.data);
        this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
      }
    
}