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

  editContent = '';

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

  uploadImagetest() {
    document.getElementById('upload')?.click();
    document.getElementById('upload')?.addEventListener('change', (event) => {
      const file = (<HTMLInputElement>event.target)?.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const result = reader.result?.toString();
          if (result) {
            this.editContent = result;
          }
        };
      }
    });
  }

  uploadImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const binary = reader.result as string;
        PropsService.setImg(binary);
        console.log(binary);
      };
    };
    input.click();
  }
}
