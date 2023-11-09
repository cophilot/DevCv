import { Component } from '@angular/core';
import { PropsService } from './service/props.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'MyCV';

  constructor() {
    PropsService.init();
  }
}
