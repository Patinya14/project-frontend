import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FollowService } from '../service/follow.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';




// import { Script } from 'vm';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',

})

export class followComponent implements OnInit {
  public rows = [];
  public form: FormGroup;
  public id;
  edit = {}
  public data = {
    // folID: [null, Validators.required],
    folName: [null, Validators.required],
    folSurName: [null, Validators.required],
    folDate: [new Date('yyyy-mm-dd'), Validators.required],
    folmytimeHour: [null , Validators.required],
    // folmytimeMinute: [null, Validators.required],
    folPhysicianName: [null, Validators.required], //ผู้รักษา
    folPurpose: [null, Validators.required], //จุดประสงค์
    folduration: [null, Validators.required], //ช่วงเวลาการรักษา


  }
  constructor(
    private followservice: FollowService,
    private bsmodalservice: BsModalService,
    private modalRef: BsModalRef,
    private formBuilder: FormBuilder,
   
   
  ) { }
  ngOnInit() {
    this.form = this.formBuilder.group(this.data);
    this.followservice.getFollow().subscribe(result => {
      this.rows = result;
    });
  }
  submit() {
    const value = this.form.value;
    if (value !== undefined) {
      if (this.form.value.status === 'edit') {
        this.followservice.updateFollow(value.id, value)
          .mergeMap(() => this.followservice.getFollow())
          .subscribe(result => {
            this.rows = result;
          })
      } else {
        this.followservice.addFollow(value)
          .mergeMap(() => this.followservice.getFollow())
          .subscribe(result => {
            this.rows = result;
          })
      }
    }
  }

  delete(data) {
    if (data !== undefined) {
      this.followservice.deleteFollow(data._id)
        .mergeMap(() => this.followservice.getFollow())
        .subscribe(result => {
          this.rows = result;
        })
    }
  }
  openModal(modal: TemplateRef<any>) {
    this.form = this.formBuilder.group(this.data);
    this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
  }
  openEdit(modal, data) {
    let edit = {
      folName: data.folName,
      folSurName: data.folSurName,
      folDate: [new Date('yyyy-mm-dd'), data.folDate],
      folmytimeHour: [new Date('hh-mm'), data.folmytimeHour],
      // folmytimeMinute: [null, Validators.required],
      folPhysicianName: data.folPhysicianName, 
      folPurpose: data.folPurpose, 
      folduration: data.folduration, 
      status: 'edit'
    }
    this.form = this.formBuilder.group(edit);
    this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
  }
}



