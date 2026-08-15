// This file is responsible for providing a way to store backend state (and broadcast changes).
import * as iface from './iface';

const defaultBackendState: iface.IBackendState = {
  opsHtmlPages: {
    '1m': undefined,
    '5m': undefined,
    '15m': undefined,
    '1h': undefined,
    '3h': undefined,
    '6h': undefined,
    '12h': undefined,
    '1d': undefined,
    '3d': undefined,
    '1w': undefined,
    '2w': undefined,
    '1mo': undefined
  }
};

export class BackendState {
  private state: iface.IBackendState = { ...defaultBackendState };
  private subscribers: Map<number, CallableFunction> = new Map<number, CallableFunction>();

  constructor() {
    console.debug('state', this.state);
  }

  get(): iface.IBackendState {
    //console.debug('state', this.state);

    return this.state;
  }

  reset() {
    this.state = { ...defaultBackendState };

    for (const subscriber of this.subscribers.values()) {
      subscriber(defaultBackendState);
    }
  }

  put(state: iface.IBackendState) {
    //console.trace('put state');
    //console.debug(JSON.stringify(state, null, 2));

    this.state = state;

    for (const subscriber of this.subscribers.values()) {
      subscriber(state);
    }
  }

  subscribe(subscriber: CallableFunction): number {
    const subscriberId = this.subscribers.size + 1;
    this.subscribers.set(subscriberId, subscriber);

    return subscriberId;
  }

  unsubscribe(subscriberId: number) { this.subscribers.delete(subscriberId); }
}

const backendState = new BackendState();

export { backendState }
