import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.scss'],
})
export class LoadingPageComponent {
  static info = '';
  static visible = false;

  static show(info = '') {
    LoadingPageComponent.info = info;
    LoadingPageComponent.visible = true;
  }

  static hide() {
    LoadingPageComponent.visible = false;
  }

  isVisible() {
    return LoadingPageComponent.visible;
  }

  getInfo() {
    return LoadingPageComponent.info;
  }
}
