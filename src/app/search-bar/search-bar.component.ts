import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserCacheService } from '../service/user-cache.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  @Output() onClose = new EventEmitter();

  searchValue = '';
  secureMode = false;

  loading = false;
  error = false;

  suggestUsers: string[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // focus on input
    const input = document.getElementById('search-input');
    input?.focus();

    fetch(
      'https://raw.githubusercontent.com/cophilot/DevCv/refs/heads/main/users'
    ).then((response) => {
      response.text().then((data) => {
        this.suggestUsers = data.split('\n');
        this.suggestUsers = this.suggestUsers.filter((user) => user !== '');
      });
    });
  }

  @HostListener('document:keydown.escape', ['$event'])
  close(): void {
    this.loading = false;
    this.error = false;
    this.searchValue = '';
    this.onClose.emit();
  }

  @HostListener('document:keydown.enter', ['$event'])
  onSearch(): void {
    if (this.searchValue == '') {
      return;
    }
    this.search(this.searchValue);
  }

  search(username: string): void {
    this.loading = true;
    this.error = false;

    if (UserCacheService.isUserCached(username, this.secureMode)) {
      this.navigateToUserSide(username);
      return;
    }

    // check if user exists
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => {
        if (response.status === 404) {
          this.onError();
          return;
        }

        // get all public repos
        fetch(`https://api.github.com/users/${username}/repos`).then(
          (response) => {
            response.json().then((data) => {
              data.forEach((repo: any) => {
                if (repo.name.toLowerCase() === 'mydevcv') {
                  this.navigateToUserSide(username);
                }
              });
              this.onError();
            });
          }
        );
      })
      .catch(() => {
        this.onError();
      });
  }

  onError() {
    this.loading = false;

    this.error = true;
    this.searchValue = '';

    setTimeout(() => {
      this.error = false;
    }, 3000);
  }

  navigateToUserSide(username: string) {
    this.close();
    if (this.secureMode) {
      this.router.navigate(['/user', username, 'secure']);
    } else {
      this.router.navigate(['/user', username]);
    }
  }
}
