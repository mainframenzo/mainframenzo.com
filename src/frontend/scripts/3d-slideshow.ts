// This file is responsible for providing a function to turn <div class='threed-slideshow'> HTML elements with child <figure> and grand-child <img> tags into '3D slideshows' using the other child <model-viewer> tags.
// 'Slideshows' start off as 'scrollshows' (of thumbnails of the 3D models, in thise case) if JavaScript is disabled or fails to load and are upgraded if everything goes smoothly.
// 3D slidehows are WebXR compatible! FIXME implement this: https://modelviewer.dev/examples/augmentedreality/
// References:
// * https://github.com/leemark/better-simple-slideshow
// * https://modelviewer.dev/examples/augmentedreality/#webXR
import { ModelViewerElement } from '@google/model-viewer';

import * as comms from './comms';
import SwipeEvent from './swipe-event';
import * as observerState from './observer-state';

import '@google/model-viewer';

// Gets executed on page load and content may not exist.
export const tryUpgrade3DScrollshowsToSlideshows = () => {
  const slideshows: ThreedSlideshow[] = [];
  const slideshowElements = document.querySelectorAll('.threed-slideshow');

  slideshowElements.forEach(slideshowElement => {
    slideshows.push(new ThreedSlideshow(slideshowElement));
  });
};

class ThreedSlideshow {
  private slideNumber = -1;
  private readonly slides: NodeListOf<Element>;
  private readonly slideshowData: { name: string; description: string; filePath: string; thumbnailPath?: string; }[]; // FIXME Duplicate iface.
  private readonly currentSlideElement: Element | null;
  private readonly descriptionElement: Element | null;
  private readonly element: Element;
  private readonly previewElement: ModelViewerElement;
  private swipeEvent?: SwipeEvent;

  constructor(element: Element) {
    this.element = element;
    this.slides = element.querySelectorAll('figure');
    this.currentSlideElement = element.querySelector(`#${this.element.id}-current-slide`);
    this.descriptionElement = element.querySelector(`#${this.element.id}-description`);

    // Slide data stored as JSON in hidden div.
    const slideshowData = element.querySelector(`#${this.element.id}-data`)?.innerHTML;
    if (!slideshowData) { throw new Error('slideshow data not found, will not init 3d slideshow'); }
    this.slideshowData = JSON.parse(slideshowData) as { name: string; description: string; filePath: string; thumbnailPath?: string; }[];

    // JavaScript is an upgrade! All 3D content is pre-rendered as images and displayed by default. Remove them now.
    for (const [_index, slide] of this.slides.entries()) { slide.innerHTML = ''; }

    this.previewElement = element.querySelector(`model-viewer#${this.element.id}-model-viewer`) as ModelViewerElement;
    this.previewElement.addEventListener('load', (_event) => {
      if (!this.previewElement.model) { return; }

      const [material] = this.previewElement.model.materials;
      material.pbrMetallicRoughness.setBaseColorFactor('#0096ff'); // Make model a color that's more contrasting with the background.
      material.pbrMetallicRoughness.setMetallicFactor(.3); // Make model less shiny.
      material.pbrMetallicRoughness.setRoughnessFactor(0);
    });
    this.previewElement.classList.remove('threed-content'); // 3D content and adjacent elements not visible by default.
    
    this.descriptionElement?.classList.remove('threed-content'); // ^

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

  private hideSlide(_index: number) {} 

  private showSlide(index: number) {
    const slideData = this.slideshowData[index];

    this.previewElement.setAttribute('src', slideData.filePath);
    const fileName = slideData.filePath.replace(/^.*[\\\/]/, '')
    const fileNameNoExtension = fileName.replace('.stl.glb', '');

    if (this.descriptionElement) { this.descriptionElement.innerHTML = `<a href='${slideData.filePath}' target='_blank'>${fileNameNoExtension}</a><br/>${slideData.description}`; }

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

    this.element.querySelector('.threed-slideshow-next')?.addEventListener('click', () => { 
      this.slide(1); 
    });
    this.element.querySelector('.threed-slideshow-prev')?.addEventListener('click', () => { 
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
}