import { Component, Input } from '@angular/core';
import { PropsService } from '../service/props.service';
import { ModeService } from '../service/mode.service';

@Component({
  selector: 'app-page-number',
  templateUrl: './page-number.component.html',
  styleUrls: ['./page-number.component.scss'],
})
export class PageNumberComponent {
  @Input() pageNumber: number = 1;
  totalNumber = 2;
  constructor() {}
  getOffsetTop() {
    return this.pageNumber * 1105;
  }

  getFullName() {
    return (
      PropsService.getGeneral().firstname +
      ' ' +
      PropsService.getGeneral().lastname
    );
  }

  getMode() {
    return ModeService;
  }
}
