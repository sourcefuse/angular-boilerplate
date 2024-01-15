import {ResizeDirective} from './resize.directive';
import {ResizeService} from './resize.service';

describe('ResizeDirective', () => {
  it('should create an instance', () => {
    const service = new ResizeService();
    const dummyElement = document.createElement('div');
    const directive = new ResizeDirective(service, {
      nativeElement: dummyElement,
    });
    expect(directive).toBeTruthy();
  });
});
