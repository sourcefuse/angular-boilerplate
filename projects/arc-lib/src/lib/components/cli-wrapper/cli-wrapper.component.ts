import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'lib-cli-wrapper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cli-wrapper.component.html',
  styleUrls: ['./cli-wrapper.component.scss'],
})
export class CliWrapperComponent {
  @Input() command: string; // Define an input property to receive command data
}
