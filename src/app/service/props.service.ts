import { Injectable } from '@angular/core';
import { getExampleByName } from 'src/utils/examples';
import { CookieMessageComponent } from '../cookie-message/cookie-message.component';
import * as CryptoJS from 'crypto-js';
import { PasswordInputComponent } from '../password-input/password-input.component';

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
  private static lockStorage = false;

  private static contact: any;
  private static general: any;
  private static skills: any;
  private static jobs: any;
  private static education: any;
  private static other: any;
  private static otherleft: any;
  private static spacing: any;
  private static settings: any;

  private static IMAGE =
    Math.random() > 0.1 ? 'assets/foto_square.jpg' : 'assets/foto_square2.jpg';

  private static backupData: any | null = null;

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

    this.otherleft = this.fetchContent('otherleft');
    this.addLanguage(this.otherleft);

    this.general = this.fetchContent('general');
    this.addLanguage(this.general);

    this.spacing = this.fetchContent('spacing');

    this.settings = this.fetchContent('settings');
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
      case 'otherleft':
        this.otherleft = JSON.parse(content);
        this.addLanguage(this.otherleft);
        break;
      case 'general':
        this.general = JSON.parse(content);
        this.addLanguage(this.general);
        break;
      case 'spacing':
        this.spacing = JSON.parse(content);
        break;
      case 'settings':
        this.settings = JSON.parse(content);
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

  static getOtherLeft(): any[] {
    this.init();
    return this.getJSONPropsByLanguage(this.otherleft);
  }

  static getGeneral(): any {
    this.init();
    return this.getJSONPropsByLanguage(this.general);
  }

  static getSettings(): any {
    this.init();
    return this.settings;
  }
  static getSettingsAsBoolean(name: string): any {
    this.init();
    return Boolean(this.settings[name]);
  }

  static getSpacing(): any {
    this.init();
    return this.spacing;
  }
  static getSpacingByName(name: string): number {
    if (name == undefined) {
      return 0;
    }

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
      case 'otherleft':
        return JSON.stringify(this.otherleft);
      case 'general':
        return JSON.stringify(this.general);
      case 'spacing':
        return JSON.stringify(this.spacing);
      case 'settings':
        return JSON.stringify(this.settings);
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
    if (!this.cookiesAllowed || this.lockStorage) {
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

  static exportSecure(key: string | undefined = undefined) {
    let downloadKey = false;
    if (key == undefined) {
      downloadKey = true;
      key = CryptoJS.lib.WordArray.random(10).toString();
    }
    const data = JSON.stringify(this.getAllData());
    const encrypted = CryptoJS.AES.encrypt(data, key).toString();

    const general = this.getGeneral();
    const name = general.firstname + '-' + general.lastname;

    let a = document.createElement('a');
    let file = new Blob([encrypted], {
      type: 'application/text',
    });
    a.href = URL.createObjectURL(file);
    a.download = name + '-DevCV.devcvs';
    a.click();

    if (!downloadKey) {
      return;
    }
    let keyFile = new Blob([key], {
      type: 'application/text',
    });
    a.href = URL.createObjectURL(keyFile);
    a.download = name + '-DevCV.key';
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
      otherleft: this.otherleft,
      general: this.general,
      spacing: this.spacing,
      settings: this.settings,
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
      const ending = file.name.split('.').pop().toLowerCase();
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        const data = reader.result as string;
        this.importData(data, ending === 'devcvs');
      };
    };
    input.click();
  }

  static importSecureUserData(dataString: string, key: string): boolean {
    try {
      const data = CryptoJS.AES.decrypt(dataString, key).toString(
        CryptoJS.enc.Utf8
      );
      const json = JSON.parse(data);

      this.lockTheStorage();
      this.createBackup();

      this.importData(json);
    } catch (e) {
      return false;
    }
    return true;
  }

  static importUserData(dataString: string) {
    this.lockTheStorage();
    this.createBackup();

    const data = JSON.parse(dataString);
    this.importData(data);
  }

  static async importData(data: any, secure = false) {
    if (secure) {
      const code = await PasswordInputComponent.show();
      if (code == undefined) {
        return;
      }
      data = CryptoJS.AES.decrypt(data, code).toString(CryptoJS.enc.Utf8);
    }
    try {
      const new_data = JSON.parse(data);
      data = new_data;
    } catch (e) {
      // do nothing
    }
    this.LANGUAGES = [];

    this.contact = this.getFieldOrExample(data, 'contact', true);
    this.skills = this.getFieldOrExample(data, 'skills', true);
    this.jobs = this.getFieldOrExample(data, 'jobs', true);
    this.education = this.getFieldOrExample(data, 'education', true);
    this.other = this.getFieldOrExample(data, 'other', true);
    this.otherleft = this.getFieldOrExample(data, 'otherleft', true);
    this.general = this.getFieldOrExample(data, 'general', true);
    this.spacing = this.getFieldOrExample(data, 'spacing', true);
    this.settings = this.getFieldOrExample(data, 'settings', true);
    this.setScheme(data.colorScheme);
    this.LANG = this.getFieldOrExample(data, 'language');
    this.IMAGE = this.getFieldOrExample(data, 'image');

    this.addLanguage(this.contact);
    this.addLanguage(this.skills);
    this.addLanguage(this.jobs);
    this.addLanguage(this.education);
    this.addLanguage(this.other);
    this.addLanguage(this.otherleft);
    this.addLanguage(this.general);
    if (this.LANGUAGES.includes(this.LANG) == false) {
      this.LANGUAGES.push(this.LANG);
    }

    if (this.LANGUAGES.length == 0) {
      this.LANGUAGES.push('EN');
      this.LANG = 'EN';
    }

    this.setLangIndex();

    this.setLS('CVcolorScheme', this.SCHEME);
    this.setLS('CVLanguage', this.LANG);
    this.setLS('CVImage', this.IMAGE);
    this.setLS('contact', JSON.stringify(this.contact));
    this.setLS('skills', JSON.stringify(this.skills));
    this.setLS('jobs', JSON.stringify(this.jobs));
    this.setLS('education', JSON.stringify(this.education));
    this.setLS('other', JSON.stringify(this.other));
    this.setLS('otherleft', JSON.stringify(this.otherleft));
    this.setLS('general', JSON.stringify(this.general));
    this.setLS('spacing', JSON.stringify(this.spacing));
    this.setLS('settings', JSON.stringify(this.settings));
  }

  static getFieldOrExample(data: any, key: string, fetchExample = false): any {
    // check if data has key
    if (data.hasOwnProperty(key)) {
      return data[key];
    }

    if (!fetchExample) {
      return {};
    }

    return getExampleByName(key);
  }

  static reset() {
    localStorage.clear();
    if (this.cookiesAllowed) {
      this.acceptCookies();
    }
    window.location.reload();
  }

  static lockTheStorage() {
    this.lockStorage = true;
  }

  static unlockTheStorage() {
    this.lockStorage = false;
  }

  static createBackup() {
    this.backupData = this.getAllData();
  }

  static setInitialised() {
    this.initial = true;
  }

  static restoreBackup() {
    if (this.backupData == null) {
      return;
    }
    this.importData(this.backupData);
    this.backupData = null;
  }
}
