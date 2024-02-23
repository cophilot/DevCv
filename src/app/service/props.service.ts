import { Injectable } from '@angular/core';
import { getExampleByName } from 'src/utils/examples';
import { CookieMessageComponent } from '../cookie-message/cookie-message.component';

@Injectable({
  providedIn: 'root',
})
export class PropsService {
  private static SCHEME = 'green-light';
  private static LANG = 'EN';
  private static LANGINDEX = 1;
  private static LANGUAGES = ['EN'];
  private static initial = false;
  private static cookiesAllowed = false;

  private static contact: any;
  private static general: any;
  private static skills: any;
  private static jobs: any;
  private static education: any;
  private static other: any;
  private static spacing: any;

  private static IMAGE =
    Math.random() > 0.1 ? 'assets/foto_square.jpg' : 'assets/foto_square2.jpg';

  static init() {
    if (this.initial) {
      return;
    }
    this.initFiles();
    let x = this.getLS('cookiesAllowed');
    if (x != null) {
      this.cookiesAllowed = x === 'true';
    }

    if (this.cookiesAllowed == false) {
      CookieMessageComponent.show();
    }

    x = this.getLS('CVcolorScheme');
    if (x != null) {
      this.SCHEME = x;
    }
    document.documentElement.setAttribute('data-theme', this.SCHEME);
    x = this.getLS('CVLanguage');
    if (x != null) {
      this.LANG = x;
    }
    x = this.getLS('CVImage');
    if (x != null) {
      this.IMAGE = x;
    }

    this.initial = true;
  }

  static initFiles() {
    this.contact = this.fetchContent('contact');
    this.addLanguage(this.contact);

    this.skills = this.fetchContent('skills');
    this.addLanguage(this.skills);

    this.jobs = this.fetchContent('jobs');
    this.addLanguage(this.jobs);

    this.education = this.fetchContent('education');
    this.addLanguage(this.education);

    this.other = this.fetchContent('other');
    this.addLanguage(this.other);

    this.general = this.fetchContent('general');
    this.addLanguage(this.general);

    this.spacing = this.fetchContent('spacing');
  }

  static addLanguage(data: any) {
    // iterate over all keys
    for (const key of Object.keys(data)) {
      // check if key is already in the array
      let lang = key.toUpperCase();

      if (lang === 'ALL' || lang === 'UNIVERSAL') {
        continue;
      }
      if (!this.LANGUAGES.includes(lang)) {
        // add key to array
        this.LANGUAGES.push(lang);
      }
    }
  }

  static fetchContent(name: string): any {
    let data = this.getLS(name.toLowerCase());
    if (data == null) {
      data = getExampleByName(name);
      return data;
    }
    return JSON.parse(data);
  }

  static saveContent(name: string, content: string) {
    switch (name.toLowerCase()) {
      case 'contact':
        this.contact = JSON.parse(content);
        this.addLanguage(this.contact);
        break;
      case 'skills':
        this.skills = JSON.parse(content);
        this.addLanguage(this.skills);
        break;
      case 'jobs':
        this.jobs = JSON.parse(content);
        this.addLanguage(this.jobs);
        break;
      case 'education':
        this.education = JSON.parse(content);
        this.addLanguage(this.education);
        break;
      case 'other':
        this.other = JSON.parse(content);
        this.addLanguage(this.other);
        break;
      case 'general':
        this.general = JSON.parse(content);
        this.addLanguage(this.general);
        break;
      case 'spacing':
        this.spacing = JSON.parse(content);
        break;
      default:
        return;
    }

    this.setLS(name.toLowerCase(), content);
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
    if (this.spacing == undefined) {
      return 0;
    }
    if (this.spacing.hasOwnProperty(name)) {
      return this.spacing[name];
    }
    return 0;
  }

  static getJSONPropsByLanguage(json: any): any {
    if (json == undefined) {
      return {};
    }
    if (json.hasOwnProperty('all')) {
      return json.all;
    }
    if (json.hasOwnProperty('universal')) {
      return json.universal;
    }
    if (json.hasOwnProperty(this.LANG.toLowerCase())) {
      return json[this.LANG.toLowerCase()];
    }
    if (!json.hasOwnProperty('en')) {
      //alert('Language not found: ' + this.LANG + ' in ' + JSON.stringify(json));
      return [];
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
    this.setLS('CVcolorScheme', scheme);
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

    this.setLS('CVLanguage', this.LANG);
  }

  static getJsonAsString(name: string) {
    switch (name.toLowerCase()) {
      case 'contact':
        return JSON.stringify(this.contact);
      case 'skills':
        return JSON.stringify(this.skills);
      case 'jobs':
        return JSON.stringify(this.jobs);
      case 'education':
        return JSON.stringify(this.education);
      case 'other':
        return JSON.stringify(this.other);
      case 'general':
        return JSON.stringify(this.general);
      case 'spacing':
        return JSON.stringify(this.spacing);
      default:
        return '';
    }
  }

  static setLangIndex() {
    this.LANGINDEX = this.LANGUAGES.findIndex((lang) => lang === this.LANG);
  }

  static getLanguage(): string {
    this.init();
    return this.LANG;
  }

  static getImg(): string {
    this.init();
    return this.IMAGE;
  }

  static setImg(img: string): void {
    this.init();
    this.IMAGE = img;
    this.setLS('CVImage', img);
  }

  static getLS(name: string): string | null {
    return localStorage.getItem(name);
  }

  static setLS(name: string, value: string) {
    if (this.cookiesAllowed == false) {
      return;
    }
    localStorage.setItem(name, value);
  }

  static rejectCookies() {
    localStorage.clear();
    this.cookiesAllowed = false;
  }

  static acceptCookies() {
    this.cookiesAllowed = true;
    this.setLS('cookiesAllowed', 'true');
    this.initial = false;
    this.init();
  }

  static export() {
    const general = this.getGeneral();
    const name = general.firstname + '-' + general.lastname;

    let a = document.createElement('a');
    let file = new Blob([JSON.stringify(this.getAllData())], {
      type: 'application/json',
    });
    a.href = URL.createObjectURL(file);
    a.download = name + '-DevCV.devcv';
    a.click();
  }

  static copyToClipboard() {
    navigator.clipboard.writeText(JSON.stringify(this.getAllData()));
  }

  static getAllData(): any {
    return {
      contact: this.contact,
      skills: this.skills,
      jobs: this.jobs,
      education: this.education,
      other: this.other,
      general: this.general,
      spacing: this.spacing,
      colorScheme: this.SCHEME,
      language: this.LANG,
      image: this.IMAGE,
    };
  }

  static import() {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        const binary = reader.result as string;
        const data = JSON.parse(binary);
        this.contact = data.contact;
        this.skills = data.skills;
        this.jobs = data.jobs;
        this.education = data.education;
        this.other = data.other;
        this.general = data.general;
        this.spacing = data.spacing;
        this.setScheme(data.colorScheme);
        this.LANG = data.language;
        this.IMAGE = data.image;
        this.setLS('CVcolorScheme', this.SCHEME);
        this.setLS('CVLanguage', this.LANG);
        this.setLS('CVImage', this.IMAGE);
        this.setLS('contact', JSON.stringify(this.contact));
        this.setLS('skills', JSON.stringify(this.skills));
        this.setLS('jobs', JSON.stringify(this.jobs));
        this.setLS('education', JSON.stringify(this.education));
        this.setLS('other', JSON.stringify(this.other));
        this.setLS('general', JSON.stringify(this.general));
        this.setLS('spacing', JSON.stringify(this.spacing));
      };
    };
    input.click();
  }

  static reset() {
    localStorage.clear();
    if (this.cookiesAllowed) {
      this.acceptCookies();
    }
    window.location.reload();
  }
}
