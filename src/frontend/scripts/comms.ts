// This file is responsible for providing an event emitter interface.
import { EventBus, createEventDefinition } from 'ts-bus';

export const bus = new EventBus();

const eventPrefix = 'meblog';
export const konamiCodeEnteredEvent = createEventDefinition<{}>()(`${eventPrefix}.konamiCodeEntered`);
export const nextSlideEvent = createEventDefinition<{}>()(`${eventPrefix}.nextSlide`);
export const previousSlideEvent = createEventDefinition<{}>()(`${eventPrefix}.previousSlide`);

export const konamiCodeEntered = (params: {}) => {
  bus.publish(konamiCodeEnteredEvent(params));
}

export const nextSlide = (params: {}) => {
  bus.publish(nextSlideEvent(params));
}

export const previousSlide = (params: {}) => {
  bus.publish(previousSlideEvent(params));
}