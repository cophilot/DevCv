import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-icon',
  templateUrl: './my-icon.component.html',
  styleUrls: ['./my-icon.component.scss'],
})
export class MyIconComponent {
  @Input() cls: string = '';
}
