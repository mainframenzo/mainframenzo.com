// This file is responsible for providing a function to turn <div class='build-slideshow'> HTML elements with child <figure> and grand-child <img> tags into 'build slideshows'.
// Slideshows are frequently described as carousels. I tried making a CSS-only carousel, but it was more work than it was worth.
// Plain 'ol HTML works just fine for scrolling from one image to another.
// 'Slideshows' start off as 'scrollshows' if JavaScript is disabled or fails to load and are upgraded if everything goes smoothly.
// References:
// * https://github.com/leemark/better-simple-slideshow
import * as comms from './comms';
import SwipeEvent from './swipe-event';
import * as observerState from './observer-state';

// Gets executed on page load and content may not exist.
export const tryUpgradeBuildScrollshowsToSlideshows = () => {
  const slideshows: BuildSlideshow[] = [];
  const slideshowElements = document.querySelectorAll('.build-slideshow');

  slideshowElements.forEach(slideshowElement => {
    slideshows.push(new BuildSlideshow(slideshowElement));
  });
};

class BuildSlideshow {
  private slideNumber = -1;
  private readonly slides: NodeListOf<Element>;
  private readonly currentSlideElement: Element | null;
  private readonly element: Element;
  private swipeEvent?: SwipeEvent;

  constructor(element: Element) {
    this.element = element;
    this.slides = element.querySelectorAll('figure');
    this.currentSlideElement = element.querySelector(`#${this.element.id}-current-slide`);

    // JavaScript is an upgrade! All images are displayed by default. Hide them now. 
    // Oh: coupled with the CSS transition, hiding makes a(n unintentionally) cool effect of 'images flashing before your very eyes'!
    for (const [_index, slide] of this.slides.entries()) {
      slide.classList.add('hide-figure');

      const images = slide.querySelectorAll('img');
      images.forEach(image => image.classList.add('hide-figure-img'));

      const figcaptions = slide.querySelectorAll('figcaption');
      figcaptions.forEach(figcaption => figcaption.classList.add('hide-figure-figcaption'));
    }

    this.slide(1);

    // There are lots of ways to move back/forward:
    // * Selecting left/right arrow icons
    // * Selecting left/right side of a photo (mobile/tablet) (double-selecting goes fullscreen)
    // * Swiping left/right (mobile/tablet)
    // * Left/right arrow keys (hardware with a keyboard)
    // Personally I find that on mobile tapping on right or left side of a photo is preferrable to swiping,
    //  but YMMV.
    this.addPreviousAndNextMouseControls();
    this.addPreviousAndNextSwipeControls();
    this.addPreviousAndNextKeyboardControls();
    this.addDoubleClickMobileControls();

    // Track if the slideshow is "in view" so we can use input to navigate it (back/forward).
    const observer = new IntersectionObserver((entries, _) => {
      entries.forEach(entry => { 
        observerState.putObserverState(this.element.id, entry);
      });
    }, {
      root: null,
      rootMargin: '0px'
    });
    observer.observe(this.element);
  }

  private slide(leftOrRight: number) {
    if (leftOrRight > 0) {
      this.slideNumber = (this.slideNumber + 1 === this.slides.length) ? 0 : this.slideNumber + 1;
    } else {
      this.slideNumber = (this.slideNumber - 1 < 0) ? this.slides.length- 1 : this.slideNumber - 1;
    }

    this.slides.forEach((_slide, index) => { this.hideSlide(index); });

    this.showSlide(this.slideNumber);
  }

  private hideSlide(index: number) { 
    const slide = this.slides.item(index);
    slide.classList.remove('show'); 

    const images = slide.querySelectorAll('img');
    images.forEach(image => image.classList.add('hide-figure-img'));

    const figcaptions = slide.querySelectorAll('figcaption');
    figcaptions.forEach(figcaption => figcaption.classList.add('hide-figure-figcaption'));
  }

  private showSlide(index: number) {
    const slide = this.slides.item(index);
    slide.classList.add('show'); 

    const images = slide.querySelectorAll('img');
    images.forEach(image => image.classList.remove('hide-figure-img'));

    const figcaptions = slide.querySelectorAll('figcaption');
    figcaptions.forEach(figcaption => figcaption.classList.remove('hide-figure-figcaption'));

    if (this.currentSlideElement) { this.currentSlideElement.innerHTML = `${index + 1}`; }
  }

  private addPreviousAndNextMouseControls() {
    this.slides.forEach(slide => {
      const images = slide.querySelectorAll('img');
      images.forEach(image => image.addEventListener('click', (event: MouseEvent) => {
        const xPosition = event.pageX - image.getBoundingClientRect().left;
        if (image.width / 2 >= xPosition) {
          this.slide(-1); 
        } else {
          this.slide(1); 
        }
      }));
    });

    this.element.querySelector('.build-slideshow-next')?.addEventListener('click', () => { 
      this.slide(1); 
    });
    this.element.querySelector('.build-slideshow-prev')?.addEventListener('click', () => { 
      this.slide(-1); 
    });
  }

  private addPreviousAndNextSwipeControls() {
    // @ts-expect-error
    this.element.addEventListener('touchstart', (event: TouchEvent ) => {
      this.swipeEvent = new SwipeEvent(event);
    });
    // @ts-expect-error
    this.element.addEventListener('touchend', (event: TouchEvent) => { 
      this.handleSwipe(event); 
    });
  }

  private handleSwipe(event: TouchEvent) {
    if (!this.swipeEvent) { return; }
    if (!observerState.isObserverPriorityAndActive(this.element.id)) { return; }

    this.swipeEvent.setEndEvent(event);

    // Whatever behavior I expected from this I did not get, 
    //  so I reversed the swipe directions to give me the behavior I expect.
    if (this.swipeEvent.isSwipeRight()) {
      this.slide(-1);
    } else if (this.swipeEvent.isSwipeLeft()) {
      this.slide(1);
    }

    this.swipeEvent = undefined;
  }

  private addPreviousAndNextKeyboardControls() {
    comms.bus.subscribe(comms.previousSlideEvent, async () => {
      if (!observerState.isObserverPriorityAndActive(this.element.id)) { return; }

      this.slide(-1);
    });

    comms.bus.subscribe(comms.nextSlideEvent, async () => {
      if (!observerState.isObserverPriorityAndActive(this.element.id)) { return; }

      this.slide(1);
    });
  }

  private addDoubleClickMobileControls() {
    // Double-clicking should trigger fullscreen of image.
    // @ts-expect-error
    this.element.addEventListener('touchend click', (event: TouchEvent) => {
      if (!this.swipeEvent) { return; }
      if (new Date().getTime() - this.swipeEvent.startEvent.timeStamp > 500) {
        requestFullScreen(this.element as HTMLElement);
      }
    });
  }
}

const requestFullScreen = (element: HTMLElement) => {
  if (!document.fullscreenElement) {
    element.requestFullscreen();

    return;
  } 

  document.exitFullscreen?.();
  element.requestFullscreen();
}