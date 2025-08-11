// This file is responsible for determining what observed element should be in control of slideshow controls.
// This is necessary because multiple build/3D slideshows can be viewed at once by a user,
//  but obviously one takes focus. 
// This file does not act on control, but rather lets callers of the functions here decide if they will take its advice.
// Apologies for the generic var/function names that reference the Intersection Observer API rather than this website's specific use for them - 
//  not sure how best to name things below for fastest grokking.
const observerEntries: Record<string, IntersectionObserverEntry> = {};
const priorityState: Record<string, boolean> = {};

export const putObserverState = (id: string, entry: IntersectionObserverEntry) => {
  observerEntries[id] = entry;

  // Based on entry, determine if any observed element (if at all) should be given slideshow control priority.
  // Get first isIntersecting state to make comparison against.
  let priorityId = observerEntries[id].isIntersecting ? id : undefined;
  let lastEntry = observerEntries[id].isIntersecting ? observerEntries[id] : undefined;

  for (const observerId in observerEntries) {
    const observerEntry = observerEntries[observerId];
    if (observerEntry.isIntersecting) {
      priorityId = observerId;
      lastEntry = observerEntry;

      break;
    }
  }

  // Determine priority state.
  
  if (!priorityId || !lastEntry) { return; } // Nothing in view.

  for (const observerId in observerEntries) {
    const observerEntry = observerEntries[observerId];
    if (observerEntry.intersectionRatio > lastEntry.intersectionRatio) {
      priorityId = observerId;
      lastEntry = observerEntry;
    }
  }

  // Reset priority state.
  for (const observerId in observerEntries) {
    priorityState[observerId] = false;
  }

  // FIXME Pulse the active one if different: https://weekendprojects.dev/posts/css-pulse-animation-on-hover/
  // Set new priority state.
  priorityState[priorityId] = true;
}

export const isObserverPriorityAndActive = (id: string): boolean => {
  return priorityState[id];
}