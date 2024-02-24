import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropsService } from '../service/props.service';

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
  async ngOnInit() {
    try {
      this.username = this.route.snapshot.paramMap.get('id') || '';
      if (this.username === '') {
        this.router.navigate(['/']);
      }
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
      PropsService.importUserData(data);

      this.loading = false;
      this.error = false;
    } catch (e) {
      this.loading = false;
      this.error = true;
    }
  }
}
