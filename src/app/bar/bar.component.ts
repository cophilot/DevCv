import { Component, Input } from '@angular/core';
import { PropsService } from '../service/props.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent {
  @Input() className: string = '';

  isEnbaled() {
    return PropsService.getSettings().bars;
  }
}
