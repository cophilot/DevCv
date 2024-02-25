import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropsService } from '../service/props.service';
import { UserCacheService } from '../service/user-cache.service';
import { LoadingPageComponent } from '../loading-page/loading-page.component';
import { UserErrorPageComponent } from '../user-error-page/user-error-page.component';
import { PasswordInputComponent } from '../password-input/password-input.component';

@Component({
  selector: 'app-cv-github-viewer',
  templateUrl: './cv-github-viewer.component.html',
  styleUrls: ['./cv-github-viewer.component.scss'],
})
export class CvGithubViewerComponent {
  username: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('user') || '';
    if (this.username === '') {
      UserErrorPageComponent.show('Error', 'No username provided');
      return;
    }

    // check if the route is secure
    const secure = this.route.snapshot.paramMap.get('secure');
    let isSecure = false;
    if (secure != null) {
      if (secure !== 'secure' && secure !== 's') {
        UserErrorPageComponent.show('Error', 'Unknown secure parameter');
        return;
      }
      isSecure = true;
    }

    LoadingPageComponent.show('Fetching user data...');

    let data = UserCacheService.getData(
      this.username + (isSecure ? '-secure' : '')
    );

    if (data == null) {
      console.log('Fetching user data...');
      this.fetchData(isSecure);
    } else {
      console.log('Using cached data...');
      this.show(data, isSecure);
    }
  }

  async fetchData(secure: boolean) {
    try {
      let resp = await fetch(
        `https://api.github.com/repos/${this.username}/mydevcv`
      );
      if (resp.status === 404) {
        throw new Error(
          'Repository MyDevCv not found for user ' + this.username
        );
      }
      let data = await resp.json();
      const branch = data.default_branch;
      resp = await fetch(
        `https://api.github.com/repos/${this.username}/mydevcv/contents`
      );
      data = await resp.json();
      let fileName = '';
      data.forEach((file: any) => {
        if (file.name.endsWith('.devcv' + (secure ? 's' : ''))) {
          fileName = file.name;
          return;
        }
      });

      if (fileName === '') {
        throw new Error(
          'No *.devcv' +
            (secure ? 's' : '') +
            ' file found in MyDevCv repository'
        );
      }
      resp = await fetch(
        `https://raw.githubusercontent.com/${
          (this, this.username)
        }/mydevcv/${branch}/${fileName}`
      );
      data = await resp.text();
      UserCacheService.cacheUser(
        this.username + (secure ? '-secure' : ''),
        data
      );
      this.show(data, secure);
    } catch (e: any) {
      LoadingPageComponent.hide();
      UserErrorPageComponent.show('Could not load user data', e.message);
    }
  }

  async show(data: string, secure: boolean) {
    if (secure) {
      const key = await this.getKey();
      if (key === undefined) {
        LoadingPageComponent.hide();

        UserErrorPageComponent.show('Error', 'No key provided');
        return;
      }
      if (!PropsService.importSecureUserData(data, key)) {
        LoadingPageComponent.hide();

        UserErrorPageComponent.show('Error', 'Invalid key');
        return;
      }
      UserCacheService.cachePassword(this.username, key);
    } else {
      PropsService.importUserData(data);
    }

    LoadingPageComponent.hide();
    UserErrorPageComponent.hide();
  }

  getKey(): Promise<string | undefined> {
    let key = this.route.snapshot.paramMap.get('key');
    if (key !== null) {
      return Promise.resolve(key);
    }
    key = UserCacheService.getPassword(this.username);
    if (key !== null) {
      return Promise.resolve(key);
    }
    return PasswordInputComponent.show('Enter the key');
  }
}
