import { Component } from '@angular/core';
import { PropsService } from '../service/props.service';
import { MarkdownCompiler, MarkdownElement } from 'src/utils/MarkdownCompiler';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss'],
})
export class OtherComponent {
  getOtherInfo(): any[] {
    return PropsService.getOther();
  }

  getSpacingByName(name: string): number {
    return PropsService.getSpacingByName(name);
  }
}
