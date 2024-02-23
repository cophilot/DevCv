import { Component } from '@angular/core';
import { ModeService } from '../service/mode.service';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss'],
})
export class Page1Component {
  getMode() {
    return ModeService;
  }
}
