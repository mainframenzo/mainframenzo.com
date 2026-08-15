// This file is responsible for defining a <line-chart> web component.
// These charts are used on the ops dashboard.
import { Chart, ChartConfiguration, ChartDataset, registerables } from 'chart.js';
Chart.register(...registerables);

export class LineChartElement extends HTMLElement {
  private chart?: Chart;
  private canvas?: HTMLCanvasElement;

  static get observedAttributes(): string[] {
    return ['labels', 'datasets', 'title'];
  }

  constructor() {
    super();

    this.classList.add('line-chart-el');
    this.innerHTML = `
      <div class="line-chart-el__container">
        <canvas class="line-chart-el__canvas"></canvas>
      </div>
    `;
  }

  connectedCallback(): void {
    this.canvas = this.querySelector('canvas')!;

    setTimeout(() => this.initChart(), 0);
  }

  private initChart(): void {
    console.trace('<line-chart>: initChart');

    const title = this.getAttribute('title')!;
    const labelsAttribute = this.getAttribute('labels')!;
    const datasetsAttribute = this.getAttribute('datasets')!;

    let labels: string[];
    let datasets: ILineChartDataset[];

    try {
      labels = JSON.parse(labelsAttribute);
      datasets = JSON.parse(datasetsAttribute);
    } catch (error) {
      console.error('<line-chart>: failed to parse attributes', error);

      return;
    }

    let alarms: ILineChartAlarmDataset[] = [];

    try {
      alarms = JSON.parse(this.getAttribute('alarms')!);
    } catch (error) {
      console.warn('<line-chart>: failed to parse alarms', error);

      return;
    }

    this.chart?.destroy();
    this.chart = new Chart(this.canvas!, this.getChartConfig({ labels, datasets, title, alarms }));
  }

  private getChartConfig(options: ILineChartOptions): ChartConfiguration<'line'> {
    console.trace('<line-chart>: getChartConfig', options);

    const labels = options.labels;
    let datasets = options.datasets;
    const title = options.title;
    const alarms = options.alarms;

    if (alarms && alarms.length > 0) {
      datasets = datasets.concat(
        alarms.map(dataset => {
          return {
            label: dataset.label,
            data: dataset.data,
            borderColor: 'red',
            backgroundColor: 'rgba(79, 70, 229, 0.1)',
            fill: false,
            tension: 0.3,
            pointRadius: 4,
            pointHoverRadius: 6
          }
        })
      );
    }

    return {
      type: 'line',
      data: {
        labels,
        datasets: datasets.map(
          (dataset): ChartDataset<'line'> => ({
            label: dataset.label,
            data: dataset.data,
            borderColor: dataset.borderColor ?? '#4f46e5',
            backgroundColor: dataset.backgroundColor ?? 'rgba(79, 70, 229, 0.1)',
            fill: dataset.fill ?? false,
            tension: dataset.tension ?? 0.3,
            pointRadius: 4,
            pointHoverRadius: 6,
          })
        ),
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: title
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        },
        scales: {
          x: {
            grid: {
              display: true
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0,0,0,0.05)'
            }
          }
        }
      }
    };
  }

  setData(options: ILineChartOptions): void {
    console.trace('<line-chart>: setData');

    this.chart?.destroy();

    this.chart = new Chart(this.canvas!, this.getChartConfig(options));
  }

  attributeChangedCallback(): void {
    this.initChart();
  }

  disconnectedCallback(): void {
    this.chart?.destroy();
    this.chart = undefined;
  }
}

export interface ILineChartDataset {
  readonly label: string;
  readonly data: number[];
  readonly borderColor?: string;
  readonly backgroundColor?: string;
  readonly fill?: boolean;
  readonly tension?: number;
}

// FIXME Actually define alarms.
export interface ILineChartAlarmDataset {
  readonly label: string;
  readonly data: number[];
}

export interface ILineChartOptions {
  readonly title: string;
  readonly labels: string[];
  readonly datasets: ILineChartDataset[];
  readonly alarms: ILineChartAlarmDataset[];
}

customElements.define('line-chart', LineChartElement);
