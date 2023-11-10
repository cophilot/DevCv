import { Component } from '@angular/core';
import { PropsService } from '../service/props.service';

@Component({
  selector: 'app-cookie-message',
  templateUrl: './cookie-message.component.html',
  styleUrls: ['./cookie-message.component.scss'],
})
export class CookieMessageComponent {
  private static visible = false;

  acceptCookies() {
    CookieMessageComponent.visible = false;
    PropsService.acceptCookies();
  }

  rejectCookies() {
    CookieMessageComponent.visible = false;
    PropsService.rejectCookies();
  }

  isVsible() {
    return CookieMessageComponent.visible;
  }

  static show() {
    this.visible = true;
  }
}
