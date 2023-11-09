import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { PropsService } from '../service/props.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  @Input() name: string = 'Error';
  @Input() text: string = 'Error';

  @Output() closeEmitter = new EventEmitter();

  ngOnInit(): void {
    this.text = PropsService.getJsonAsString(this.name);
    // format json
    this.text = JSON.stringify(JSON.parse(this.text), null, 2);
  }

  save() {
    PropsService.saveContent(this.name, this.text);
    this.close();
  }

  @HostListener('document:keydown.escape', ['$event'])
  close(): void {
    this.closeEmitter.emit();
  }
}
