// This file is responsible for defining a <meblog-table> web component.
import { DataTable } from 'simple-datatables';

const template = document.createElement('template');
template.innerHTML = `
  <div class='meblog-table-container'>
    <table class='meblog-table'></table>
  </div>
`;

export class MEBLOGTableElement extends HTMLElement {
  private dataTable?: DataTable;
  private table?: HTMLTableElement;

  static get observedAttributes(): string[] {
    return ['data', 'text-columns', 'scroll-y'];
  }

  constructor() {
    super();
  }

  connectedCallback(): void {
    if (!this.querySelector('.meblog-table-container')) {
      const fragment = template.content.cloneNode(true) as DocumentFragment;

      this.appendChild(fragment);
    }

    this.table = this.querySelector('table')!;

    setTimeout(() => this.initTable(), 0);
  }

  private initTable(): void {
    console.trace('[meblog-table]: initTable');

    const dataAttribute = this.getAttribute('data')!;
    const textColumnsAttribute = this.getAttribute('text-columns');
    const scrollY = this.getAttribute('scroll-y') ?? '400px';

    const data = JSON.parse(dataAttribute);
    const textColumns = textColumnsAttribute ? JSON.parse(textColumnsAttribute) : [];

    this.dataTable?.destroy();
    this.dataTable = new DataTable(this.table!, this.getTableConfig({ data, textColumns, scrollY }));
  }

  private getTableConfig(options: {
    readonly data: {
      readonly headings: string[];
      readonly data: (string | number)[][];
    };
    readonly textColumns: number[];
    readonly scrollY?: string;
  }): DataTableOptions {
    console.trace('[meblog-table]: getTableConfig');

    const { data, textColumns, scrollY } = options;

    return {
      data,
      searchable: true,
      sortable: true,
      paging: false,
      scrollY,
      type: 'number', // Assume default number.
      columns: [
        { select: textColumns, type: 'string' }
      ]
    };
  }

  attributeChangedCallback(): void {
    this.initTable();
  }

  disconnectedCallback(): void {
    this.dataTable?.destroy();
    this.dataTable = undefined;
  }
}

type DataTableOptions = NonNullable<ConstructorParameters<typeof DataTable>[1]>;

customElements.define('meblog-table', MEBLOGTableElement);
