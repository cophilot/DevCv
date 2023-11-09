import { Component } from '@angular/core';
import { PropsService } from '../service/props.service';

@Component({
  selector: 'app-rightbar',
  templateUrl: './rightbar.component.html',
  styleUrls: ['./rightbar.component.scss'],
})
export class RightbarComponent {
  arr: any[] = [];
  constructor() {
    for (let i = 0; i < 6; i++) {
      this.arr.push(i);
    }
  }

  getLanguage(): string {
    return PropsService.getLanguage();
  }

  getGeneralInfo() {
    return PropsService.getGeneral();
  }

  getSpacingByName(name: string): number {
    return PropsService.getSpacingByName(name);
  }
}
