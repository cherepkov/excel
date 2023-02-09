/* eslint-disable no-unused-vars */
/* eslint-disable arrow-parens */
import {$} from '@core/dom';
import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/tableTemplate';
import {resizeHandler} from './table.resize';
import {shouldResize} from './tablefunctions';


export class Table extends ExcelComponent {
  static className='excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable(200);
  }

  onClick() {
    console.log('click')
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    }
  }
  onMouseup() {
    console.log('mouseup')
    this.resize = null
  }

  onMousemove(e) {
    if (this.resize) {
      console.log(e, this.resize_offset, this.resize.getBoundingClientRect().width)
      this.resize.style.width = `${this.resize.getBoundingClientRect().width + e.pageX-this.resize_offset}px`
      this.resize_offset = e.pageX
    }
  }
}
