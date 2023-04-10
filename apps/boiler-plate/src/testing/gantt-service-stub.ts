import {ElementRef, Injectable} from '@angular/core';
import {AnyObject} from '@boiler/core/api';
import {
  GanttEvent,
  GanttRenderOptions,
  GanttScaleOptions,
  Timelines,
} from '@boiler/shared/gantt';

import {Subject} from 'rxjs';

@Injectable()
export class GanttServiceStub<T extends AnyObject> {
  private _events = new Subject<GanttEvent<T>>();
  get events() {
    return this._events.asObservable();
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
