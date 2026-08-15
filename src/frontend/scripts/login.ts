// This file is responsible for providing login page functionality.
// Login isn't an upgrade: the features you get from being "authed" are only supported when JavaScript is enabled,
//  though you can submit a valid POST request via the form (this site only use LocalStorage,
//  so nothing will happen on success).
import * as api from './api';
import Signal from './signal';
import * as constants from './constants';

export const tryUpgradeLoginPage = () => {
  const loginElement = document.getElementById('login-page') as HTMLElement;

  const loginPage = new LoginPage(loginElement);
  loginPage.upgrade();
};

class LoginPage {
  private readonly usernameInput: HTMLInputElement;
  private readonly passwordInput: HTMLInputElement;
  private readonly loginButton: HTMLButtonElement;
  private readonly errorMessageElement: HTMLDivElement;

  private username = new Signal<string | undefined>(undefined);
  private password = new Signal<string | undefined>(undefined);
  private error = new Signal<string | undefined>(undefined);
  private submitting = new Signal(false);

  constructor(_element: Element) {
    this.usernameInput = document.getElementById('username') as HTMLInputElement;
    this.passwordInput = document.getElementById('password') as HTMLInputElement;
    this.loginButton = document.getElementById('login-button') as HTMLButtonElement;
    this.errorMessageElement = document.getElementById('login-error') as HTMLDivElement;
    this.errorMessageElement.style.visibility = 'hidden';
  }

  upgrade() {
    console.trace('upgrade LoginPage');

    this.errorMessageElement.innerHTML = 'FIXME';

    for (const eventToListenTo of ['blur', 'input']) {
      this.usernameInput.addEventListener(eventToListenTo, (event: Event) => {
        console.debug(`${eventToListenTo}: username event`, event);

        this.username.value = (event.target as HTMLInputElement).value;
      });

      this.passwordInput.addEventListener(eventToListenTo, (event: Event) => {
        console.debug(`${eventToListenTo}: password event`, event);

        this.password.value = (event.target as HTMLInputElement).value;
      });
    }

    this.username.subscribe(username => this.error.value = username !== undefined && username !== '' ? undefined : 'Username is not valid.');
    this.password.subscribe(password => this.error.value = password !== undefined && password !== '' ? undefined : 'Password is not valid.');

    this.error.subscribe(error => {
      this.errorMessageElement.style.visibility = error ? 'visible' : 'hidden';
      if (!error) { return; }

      this.errorMessageElement.innerHTML = error;
    });

    this.loginButton.addEventListener('click', async (event: Event) => {
      event.preventDefault();

      // All the reasons not to submit a login request (the UI already reflects the reason(s) to you):
      if (this.submitting.value) { return; }
      if (this.error.value) { return; }

      console.debug('logging in...');

      // Actually submit the login request, don't allow it again until after you get a response back.
      this.submitting.value = true; // State so you can't click the login button again.

      try {
        await api.login(this.username.value!, this.password.value!);

        await sleep(200);

        window.location.href = constants.defaultAuthedPage; // Your "dashboard".
      } catch (error) {
        console.error('failed to login', error);

        this.error.value = (error as Error).message ? `Failed to login: ${(error as Error).message}` : 'Failed to login.';
      } finally {
        // Regardless of success or failure:
        this.submitting.value = false; // Cleanup state to you to click submit again now that your previous attempt has finished.
      }
    });

    this.submitting.subscribe(submitting => {
      this.loginButton.disabled = submitting;
    });
  }
}

const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
