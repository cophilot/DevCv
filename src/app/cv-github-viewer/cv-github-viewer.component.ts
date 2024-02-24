import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropsService } from '../service/props.service';
import { UserCacheService } from '../service/user-cache.service';

@Component({
  selector: 'app-cv-github-viewer',
  templateUrl: './cv-github-viewer.component.html',
  styleUrls: ['./cv-github-viewer.component.scss'],
})
export class CvGithubViewerComponent {
  username: string = '';
  loading: boolean = true;
  error: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('user') || '';
    if (this.username === '') {
      this.router.navigate(['/']);
    }

    let data = UserCacheService.getData(this.username);

    if (data == null) {
      console.log('Fetching user data...');
      this.fetchData();
    } else {
      console.log('Using cached data...');
      this.show(data);
    }
  }

  async fetchData() {
    try {
      let resp = await fetch(
        `https://api.github.com/repos/${this.username}/mydevcv`
      );
      if (resp.status === 404) {
        throw new Error('Repository not found');
      }
      let data = await resp.json();
      const branch = data.default_branch;
      resp = await fetch(
        `https://api.github.com/repos/${this.username}/mydevcv/contents`
      );
      data = await resp.json();
      let fileName = '';
      data.forEach((file: any) => {
        if (file.name.endsWith('.devcv')) {
          fileName = file.name;
          return;
        }
      });

      if (fileName === '') {
        throw new Error('No .devcv file found');
      }
      resp = await fetch(
        `https://raw.githubusercontent.com/${
          (this, this.username)
        }/mydevcv/${branch}/${fileName}`
      );
      data = await resp.text();
      UserCacheService.cacheUser(this.username, data);
      this.show(data);
    } catch (e) {
      this.loading = false;
      this.error = true;
    }
  }

  show(data: string) {
    PropsService.importUserData(data);
    this.loading = false;
    this.error = false;
  }
}
