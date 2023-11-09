import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PropsService {
  private static SCHEME = 'green-light';
  private static LANG = 'EN';
  private static LANGINDEX = 1;
  private static LANGUAGES = ['EN'];
  private static initial = false;

  private static contact: any;
  private static general: any;
  private static skills: any;
  private static jobs: any;
  private static education: any;
  private static other: any;
  private static spacing: any;

  static init() {
    if (this.initial) {
      return;
    }
    this.initFiles();
    let x = localStorage.getItem('CVcolorScheme');
    if (x != null) {
      this.SCHEME = x;
    }
    document.documentElement.setAttribute('data-theme', this.SCHEME);
    x = localStorage.getItem('CVLanguage');
    if (x != null) {
      this.LANG = x;
    }
    this.initial = true;
  }

  static initFiles() {
    fetch('assets/content/contact.json').then((response) => {
      response.json().then((data) => {
        this.addLanguage(data);

        this.contact = data;
      });
    });
    fetch('assets/content/skills.json').then((response) => {
      response.json().then((data) => {
        this.addLanguage(data);

        this.skills = data;
      });
    });
    fetch('assets/content/jobs.json').then((response) => {
      response.json().then((data) => {
        this.addLanguage(data);

        this.jobs = data;
      });
    });
    fetch('assets/content/education.json').then((response) => {
      response.json().then((data) => {
        this.addLanguage(data);

        this.education = data;
      });
    });
    fetch('assets/content/other.json').then((response) => {
      response.json().then((data) => {
        this.addLanguage(data);
        this.other = data;
      });
    });
    fetch('assets/content/general.json').then((response) => {
      response.json().then((data) => {
        this.addLanguage(data);

        this.general = data;
      });
    });
    fetch('assets/content/spacing.json').then((response) => {
      response.json().then((data) => {
        this.spacing = data;
      });
    });
  }

  static addLanguage(data: any) {
    // iterate over all keys
    for (const key of Object.keys(data)) {
      // check if key is already in the array
      let lang = key.toUpperCase();

      if (lang === 'ALL' || lang === 'MULTI') {
        continue;
      }
      if (!this.LANGUAGES.includes(lang)) {
        // add key to array
        this.LANGUAGES.push(lang);
      }
    }
  }

  static getContact(): any[] {
    this.init();
    return this.getJSONPropsByLanguage(this.contact);
  }
  static getSkills(): any[] {
    this.init();
    return this.getJSONPropsByLanguage(this.skills);
  }
  static getJobs(): any[] {
    this.init();
    return this.getJSONPropsByLanguage(this.jobs);
  }
  static getEducation(): any[] {
    this.init();
    return this.getJSONPropsByLanguage(this.education);
  }
  static getOther(): any[] {
    this.init();
    return this.getJSONPropsByLanguage(this.other);
  }
  static getGeneral(): any {
    this.init();
    return this.getJSONPropsByLanguage(this.general);
  }
  static getSpacing(): any {
    this.init();
    return this.spacing;
  }
  static getSpacingByName(name: string): number {
    this.init();
    if (this.spacing.hasOwnProperty(name)) {
      return this.spacing[name];
    }
    return 0;
  }

  static getJSONPropsByLanguage(json: any): any {
    if (json.hasOwnProperty('all')) {
      return json.all;
    }
    if (json.hasOwnProperty('multi')) {
      return json.multi;
    }
    if (json.hasOwnProperty(this.LANG.toLowerCase())) {
      return json[this.LANG.toLowerCase()];
    }
    if (!json.hasOwnProperty('en')) {
      alert('Language not found: ' + this.LANG);
      return {};
    }
    return json.en;
  }

  static getScheme(): string {
    this.init();
    return this.SCHEME;
  }

  static setScheme(scheme: string): void {
    this.init();
    this.SCHEME = scheme;
    localStorage.setItem('CVcolorScheme', scheme);
    document.documentElement.setAttribute('data-theme', scheme);
  }

  static toggleLanguage(): void {
    this.init();
    this.setLangIndex();
    this.LANGINDEX++;
    if (this.LANGINDEX >= this.LANGUAGES.length) {
      this.LANGINDEX = 0;
    }
    this.LANG = this.LANGUAGES[this.LANGINDEX];

    localStorage.setItem('CVLanguage', this.LANG);
  }

  static setLangIndex() {
    this.LANGINDEX = this.LANGUAGES.findIndex((lang) => lang === this.LANG);
  }

  static getLanguage(): string {
    this.init();
    return this.LANG;
  }
}
