// This file is responsible for providing a way to store frontend state (and broadcast changes) that persists on reload and across component lifecycle.
import ls from 'localstorage-slim';

const defaultFrontendState: IFrontendState = {
  loggedIn: false,
  bearer_token: undefined,
  opsDashboardHtml: undefined,
  opsDashboardLastUpdated: undefined,
  metricWindow: '1d'
};

interface IFrontendState {
  loggedIn: boolean;
  bearer_token?: string;
  opsDashboardHtml?: string;
  opsDashboardLastUpdated?: Date;
  metricWindow: string;
}

export class FrontendState {
  private subscribers: Map<number, CallableFunction> = new Map<number, CallableFunction>();

  constructor() {
    const state = ls.get('state') as IFrontendState;
    console.debug('state', state);

    if (state == null) {
      ls.set('state', defaultFrontendState);
    }
  }

  get(): IFrontendState {
    const state = ls.get('state') as IFrontendState;
    console.debug('state', state);

    return state;
  }

  reset() {
    ls.set('state', defaultFrontendState);

    for (const subscriber of this.subscribers.values()) {
      subscriber(defaultFrontendState);
    }

    window.location.href = '/login.html';
  }

  put(state: IFrontendState) {
    console.trace('put state');
    console.debug(JSON.stringify(state, null, 2));

    ls.set('state', state);

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

  setLoggedIn(bearer_token: string) {
    const state = this.get();

    state.loggedIn = true;
    state.bearer_token = bearer_token;

    this.put(state);
  }

  setLoggedOut() {
    const state = this.get();

    state.loggedIn = false;
    delete state.bearer_token;

    this.put(state);
  }
}

const frontendState = new FrontendState();

export { frontendState }
