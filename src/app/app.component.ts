import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './themes/bootstrap.scss']
})
export class AppComponent {
  rows = [];
  title = 'app';
}
