import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-error-page',
  templateUrl: './user-error-page.component.html',
  styleUrls: ['./user-error-page.component.scss'],
})
export class UserErrorPageComponent {
  @Input() username: string = '';
}
