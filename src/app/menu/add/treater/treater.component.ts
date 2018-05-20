import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CertificateService } from '../../../service/certificate.service';

@Component({
  selector: 'app-treater',
  templateUrl: './treater.component.html'
  //styleUrls: ['./treater.component.css']
})
export class TreaterComponent {
  public rows = [];
  public form: FormGroup;
  edit = {}
  p: number = 1 ;
  public nametitle = ['นาย', 'นาง', 'นางสาว', 'ศาสตราจารย์ ', 'ผู้ช่วยศาสตราจารย์ '
    , 'รองศาสตราจารย์ ', 'พระสงฆ์ ', 'Mr.', 'Miss', 'Mrs.'];
  public data = {
    cerDateout: [null, Validators.required], //วันเดือนปีที่ออกใบรับรองแพทย์
    cerNameTitle:[null, Validators.required], //คำนำหน้า
    cerPhysicianName:[null, Validators.required], //ชื่อแพทย์
    cerPhysicianSurName: [null, Validators.required], //นามสกุลแพทย์
    cerDateMeet:[null, Validators.required], //วันเดือนปีที่รับการรักษา
    cerSymptom: [null, Validators.required], //อาการของโรค
    cerLicensed_No:[null, Validators.required], //ใบอนุญาตประกอบโรคศิลปะเลขที่

  }
  constructor(
    private bsmodalservice: BsModalService,
    private modalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private certificateService: CertificateService,
  ) { }
  ngOnInit() {
    this.form = this.formBuilder.group(this.data);
    this.certificateService.getCer().subscribe(result => {
      this.rows = result;
    });
  }
  openModal(modal: TemplateRef<any>) {
    this.form = this.formBuilder.group(this.data);
    this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
  }
  openModalView(modal: TemplateRef<any>, data) {
    this.form = this.formBuilder.group(data);
    this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
  }
  submit() {
    const value = this.form.value;
    if (value !== undefined) {
      if (this.form.value.status === 'edit') {
        this.certificateService.updateCer(value.id, value)
          .mergeMap(() => this.certificateService.getCer())
          .subscribe(result => {
            this.rows.unshift = result;
          })
      } else {
        this.certificateService.addCer(value)
          .mergeMap(() => this.certificateService.getCer())
          .subscribe(result => {
            this.rows = result;
          })
      }
    }
  }
  delete(data) {
    if (data !== undefined) {
      this.certificateService.deleteCer(data._id)
        .mergeMap(() => this.certificateService.getCer())
        .subscribe(result => {
          this.rows = result;
        })
    }
  }
  openEdit(modal, data) {
    let edit = {
      id: data._id,
      cerDateout: data.cerDateout, //วันเดือนปีที่ออกใบรับรองแพทย์
      cerNameTitle: data.cerNameTitle, //คำนำหน้า
      cerPhysicianName: data.cerPhysicianName, //ชื่อแพทย์
      cerPhysicianSurName: data.cerPhysicianSurName, //นามสกุลแพทย์
      cerDateMeet: data.cerDateMeet, //วันเดือนปีที่รับการรักษา
      cerSymptom: data.cerSymptom, //อาการของโรค
      cerLicensed_No: data.cerLicensed_No, //ใบอนุญาตประกอบโรคศิลปะเลขที่
      status: 'edit'
    }
    this.form = this.formBuilder.group(edit);
    this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
  }

}

