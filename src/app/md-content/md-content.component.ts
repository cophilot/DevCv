import { Component, Input } from '@angular/core';
import {
  MarkdownCompiler,
  MarkdownElement,
  MarkdownElementType,
} from 'src/utils/MarkdownCompiler';

@Component({
  selector: 'app-md-content',
  templateUrl: './md-content.component.html',
  styleUrls: ['./md-content.component.scss'],
})
export class MdContentComponent {
  @Input() content: string = '';
  @Input() lightMode: boolean = false;

  getElements(): MarkdownElement[] {
    return MarkdownCompiler.compile(this.content);
  }

  text(): MarkdownElementType {
    return MarkdownElementType.Text;
  }

  link(): MarkdownElementType {
    return MarkdownElementType.Link;
  }

  bold(): MarkdownElementType {
    return MarkdownElementType.Bold;
  }

  italic(): MarkdownElementType {
    return MarkdownElementType.Italic;
  }

  styleBox(): MarkdownElementType {
    return MarkdownElementType.StyleBox;
  }
}
