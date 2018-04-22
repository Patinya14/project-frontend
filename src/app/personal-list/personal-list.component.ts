import { Component, OnInit, TemplateRef , ViewChild} from '@angular/core';
import { PersonalService } from '../service/personal.service';
import { TabsetComponent } from 'ngx-bootstrap';
import { ActivatedRoute } from '@angular/router'
@Component({
    selector: 'app-personal-list',
    templateUrl: './personal-list.component.html',
})

export class PersonalListComponent implements OnInit {
    public rows = {};
    public id;
    @ViewChild('staticTabs') staticTabs: TabsetComponent;
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