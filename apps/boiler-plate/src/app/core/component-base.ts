import {Directive, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
/*
ComponentBaseDirective is directive that implements the OnDestroy lifecycle hook
that defines ngOnDestroy() method which allows for the clean-up of resources
when the component is destroyed.
 */
@Directive()
export class ComponentBaseDirective implements OnDestroy {
  protected _destroy$: Subject<void> = new Subject();

  ngOnDestroy() {
    this.clearAllSubscriptions();
  }

  clearAllSubscriptions() {
    this._destroy$.next();
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }
  /**
   * This function blurs the currently active HTML button element.
   */
  blurActiveElement() {
    (document.activeElement as HTMLButtonElement)?.blur?.();
  }
}
