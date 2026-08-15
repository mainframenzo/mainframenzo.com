// This file is responsible for upgrading BOM tables if JavaScript is enabled.
// Currently it just fixes my Firefox styles (the browser I use) for Chrome (desktop).

//import { Grid, html, Cell, Row } from 'gridjs';

// Gets executed on page load and content may not exist.
export const tryUpgradeBOMs = () => {
  const bomElements = document.querySelectorAll('.bom');

  if (navigator.userAgent.includes('Chrome')) {
    bomElements.forEach(bomElement => {
      bomElement.classList.add('chrome');
    });
  }

  // FIXME It may be worth dropping Grid.js and rolling your own because of the inability to
  //  format entire rows.
  // * Links lost
  // * Legend styles lost
  // * Milligram styles mucking up sort buttons
  /*
  // Make BOMs more interactive. 
  bomElements.forEach(bomElement => {
    const tableData = [...(bomElement as HTMLTableElement).rows].map(t => [...t.children].map(u => (u as HTMLTableColElement).innerText));

    const table = new Grid({
      //columns: tableData[0],
      columns: [
        'Quantity',
        { 
          name: 'Type',
          formatter: (cell: Cell) => html(`<span class='bom-${cell}'>${cell}</span>`)
        },
        'File', // FIXME download link
        'Description',
        'Name',
        { 
          name: 'Link',
          formatter: (cell: Cell) => cell === 'N/A' ? html(cell) : html(`<a href='${cell}' target='_blank'>${cell}</a>`)
        },
        'Cost ($USD)',
        'Notes'
      ],
      search: true,
      resizable: true,
      //sort: true,
      data: tableData.splice(1, tableData.length - 1),
      className: { // FIXME This is variable.
        td: '',
        table: 'bom'
      }
    });

    bomElement.innerHTML = '';
    table.render(bomElement);
  });
  
  const bomSearchElements = document.querySelectorAll('input.gridjs-input.gridjs-search-input');
  bomSearchElements.forEach(bomSearchElement => { 
    // Override some of the Grid.js defaults.
    (bomSearchElement as HTMLInputElement).setAttribute('placeholder', 'Search BOM'); 
    (bomSearchElement as HTMLInputElement).setAttribute('aria-label', 'Search BOM'); 
  });
  */
};