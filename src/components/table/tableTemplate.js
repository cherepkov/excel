/* eslint-disable no-unused-vars */
const CODES = {
  A: 65,
  Z: 90
}

// function toCell(content, col) {
//   return `
//   <div class="cell" contenteditable="true" data-col-index=${col}>
//     ${content}
//   </div>
//   `
// }

function toCell(row) {
  return function(content, col) {
    return `
      <div
        class="cell"
        contenteditable="true"
        data-col-index=${col}
        data-type="cell"
        data-id=${row}:${col}
      >
        ${content}
      </div>`
  }
}

function toColumn(content, index) {
  return `
  <div class="colomn" data-type='resizable' data-col-index=${index}>
    ${content}
    <div class='col-resize' data-resize='col'></div>
  </div>
  `
}

function createRow(content, index='') {
  const resizer = index ? `<div class='row-resize' data-resize='row'></div>` : ''
  return `
    <div class="row" data-type='resizable'>
      <div class="row-info">
        ${index}
        ${resizer}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowCount=15) {
  const colsCount=CODES.Z - CODES.A + 1
  const rows = [];
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  rows.push(createRow(cols));
  for (let row=0; row<rowCount; row++) {
    const cell = new Array(colsCount)
        .fill('')
        .map(toCell(row))
        .join('')
    rows.push(createRow(cell, row+1));
  }

  return rows.join('');
}
