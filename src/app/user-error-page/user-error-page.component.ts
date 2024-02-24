import { Component, Input } from '@angular/core';
import { PropsService } from '../service/props.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-error-page',
  templateUrl: './user-error-page.component.html',
  styleUrls: ['./user-error-page.component.scss'],
})
export class UserErrorPageComponent {
  static visible = false;
  static heading = 'Error';
  static info = '';
  constructor(private router: Router) {}

  static show(heading = 'Error', info = '') {
    UserErrorPageComponent.heading = heading;
    UserErrorPageComponent.info = info;
    UserErrorPageComponent.visible = true;
  }

  static hide() {
    UserErrorPageComponent.visible = false;
  }

  getHeading() {
    return UserErrorPageComponent.heading;
  }

  getInfo() {
    return UserErrorPageComponent.info;
  }

  isVisible() {
    return UserErrorPageComponent.visible;
  }

  navigateHome() {
    UserErrorPageComponent.hide();
    PropsService.unlockTheStorage();
    PropsService.restoreBackup();
    this.router.navigate(['/']);
  }
}
