/* eslint-disable no-unused-vars */
/* eslint-disable arrow-parens */
import {$} from '@core/dom';
import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/tableTemplate';
import {resizeHandler} from './table.resize';
import {shouldResize, isCell, matrix, nextSelector} from './tablefunctions';
import {TableSelection} from './TableSelection'


export class Table extends ExcelComponent {
  static className='excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
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
    this.$emit('table:select', $cell);

    this.$on('formula:input', text=>{
      this.selection.current.text(text)
    })
    this.$on('formula:done', ()=>{
      this.selection.current.focus();
    })
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
        const $cells = matrix($target, this.selection.current)
            .map(id=>this.$root.find(`[data-id="${id}"]`))
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

  onKeydown(event) {
    const keys =['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
    const {key}=event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id))
      this.selection.select($next);
      this.$emit('table:select', $next)
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target))
  }
}


