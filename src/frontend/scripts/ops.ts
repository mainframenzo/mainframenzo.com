// This file is responsible for upgrading the ops dashboard if JavaScript is enabled.

// We need these pre-loaded so that when we request the pre-rendered HTML, we don't have to load the chart deps.
// @ts-ignore
import Chart from 'chart.js/auto';
// @ts-ignore
//import { getRelativePosition } from 'chart.js/helpers';
import 'active-table';

import './ops.chart.line';
import './ops.chart.pie';
import './ops.chart.bar';

import * as api from './api';
import { frontendState } from './state';

export const tryUpgradeOpsDashboard = async () => {
  const opsDashboard = new OpsDashboard();
  await opsDashboard.init();
};

class OpsDashboard {
  private readonly defaultElement: HTMLDivElement;
  private readonly element: HTMLDivElement;

  private metricsWindowsElement?: HTMLDivElement;

  constructor() {
    this.defaultElement = document.getElementById('ops-401') as HTMLDivElement;
    this.element = document.getElementById('ops-200') as HTMLDivElement;

    if (frontendState.get().loggedIn) {
      this.defaultElement.style.visibility = 'hidden';
      this.defaultElement.style.display = 'none';

      this.element.removeAttribute('hidden');
    }
  }

  async init() {
    try {
      const html = await api.getOpsDashboard();
      console.debug('html', html);

      this.element.innerHTML = html;

      // In case we lose access to the backend, cache the last good result.
      frontendState.put({ ...frontendState.get(), opsDashboardHtml: html, opsDashboardLastUpdated: new Date() });

      this.metricsWindowsElement = document.getElementById('metrics-windows') as HTMLDivElement;
      console.debug('metricsWindowsElement', this.metricsWindowsElement);

      this.metricsWindowsElement.querySelectorAll<HTMLLIElement>('li[data-window]').forEach((li) => {
        li.addEventListener('click', () => this.onMetricWindowSelect(li));

        const metricWindow = li.dataset.window;
        if (!metricWindow) {
          return;
        }

        if (metricWindow === frontendState.get().metricWindow) {
          this.updateMetricWindowSelection(li);
        }
      });
    } catch (error) {
      console.error('failed to get ops dashboard', error);

      if (frontendState.get().opsDashboardHtml) {
        this.element.innerHTML = frontendState.get().opsDashboardHtml!;

        // FIXME Some sort of visual to indicate use of outdated info.
      } else {
        // FIXME Error display.
      }
    }
  }

  private updateMetricWindowSelection(li: HTMLLIElement) {
    console.trace('updateMetricWindowSelection', li);

    if (!this.metricsWindowsElement) { return; }

    this.metricsWindowsElement
      .querySelectorAll('li[data-window]')
      .forEach((element) => element.classList.remove('active'));
    li.classList.add('active');
  }

  private async onMetricWindowSelect(li: HTMLLIElement) {
    console.trace('onMetricWindowSelect', li);

    if (!this.metricsWindowsElement) { return; }

    const metricWindow = li.dataset.window;
    if (!metricWindow) {
      console.warn('clicked li has no data-window attribute', li);

      return;
    }

    this.updateMetricWindowSelection(li);

    // When requests are made to API for data they'll send metric window from state with request.
    frontendState.put({ ...frontendState.get(), metricWindow });

    await this.init();
  }
}
