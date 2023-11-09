import { Component } from '@angular/core';
import { PropsService } from '../service/props.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isClosed = true;
  completeClose = false;

  constructor() {}

  toggleLanguage(): void {
    PropsService.toggleLanguage();
  }

  getLanguage(): string {
    return PropsService.getLanguage();
  }

  print(): void {
    this.completeClose = true;
    setTimeout(() => {
      window.print();
      this.completeClose = false;
    }, 100);
  }
  setColorScheme(colorScheme: string): void {
    PropsService.setScheme(colorScheme);
  }
}
