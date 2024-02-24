import { Component, Input } from '@angular/core';
import { PropsService } from '../service/props.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-error-page',
  templateUrl: './user-error-page.component.html',
  styleUrls: ['./user-error-page.component.scss'],
})
export class UserErrorPageComponent {
  @Input() username: string = '';

  constructor(private router: Router) {}

  navigateHome() {
    PropsService.unlockTheStorage();
    PropsService.restoreBackup();
    this.router.navigate(['/']);
  }
}
