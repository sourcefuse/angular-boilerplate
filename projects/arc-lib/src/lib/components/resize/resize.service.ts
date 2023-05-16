import { Injectable } from '@angular/core';
import { filter, map, Subject } from 'rxjs';
import { ResizeEvent } from './types';

@Injectable({
  providedIn: 'root',
})
export class ResizeService {
  private _resizeObserver: ResizeObserver;
  private _stream!: Subject<ResizeEvent & { target: Element }>;
  constructor() {
    this._resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { target } = entry;
        const { width, height } = entry.contentRect;
        this._stream.next({ target, width, height });
      }
    });
  }

  listen(element: HTMLElement) {
    if (!this._stream) {
      this._stream = new Subject();
    }
    return this._stream.asObservable().pipe(
      filter(({ target }) => target === element),
      map(({ width, height }) => ({ width, height }))
    );
  }

  observe(element: HTMLElement) {
    this._resizeObserver.observe(element);
  }

  unobserver(element: HTMLElement) {
    this._resizeObserver.unobserve(element);
  }
}
