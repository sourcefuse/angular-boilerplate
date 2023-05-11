import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ComponentBaseDirective } from '../../core/component-base';
import { ResizeService } from './resize.service';
import { ResizeEvent } from './types';

@Directive({
  selector: '[Resize]',
})
export class ResizeDirective
  extends ComponentBaseDirective
  implements OnInit, OnDestroy
{
  constructor(private resizeService: ResizeService, private el: ElementRef) {
    super();
  }

  @Output()
  Resize = new EventEmitter<ResizeEvent>();

  ngOnInit() {
    this.resizeService.observe(this.el.nativeElement);
    this.resizeService.listen(this.el.nativeElement).subscribe((size) => {
      this.Resize.emit(size);
    });
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.resizeService.unobserver(this.el.nativeElement);
  }
}
