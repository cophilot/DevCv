import { Component, Input } from '@angular/core';
import { PropsService } from '../service/props.service';
import { MarkdownCompiler, MarkdownElement } from 'src/utils/MarkdownCompiler';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss'],
})
export class OtherComponent {
  @Input() content: any[] = [];
  @Input() lightMode: boolean = false;

  getOtherInfo(): any[] {
    return this.content;
    //return PropsService.getOther();
  }

  getSpacingByName(name: string): number {
    return PropsService.getSpacingByName(name);
  }

  isArray(arr: unknown): boolean {
    return Array.isArray(arr);
  }
}
