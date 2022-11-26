import {ExcelComponent} from '@core/ExcelComponent';

export class Table extends ExcelComponent {
  static className='excel__table';
  toHTML() {
    return `
    <div class="row">
    <div class="row-info"></div>
    <div class="row-data">
      <div class="colomn">A</div>
      <div class="colomn">B</div>
      <div class="colomn">C</div>
      <div class="colomn">D</div>
    </div>
  </div>
  <div class="row">
    <div class="row-info">1</div>
    <div class="row-data">
      <div class="cell selected" contenteditable>A</div>
      <div class="cell" contenteditable>B</div>
      <div class="cell" contenteditable>C</div>
      <div class="cell" contenteditable>D</div>
    </div>
  </div>
  <div class="row">
    <div class="row-info">2</div>
    <div class="row-data">
      <div class="cell">A</div>
      <div class="cell">B</div>
      <div class="cell">C</div>      
    </div>
  </div>
  `
  }
}
