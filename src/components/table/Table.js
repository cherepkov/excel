/* eslint-disable no-unused-vars */
/* eslint-disable arrow-parens */
import {$} from '@core/dom';
import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/tableTemplate';
import {resizeHandler} from './table.resize';
import {shouldResize, isCell} from './tablefunctions';
import {TableSelection} from './TableSelection'


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
  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init()
    const $cell=this.$root.find('[data-id="0:0"]')
    this.selection.select($cell);
  }

  onClick() {
    console.log('click')
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      const $target=$(event.target)
      if (event.shiftKey) {
        const tagret = $target.id(true)
        const current =this.selection.current.id(true)
        const cols = range(current.col, tagret.col)
        const rows = range(current.row, tagret.row)
        const ids = cols.reduce((acc, col)=> {
          rows.forEach(row => acc.push(`${row}:${col}`))
          return acc
        }, [])
        const $cells=ids.map(id=>this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
    }
  }
  onMouseup() {
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

function range(start, end) {
  [start, end]=[parseInt(start), parseInt(end)]
  if (start>end) {
    [end, start]=[start, end]
  }
  return new Array(end-start+1)
      .fill('')
      .map((_, index)=> start + index)
}
