import { Component } from '@angular/core';
import { PropsService } from '../service/props.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent {
  iconBasePath = 'assets/icons/logos/';

  getSkillsInfo(): any[][] {
    return this.formatSkillsArray(PropsService.getSkills());
  }

  formatSkillsArray(skills: any[]): any[][] {
    // sort skills alphabetically
    skills.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    // create array of arrays of skills
    const skillsArray: any[][] = [];
    let row: any[] = [];
    skills.forEach((skill, index) => {
      if (skill.url == '') {
        skill.url =
          this.iconBasePath +
          (skill.name.toLowerCase() == 'c#'
            ? 'csharp'
            : skill.name.toLowerCase()) +
          '.png';
      }
      row.push(skill);
      if ((index + 1) % 3 === 0) {
        skillsArray.push(row);
        row = [];
      }
    });
    if (row.length > 0) {
      skillsArray.push(row);
    }
    return skillsArray;
  }
}
