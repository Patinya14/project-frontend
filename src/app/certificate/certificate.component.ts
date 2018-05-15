import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CertificateService } from '../service/certificate.service';
import { PersonalService } from '../service/personal.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ActivatedRoute, Router } from '@angular/router'

// import { Script } from 'vm';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {
  public id;
  public rows = [];
  public form: FormGroup;
  edit = {}
  public data = {
    cerDateout: [new Date('yyyy-mm-dd'), Validators.required],//วันเดือนปีที่ออกใบรับรองแพทย์
    cerNameTitle: [null, Validators.required], //คำนำหน้า
    cerPhysicianName: [null, Validators.required], //ชื่อแพทย์
    cerPhysicianSurName: [null, Validators.required], //นามสกุลแพทย์
    cerDateMeet: [null, Validators.required], //วันเดือนปีที่รับการรักษา
    cerSymptom: [null, Validators.required], //อาการของโรค
    cerLicensed_No: [null, Validators.required], //ใบอนุญาตประกอบโรคศิลปะเลขที่
    personNameTitle:[null, Validators.required],
    personName: [null, Validators.required],
    personSurname: [null, Validators.required],
    personAddress:[null, Validators.required],
    
  }
  constructor(
    private certificateService: CertificateService,
    private personalservice: PersonalService,
    private bsmodalservice: BsModalService,
    private modalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private activatedroute: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.activatedroute.snapshot.params['personalId'];
  }
  ngOnInit() {
    this.form = this.formBuilder.group(this.data);

    this.certificateService.getCerById(this.id).subscribe(result => {
      this.rows = result;
    });
    this.personalservice.getPerson().subscribe(result => {
      this.rows = result;
    });
  }

  openModal(modal: TemplateRef<any>) {
    this.form = this.formBuilder.group(this.data);
    this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
  }
  submit() {
    const value = this.form.value;
    if (value !== undefined) {
      if (this.form.value.status === 'edit') {
        this.certificateService.updateCer(value.id, value)
          .mergeMap(() => this.certificateService.getCerById(this.id))
          .subscribe(result => {
            this.rows = result;
          })
      } else {
        this.certificateService.addCer(value)
          .mergeMap(() => this.certificateService.getCerById(this.id))
          .subscribe(result => {
            this.rows = result;
          })
      }
    }
  }
  findid() {
    if (this.id !== '') {
      this.rows.forEach(element => {
        if (element.personId === this.id) {
          this.router.navigate(['/certificate', element._id]);
        
        }
      });
    }
  }
  show(data) {
    let show = {
      id: data._id,
      personNameTitle: data.personNameTitle,
      personName: data.personName,
      personSurname: data.personSurname,
      personAddress: data.personAddress,
    }
    this.form = this.formBuilder.group(show);
  }

  delete(data) {
    if (data !== undefined) {
      this.certificateService.deleteCer(data._id)
        .mergeMap(() => this.certificateService.getCerById(this.id))
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
