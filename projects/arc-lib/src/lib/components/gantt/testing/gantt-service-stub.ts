import {ElementRef, Injectable} from '@angular/core';
import {AnyObject} from '@project-lib/core/api';

import {Subject} from 'rxjs';
import {
  GanttEvent,
  GanttRenderOptions,
  Timelines,
  GanttScaleOptions,
} from '../types';

@Injectable()
export class GanttServiceStub<T extends AnyObject> {
  private _events = new Subject<GanttEvent<T>>();
  private _offset = new Subject<number>();
  get events() {
    return this._events.asObservable();
  }

  get offset() {
    return this._offset.asObservable();
  }

  render(container: ElementRef, options: GanttRenderOptions) {
    // this is intentional
  }

  feed(data: T[]) {
    // this is intentional
  }

  setScale(type: Timelines, options?: GanttScaleOptions, render = true) {
    // this is intentional
  }

  refreshInfiniteScroll() {
    // this is intentional
  }

  destroy() {
    // this is intentional
  }

  clear() {
    // this is intentional
  }

  closeContextMenu() {
    // this is intentional
  }

  triggerEvent(event: GanttEvent<T>) {
    this._events.next(event);
  }
}
