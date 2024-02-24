import { Component } from '@angular/core';
import { PropsService } from '../service/props.service';
import { ModeService } from '../service/mode.service';

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.scss'],
})
export class LeftbarComponent {
  arr: any[] = [];
  constructor() {
    for (let i = 0; i < 4; i++) {
      this.arr.push(i);
    }
  }
  getLanguage(): string {
    return PropsService.getLanguage();
  }

  getGeneralInfo(): any {
    return PropsService.getGeneral();
  }

  getSpacingByName(name: string): number {
    return PropsService.getSpacingByName(name);
  }

  getImage() {
    return PropsService.getImg();
  }

  getMode() {
    return ModeService;
  }
}
