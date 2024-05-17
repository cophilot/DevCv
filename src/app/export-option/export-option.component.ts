import { Component } from '@angular/core';
import { PropsService } from '../service/props.service';
import * as yaml from 'js-yaml';
import MarkdownIt from 'markdown-it';
import puppeteer from 'puppeteer';
@Component({
  selector: 'app-export-option',
  templateUrl: './export-option.component.html',
  styleUrls: ['./export-option.component.scss'],
})
export class ExportOptionComponent {
  static visible = false;

  static show() {
    ExportOptionComponent.visible = true;
  }

  hide() {
    ExportOptionComponent.visible = false;
  }

  isVisible() {
    return ExportOptionComponent.visible;
  }

  getCVasJSON() {
    let cv: any = {};
    //General
    let general = PropsService.getGeneral();
    general = { ...general };
    cv['Name'] = general.firstname + ' ' + general.lastname;
    delete general.firstname;
    delete general.lastname;
    for (const key in general) {
      if (general.hasOwnProperty(key)) {
        cv[key] = general[key];
      }
    }
    // contact
    let contact = PropsService.getContact();
    contact = [...contact];
    const newContact: any = {};
    contact.forEach((item) => {
      newContact[item.text] = item.link;
    });
    cv['Contact'] = newContact;
    // Skills
    let skills = PropsService.getSkills();
    skills = [...skills];
    skills = JSON.parse(JSON.stringify(skills));
    skills.forEach((item) => {
      delete item.url;
    });
    cv['Skills'] = skills;
    // education
    let education = PropsService.getEducation();
    education = [...education];
    cv['Education'] = education;
    // jobs
    let jobs = PropsService.getJobs();
    jobs = [...jobs];
    cv['Jobs'] = jobs;
    // other
    let other = PropsService.getOther();
    other = [...other];
    other = JSON.parse(JSON.stringify(other));
    other.forEach((item) => {
      const title = item.title;
      delete item.title;
      delete item.id;
      if (item.description === '') {
        item = item.list;
      } else if (item.list.length === 0) {
        item = item.description;
      }
      cv[title] = item;
    });
    cv = JSON.parse(JSON.stringify(cv));
    return cv;
  }

  getFileName(ending: string) {
    if (!ending.startsWith('.')) {
      ending = '.' + ending;
    }
    const general = PropsService.getGeneral();
    const lang = PropsService.getLanguage();
    return (
      general.firstname + '-' + general.lastname + '-' + lang + '-CV' + ending
    );
  }

  getMarkdown() {
    const cv = this.getCVasJSON();
    let markdown = '# ' + cv['Name'] + '\n\n';
    delete cv['Name'];

    markdown += 'Date of Birth: **' + cv['dob'] + '**\n';
    delete cv['dob'];
    markdown += 'Place of Birth: **' + cv['pob'] + '**\n\n';
    delete cv['pob'];

    markdown += '## Contact\n\n';
    const contact = cv['Contact'];
    delete cv['Contact'];
    for (const key in contact) {
      markdown += '- [' + key + '](' + contact[key] + ')\n';
    }

    markdown += '\n## Skills\n\n';
    const skills = cv['Skills'];
    delete cv['Skills'];
    skills.forEach((item: any) => {
      markdown += '- [' + item.name + '](' + item.link + ')';
      if (item.level) {
        markdown += ' - ' + item.level + '/10';
      }
      markdown += '\n';
    });

    markdown += '\n## Education\n\n';
    const education = cv['Education'];
    delete cv['Education'];
    education.forEach((item: any) => {
      markdown +=
        '- **' + item.name + '** - ' + item.school + ' (' + item.year + ')';
      if (item.description && item.description !== '') {
        markdown += ': ' + item.description;
      }
      markdown += '\n';
    });

    markdown += '\n## Jobs\n\n';
    const jobs = cv['Jobs'];
    delete cv['Jobs'];
    jobs.forEach((item: any) => {
      markdown +=
        '- **' +
        item.job +
        '** - [' +
        item.company +
        '](' +
        item.url +
        ') (' +
        item.date +
        ')\n';
      if (item.description && item.description.length > 0) {
        item.description.forEach((desc: any) => {
          markdown += '  - ' + desc + '\n';
        });
      }
      markdown += '\n';
    });

    const languages = cv['languages'];
    delete cv['languages'];
    if (languages && languages.length > 0) {
      markdown += '\n## Languages\n\n';
      languages.forEach((item: any) => {
        markdown += '- ' + item + '\n';
      });
    }

    for (const key in cv) {
      markdown += '\n## ' + key + '\n\n';
      if (Array.isArray(cv[key])) {
        cv[key].forEach((item: any) => {
          markdown += '- ' + item + '\n';
        });
      } else {
        markdown += cv[key] + '\n';
      }
    }
    return markdown;
  }

  exportMarkdown() {
    const markdown = this.getMarkdown();
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = this.getFileName('.md');
    a.click();
  }

  exportPDF() {
    const markdown = this.getMarkdown();
    const md = new MarkdownIt();
    const html = md.render(markdown);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = this.getFileName('.pdf');
    a.click();
  }

  exportHTML() {
    const element = document.getElementById('export-cv');
    // export the element with style
    if (!element) {
      alert('Something went wrong. Please try again.');
      return;
    }
    const html = element.innerHTML;

    if (html) {
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = this.getFileName('.html');
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  exportJSON() {
    const cv = this.getCVasJSON();
    const json = JSON.stringify(cv, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = this.getFileName('.json');
    a.click();
  }

  exportYAML() {
    const cv = this.getCVasJSON();
    const yamlString = yaml.dump(cv);
    const blob = new Blob([yamlString], { type: 'application/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = this.getFileName('.yaml');
    a.click();
  }
}
