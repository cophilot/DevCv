import { Component, Input } from '@angular/core';
import { ModeService } from '../service/mode.service';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
})
export class CvComponent {
  @Input() viewMode = false;

  ngOnInit() {
    ModeService.isViewMode = this.viewMode;
  }
}
