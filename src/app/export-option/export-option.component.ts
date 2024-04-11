import { Component } from '@angular/core';
import { PasswordInputComponent } from '../password-input/password-input.component';

@Component({
  selector: 'app-export-option',
  templateUrl: './export-option.component.html',
  styleUrls: ['./export-option.component.scss'],
})
export class ExportOptionComponent {
  static visible = false;

  static show() {
    ExportOptionComponent.visible = true;
  }

  hide() {
    ExportOptionComponent.visible = false;
  }

  isVisible() {
    return ExportOptionComponent.visible;
  }

  exportHTML() {
    const element = document.getElementById('export-cv');
    // export the element with style
    if (!element) {
      alert('Something went wrong. Please try again.');
      return;
    }
    const html = element.innerHTML;

    if (html) {
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cv.html';
      a.click();
      URL.revokeObjectURL(url);
    }
  }
}
