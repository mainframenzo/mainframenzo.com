// This file is responsible for defining a <bar-chart> web component.
// These charts are used on the ops dashboard.
import {
  Chart,
  BarController,
  BarElement,
  PointElement,
  CategoryScale,
  Legend,
  Tooltip,
  Filler,
  type ChartConfiguration,
  type ChartDataset,
} from 'chart.js';

Chart.register(
  BarController,
  BarElement,
  PointElement,
  CategoryScale,
  Legend,
  Tooltip,
  Filler
);

export class BarChartElement extends HTMLElement {
  private chart?: Chart;
  private canvas?: HTMLCanvasElement;

  static get observedAttributes(): string[] {
    return ['labels', 'datasets', 'title'];
  }

  constructor() {
    super();

    this.classList.add('bar-chart-el');
    this.innerHTML = `
      <div class="bar-chart-el__container">
        <canvas class="bar-chart-el__canvas"></canvas>
      </div>
    `;
  }

  connectedCallback(): void {
    this.canvas = this.querySelector('canvas')!;

    setTimeout(() => this.initChart(), 0);
  }

  private initChart(): void {
    console.trace('<bar-chart>: initChart');

    const title = this.getAttribute('title')!;
    const labelsAttribute = this.getAttribute('labels')!;
    const datasetsAttribute = this.getAttribute('datasets')!;

    let labels: string[];
    let datasets: IBarChartDataset[];

    try {
      labels = JSON.parse(labelsAttribute);
      datasets = JSON.parse(datasetsAttribute);
    } catch (error) {
      console.error('<bar-chart>: failed to parse attributes', error);

      return;
    }

    this.chart?.destroy();
    this.chart = new Chart(this.canvas!, this.getChartConfig({ labels, datasets, title }));
  }

  private getChartConfig(options: IBarChartOptions): ChartConfiguration<'bar'> {
    console.trace('<bar-chart>: getChartConfig');

    const labels = options.labels;
    const datasets = options.datasets;
    const title = options.title

    return {
      type: 'bar',
      data: {
        labels,
        datasets: datasets.map(
          (dataset): ChartDataset<'bar'> => ({
            label: dataset.label,
            data: dataset.data,
            borderColor: dataset.borderColor,
            backgroundColor: dataset.backgroundColor
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

  setData(options: IBarChartOptions): void {
    console.trace('<bar-chart>: setData');

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

export interface IBarChartDataset {
  readonly label: string;
  readonly data: number[];
  readonly backgroundColor: string[];
  readonly borderColor: string[];
  readonly borderWidth: number;
}

export interface IBarChartOptions {
  readonly title: string;
  readonly labels: string[];
  readonly datasets: IBarChartDataset[];
}

customElements.define('bar-chart', BarChartElement);
