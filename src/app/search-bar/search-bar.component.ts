import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  @Output() onClose = new EventEmitter();

  searchValue = '';

  loading = false;
  error = false;

  constructor(private router: Router) {}

  @HostListener('document:keydown.escape', ['$event'])
  close(): void {
    this.loading = false;
    this.error = false;
    this.searchValue = '';
    this.onClose.emit();
  }
  @HostListener('document:keydown.enter', ['$event'])
  search(): void {
    if (this.searchValue == '') {
      return;
    }
    this.loading = true;

    // check if user exists
    fetch(`https://api.github.com/users/${this.searchValue}`)
      .then((response) => {
        if (response.status === 404) {
          this.loading = false;
          this.error = true;
          this.searchValue = '';
          return;
        }

        // get all public repos
        fetch(`https://api.github.com/users/${this.searchValue}/repos`).then(
          (response) => {
            response.json().then((data) => {
              data.forEach((repo: any) => {
                if (repo.name.toLowerCase() === 'mydevcv') {
                  const user = this.searchValue;
                  this.close();
                  this.router.navigate(['/user', user]);
                  return;
                }
              });
              this.loading = false;
              this.error = true;
              this.searchValue = '';
              console.log('no repo');
            });
          }
        );
      })
      .catch((error) => {
        this.loading = false;
        this.error = true;
        this.searchValue = '';
      });

    // this.router.navigate(['/user', this.searchValue]);
    // this.onClose.emit();
  }
}
