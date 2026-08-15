// This file is responsible for defining a "reactive" primitive.
// You are trying to make some of the frontend logic more reactive and less imperative,
//  but don't want to introduce frameworks to do so.
// Reactive code can be harder to follow, but it does make more complex code easier to manage IMO.
// See the login page for an example of it in use - it definitely simplified things.
export default class Signal<T> {
  private _value: T;
  private subscribers: Array<(val: T) => void> = [];

  constructor(initial: T) {
    this._value = initial;
  }

  get value(): T {
    return this._value;
  }

  set value(next: T) {
    this._value = next;
    
    this.subscribers.forEach(fn => fn(next));
  }

  subscribe(fn: (val: T) => void) {
    this.subscribers.push(fn);
  }
}
