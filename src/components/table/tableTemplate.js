/* eslint-disable no-unused-vars */
const CODES = {
  A: 65,
  Z: 90
}

function toCell(content, index) {
  // console.log(index)
  return `
  <div class="cell" contenteditable="true" data-col-index=${index+1}>
    ${content}
  </div>
  `
}

function toColumn(content, index) {
  return `
  <div class="colomn" data-type='resizable' data-col-index=${index+1}>
    ${content}
    <div class='col-resize' data-resize='col' ></div>
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
  for (let i=0; i<rowCount; i++) {
    const cell = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('')
    rows.push(createRow(cell, i+1));
  }

  return rows.join('');
}
