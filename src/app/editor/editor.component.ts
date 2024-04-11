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
  text: string = '';

  errorMessage = '';

  @Output() closeEmitter = new EventEmitter();

  ngOnInit(): void {
    this.text = PropsService.getJsonAsString(this.name);
    this.text = JSON.stringify(JSON.parse(this.text), null, 2);
  }

  save() {
    // check if text is valid json
    try {
      JSON.parse(this.text);
    } catch (e: any) {
      this.errorMessage = e.message;
      return;
    }
    PropsService.saveContent(this.name, this.text);
    this.close();
  }

  @HostListener('document:keydown.escape', ['$event'])
  close(): void {
    this.errorMessage = '';
    this.closeEmitter.emit();
  }
}
