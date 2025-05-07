import { Component } from '@angular/core';
import { PropsService } from '../service/props.service';
import IconUtils from 'src/utils/IconUtils';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent {
  getJobsInfo(): any[] {
    return PropsService.getJobs();
  }

  getLanguage(): string {
    return PropsService.getLanguage();
  }

  parseIconPath(path: string) {
    const te = IconUtils.parseIconPath(path);
    console.log(te);
    return te;
  }
}
