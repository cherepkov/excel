/* eslint-disable no-unused-vars */
/* eslint-disable arrow-parens */
import {$} from '@core/dom';
import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/tableTemplate';
import {resizeHandler} from './table.resize';


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

  onMousedown(e) {
    // console.log(e.target.getAttribute('data-resize'))

    if (e.target.dataset.resize) {
      resizeHandler(this.$root, e)
    }
  }
  onMouseup() {
    console.log('mouseup')
    this.resize = null
  }

  onMousemove(e) {
    // console.log('mousemove')
    if (this.resize) {
      console.log(e, this.resize_offset, this.resize.getBoundingClientRect().width)
      this.resize.style.width = `${this.resize.getBoundingClientRect().width + e.pageX-this.resize_offset}px`
      this.resize_offset = e.pageX
    }
  }
}
