import { Component, OnInit, TemplateRef , ViewChild} from '@angular/core';
import { PersonalService } from '../service/personal.service';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
    selector: 'app-personal-list',
    templateUrl: './personal-list.component.html',
})

export class PersonalListComponent implements OnInit {
    @ViewChild('staticTabs') staticTabs: TabsetComponent;
    constructor() { }
    ngOnInit() {}

}