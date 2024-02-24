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
    // zoom out when its on the mobile
    if (window.innerWidth < 800) {
      (document.body.style as any).zoom = '50%';
    }
  }
}
