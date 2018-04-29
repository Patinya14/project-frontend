import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FollowService } from '../service/follow.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

// import { Script } from 'vm';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',

})

export class followComponent {
  public rows = [];
  public form: FormGroup;
  edit = {}
  public data = {
    
    folName: [null, Validators.required],
    folSurName: [null, Validators.required],
    folDate: [new Date('yyyy-mm-dd'), Validators.required],
    folmytimeHour: [null, Validators.required],
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
      id: data._id,
      folName: data.folName,
      folSurName: data.folSurName,
      folDate: [new Date('yyyy-mm-dd'), data.folDate],
      folmytimeHour: data.folmytimeHour,
      folPhysicianName: data.folPhysicianName, 
      folPurpose: data.folPurpose, 
      folduration: data.folduration, 
      status: 'edit'
    }
    this.form = this.formBuilder.group(edit);
    this.modalRef = this.bsmodalservice.show(modal, Object.assign({}, { class: 'gray modal-lg' }));
  }
}




