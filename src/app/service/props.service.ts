import { Injectable } from '@angular/core';
import {
  getExampleContact,
  getExampleEducation,
  getExampleGeneral,
  getExampleJobs,
  getExampleOther,
  getExampleSkills,
  getExampleSpacing,
} from 'src/utils/examples';

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

  private static IMAGE =
    Math.random() > 0.1 ? 'assets/foto_square.jpg' : 'assets/foto_square2.jpg';

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
    this.contact = getExampleContact();
    this.addLanguage(this.contact);

    this.skills = getExampleSkills();
    this.addLanguage(this.skills);

    this.jobs = getExampleJobs();
    this.addLanguage(this.jobs);

    this.education = getExampleEducation();
    this.addLanguage(this.education);

    this.other = getExampleOther();
    this.addLanguage(this.other);

    this.general = getExampleGeneral();
    this.addLanguage(this.general);

    this.spacing = getExampleSpacing();
    this.addLanguage(this.spacing);
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

  static saveContent(name: string, content: string) {
    switch (name.toLowerCase()) {
      case 'contact':
        this.contact = JSON.parse(content);
        break;
      case 'skills':
        this.skills = JSON.parse(content);
        break;
      case 'jobs':
        this.jobs = JSON.parse(content);
        break;
      case 'education':
        this.education = JSON.parse(content);
        break;
      case 'other':
        this.other = JSON.parse(content);
        break;
      case 'general':
        this.general = JSON.parse(content);
        break;
      case 'spacing':
        this.spacing = JSON.parse(content);
        break;
      default:
        return;
    }

    this.addLanguage(this.contact);
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
  }
}
