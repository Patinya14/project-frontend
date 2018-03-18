import { Component, OnInit } from '@angular/core';
import { PersonalService } from '../service/personal.service';
import { ActivatedRoute } from '@angular/router'
@Component({
    selector: 'app-personal-list',
    templateUrl: './personal-list.component.html',
})

export class PersonalListComponent implements OnInit {
    public rows = {};
    public id;
    constructor(
        private personalservice: PersonalService,
        private activatedroute: ActivatedRoute
    ) {
        this.id = this.activatedroute.snapshot.params['personalId'];
    }
    ngOnInit() {
        this.personalservice.getPersonById(this.id).subscribe(result => {
            this.rows = result;
        })
    }
}