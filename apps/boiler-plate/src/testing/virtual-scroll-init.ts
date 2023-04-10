import {ComponentFixture, flush} from '@angular/core/testing';
import {AnyObject} from '@boiler/core/api';
import {animationFrameScheduler} from 'rxjs';

/* refer
https://github.com/angular/components/blob/1565fa3e1e63705efc7f29f98fd1d0f4af66ee93/src/cdk/scrolling/virtual-scroll-viewport.spec.ts#L897
*/
export function finishVirtualScrollInit(fixture: ComponentFixture<AnyObject>) {
  // On the first cycle we render and measure the viewport.
  fixture.detectChanges();
  flush();

  // On the second cycle we render the items.
  fixture.detectChanges();
  flush();

  // Flush the initial fake scroll event.
  animationFrameScheduler.flush();
  flush();
  fixture.detectChanges();
}
