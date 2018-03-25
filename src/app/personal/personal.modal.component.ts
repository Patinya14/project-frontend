import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonalService } from '../service/personal.service';
import { DatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal.modal',
  templateUrl: './personal.modal.component.html'
})
export class PersonalComponent implements OnInit {
  public form: FormGroup;
  public nametitle = ['นาย', 'นาง', 'นางสาว', 'ศาสตราจารย์ ( Professor )', 'ผู้ช่วยศาสตราจารย์ ( Assistant Professor )'
    , 'รองศาสตราจารย์ ( Associate Professor )', 'พระสงฆ์ ( Buddhist Monk )', 'Mr.', 'Miss', 'Mrs.'];
  public status = ['โสด ( Single )', 'แต่งงาน ( Married )', 'หม้าย ( Widowed )', 'หย่า ( Divorced )'
    , 'แยกกันอยู่ ( Separated )', 'นักบวช ( Monk )'];
  public rows = [];
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
  }
  constructor(
    private formBuilder: FormBuilder,
    private personalservice: PersonalService,
    private router: Router
  ) { }
  ngOnInit() {
    this.form = this.formBuilder.group(this.data);
  }
  submit() {
    const value = this.form.value;
    this.personalservice.addPerson(value).subscribe(result => {
      this.rows = result;
      this.router.navigate(['/personal-list', value.personId]);
    });

  }
  
}



