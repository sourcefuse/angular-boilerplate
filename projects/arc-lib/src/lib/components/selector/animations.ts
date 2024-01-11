import {animate, state, style, transition, trigger} from '@angular/animations';

export const dropdownAnimation = trigger('dropdownPanel', [
  state(
    'void',
    style({
      opacity: 0,
      transform: 'scaleY(0.6)',
    }),
  ),
  state(
    'open',
    style({
      opacity: 1,
      transform: 'scaleY(1)',
    }),
  ),
  transition('void => open', animate('80ms cubic-bezier(0, 0, 0.2, 1)')),
  transition('open => void', animate('80ms cubic-bezier(0, 0, 0.2, 1)')),
]);

export const rotateAnimation = trigger('rotate', [
  state(
    'closed',
    style({
      transform: 'rotate(0deg)',
    }),
  ),
  state(
    'open',
    style({
      transform: 'rotate(180deg)',
    }),
  ),
  transition('* => *', [animate('0.3s')]),
]);
