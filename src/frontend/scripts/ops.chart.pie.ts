// This file is responsible for defining a <pie-chart> web component.
// These charts are used on the ops dashboard.
import {
  Chart,
  PolarAreaController,
  PointElement,
  CategoryScale,
  Legend,
  Tooltip,
  Filler,
  type ChartConfiguration,
  type ChartDataset,
} from 'chart.js';

Chart.register(
  PolarAreaController,
  PointElement,
  CategoryScale,
  Legend,
  Tooltip,
  Filler
);

export class PieChartElement extends HTMLElement {
  private chart?: Chart;
  private canvas?: HTMLCanvasElement;

  static get observedAttributes(): string[] {
    return ['labels', 'datasets', 'title'];
  }

  constructor() {
    super();

    this.classList.add('pie-chart-el');
    this.innerHTML = `
      <div class="pie-chart-el__container">
        <canvas class="pie-chart-el__canvas"></canvas>
      </div>
    `;
  }

  connectedCallback(): void {
    this.canvas = this.querySelector('canvas')!;

    setTimeout(() => this.initChart(), 0);
  }

  private initChart(): void {
    console.trace('<pie-chart>: initChart');

    const title = this.getAttribute('title')!;
    const labelsAttribute = this.getAttribute('labels')!;
    const datasetsAttribute = this.getAttribute('datasets')!;

    let labels: string[];
    let datasets: IPieChartDataset[];

    try {
      labels = JSON.parse(labelsAttribute);
      datasets = JSON.parse(datasetsAttribute);
    } catch (error) {
      console.error('<pie-chart>: failed to parse attributes', error);

      return;
    }

    this.chart?.destroy();
    this.chart = new Chart(this.canvas!, this.getChartConfig({ labels, datasets, title }));
  }

  private getChartConfig(options: IPieChartOptions): ChartConfiguration<'polarArea'> {
    console.trace('<pie-chart>: getChartConfig');

    const { labels, datasets, title } = options;

    return {
      type: 'polarArea',
      data: {
        labels,
        datasets: datasets.map(
          (dataset): ChartDataset<'polarArea'> => ({
            label: dataset.label,
            data: dataset.data,
            //borderColor: '#4f46e5',
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
        // interaction: {
        //   mode: 'nearest',
        //   axis: 'x',
        //   intersect: false
        // },
        // scales: {
        //   x: {
        //     grid: {
        //       display: true
        //     }
        //   },
        //   y: {
        //     beginAtZero: true,
        //     grid: {
        //       color: 'rgba(0,0,0,0.05)'
        //     }
        //   }
        // }
      }
    };
  }

  setData(options: IPieChartOptions): void {
    console.trace('<pie-chart>: setData');

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

export interface IPieChartDataset {
  readonly label: string;
  readonly data: number[];
  readonly backgroundColor: string[];
}

export interface IPieChartOptions {
  readonly title: string;
  readonly labels: string[];
  readonly datasets: IPieChartDataset[];
}

customElements.define('pie-chart', PieChartElement);
