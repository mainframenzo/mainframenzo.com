// This file is responsible for providing a "swipe" event.
// Swipe events are abstractions used to determine if a user swiped in a specific direction on screen.
// Swipe events are used to tie busines logic to swipe direction.
// References:
// * https://stackoverflow.com/questions/62823062/adding-a-simple-left-right-swipe-gesture
import * as log from 'ts-app-logger';

export default class SwipeEvent {
  private static minPixelDistanceOfSwipe = 50;

  readonly startEvent: TouchEvent;
  private endEvent?: TouchEvent;

  constructor(startEvent: TouchEvent, endEvent?: TouchEvent) {
    this.startEvent = startEvent;
    this.endEvent = endEvent;
  }

  setEndEvent(endEvent: TouchEvent) {
    this.endEvent = endEvent;
  }

  isSwipeLeft() { return this.getSwipeDirection() === 'left'; }

  isSwipeRight() { return this.getSwipeDirection() === 'right'; }

  isSwipeUp() { return this.getSwipeDirection() === 'up'; }

  isSwipeDown() { return this.getSwipeDirection() === 'down'; }

  getSwipeDirection(): TSwipeDirection | undefined {
    if (!this.startEvent.changedTouches || !this.endEvent?.changedTouches) { 
      log.warn('can not determine wipe direction: start or end touch info missing'); 

      return;
    }

    const start = this.startEvent.changedTouches[0];
    const end = this.endEvent.changedTouches[0];

    if (!start || !end) { 
      log.warn('can not determine wipe direction: start or end pixels missing'); 

      return; 
    }

    const [horizontalDifference, verticalDifference] = this.calculatePixelDifference(start, end);

    const leftOrRightSwipe = this.isLeftOrRightSwipe(horizontalDifference, verticalDifference); 
    if (leftOrRightSwipe) { return leftOrRightSwipe; }

    const upOrDownSwipe = this.isUpOrDownSwipe(verticalDifference);
    if (upOrDownSwipe) { return upOrDownSwipe; }

    return;
  }

  private calculatePixelDifference(start: Touch, end: Touch): [number, number] {
    const horizontalDifference = start.screenX - end.screenX;
    const verticalDifference = start.screenY - end.screenY;

    return [horizontalDifference, verticalDifference];

  }

  private isLeftOrRightSwipe(horizontalDifference: number, verticalDifference: number): TSwipeDirection | undefined {
    if (Math.abs(horizontalDifference) > Math.abs(verticalDifference)) {
      if (horizontalDifference >= SwipeEvent.minPixelDistanceOfSwipe) {
        return 'left';
      } else if (horizontalDifference <= -SwipeEvent.minPixelDistanceOfSwipe) {
        return 'right';
      }
    }

    return;
  }

  private isUpOrDownSwipe(verticalDifference: number): TSwipeDirection | undefined {
    if (verticalDifference >= SwipeEvent.minPixelDistanceOfSwipe) {
      return 'up';
    } else if (verticalDifference <= -SwipeEvent.minPixelDistanceOfSwipe) {
      return 'down';
    }

    return;
  }
}

type TSwipeDirection = 'left' | 'right' | 'up' | 'down';
