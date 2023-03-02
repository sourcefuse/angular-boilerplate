import {Directive, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

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

  blurActiveElement() {
    (document.activeElement as HTMLButtonElement)?.blur?.();
  }
}
