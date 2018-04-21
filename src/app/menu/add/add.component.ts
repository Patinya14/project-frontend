import { Component, OnInit, TemplateRef , ViewChild} from '@angular/core';

import { TabsetComponent } from 'ngx-bootstrap';
import { AccordionModule } from 'ngx-bootstrap';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
})

export class AddComponent implements OnInit {
    @ViewChild('staticTabs') staticTabs: TabsetComponent;
    constructor() { }
    ngOnInit() {}

}