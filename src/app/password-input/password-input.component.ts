import { Component } from '@angular/core';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
})
export class PasswordInputComponent {
  errorMsg = '';
  password = '';
  clear = false;

  static heading = 'Enter a password';
  static visible = false;
  static promise: Promise<string | undefined>;
  static callback: (pw: string | undefined) => void;

  submitPassword() {
    if (this.password.length < 4) {
      this.errorMsg = 'Password must be at least 4 characters long';
      return;
    }
    if (this.password.includes(' ')) {
      this.errorMsg = 'Password must not contain spaces';
      return;
    }

    const pw = this.password;
    this.hide(false);
    PasswordInputComponent.callback(pw);
  }

  static show(heading = 'Enter a password'): Promise<string | undefined> {
    PasswordInputComponent.visible = true;
    PasswordInputComponent.heading = heading;
    // focus on the input field
    setTimeout(() => {
      const input = document.getElementById('password');
      if (input) {
        input.focus();
      }
    }, 100);
    PasswordInputComponent.promise = new Promise<string | undefined>(
      (resolve) => {
        PasswordInputComponent.callback = resolve;
      }
    );
    return PasswordInputComponent.promise;
  }

  hide(call = true) {
    PasswordInputComponent.visible = false;
    this.password = '';
    this.errorMsg = '';
    this.clear = false;
    if (call) {
      PasswordInputComponent.callback(undefined);
    }
  }

  getHeading() {
    return PasswordInputComponent.heading;
  }

  isVisible() {
    return PasswordInputComponent.visible;
  }
}
