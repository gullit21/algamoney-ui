import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
    <div *ngIf="temErro()" class="ui-messages-error">
        <p-message
            severity="error" text="{{ this.text }}"></p-message>
    </div>
  `,
  styles: [`
    .ui-messages-error {
        margin-top: 4px;
    }
  `]
})
export class MessageComponent {

  @Input() error: string;
  @Input() control: FormControl;
  @Input() text: string;

  temErro(): boolean {
      return this.control.hasError(this.error) && this.control.dirty;
  }
}
