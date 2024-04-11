import { Component, Input } from '@angular/core';
import { PropsService } from '../service/props.service';
import { ModeService } from '../service/mode.service';
import { Router } from '@angular/router';
import { PasswordInputComponent } from '../password-input/password-input.component';
import { ExportOptionComponent } from '../export-option/export-option.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isClosed = true;
  searchBar = false;
  completeClose = false;
  resetSure = false;

  copyText = 'Copy to clipboard';
  editContent = '';

  constructor(private router: Router) {}

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
      };
    };
    input.click();
  }

  deleteImage() {
    PropsService.setImg('');
  }

  export() {
    PropsService.export();
  }
  exportSecure() {
    PasswordInputComponent.show().then((pw) => {
      if (pw) {
        PropsService.exportSecure(pw);
      }
    });
  }

  copyData() {
    PropsService.copyToClipboard();
    this.copyText = 'Copied!';
    setTimeout(() => {
      this.copyText = 'Copy to clipboard';
    }, 2000);
  }

  import() {
    PropsService.import();
  }

  resetUnSure() {
    this.resetSure = true;
    setTimeout(() => {
      this.resetSure = false;
    }, 10000);
  }

  reset() {
    PropsService.reset();
  }

  navigateHome() {
    PropsService.unlockTheStorage();
    PropsService.restoreBackup();
    this.router.navigate(['/']);
  }

  getSettings() {
    return PropsService.getSettings();
  }

  navigateView() {
    this.router.navigate(['/view']);
  }

  openExportOptions() {
    ExportOptionComponent.show();
  }

  getMode() {
    return ModeService;
  }
}
