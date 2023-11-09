import { Component } from '@angular/core';
import { PropsService } from '../service/props.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent {
  getJobsInfo(): any[] {
    return PropsService.getJobs();
  }
}
