import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ResizeDirective} from './resize.directive';

@NgModule({
  declarations: [ResizeDirective],
  imports: [CommonModule],
  exports: [ResizeDirective],
})
export class ResizeModule {}
