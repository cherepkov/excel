/* eslint-disable no-unused-vars */
const CODES = {
  A: 65,
  Z: 90
}

function toCell(content) {
  return `
  <div class="cell" contenteditable="true">
    ${content}
  </div>
  `
}

function toColumn(content) {
  return `
  <div class="colomn">
    ${content}
  </div>
  `
}

function createRow(content, index='') {
  return `
    <div class="row">
      <div class="row-info">${index}</div>
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
