/* eslint-disable arrow-parens */
import {$} from '@core/dom';
import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/tableTemplate';


export class Table extends ExcelComponent {
  static className='excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable(20);
  }

  onClick() {
    console.log('click')
  }

  onMousedown(e) {
    // console.log(e.target.getAttribute('data-resize'))

    if (e.target.dataset.resize) {
      // console.log('start resize', e.target.dataset.resize)
      const $resizer=$(e.target).html('<div class=line></div>')
      const $parent=$resizer.closest('[data-type="resizable"]')
      const coords=$parent.getCoords()
      // console.log('p', $parent.$el.dataset.colIndex);

      if (e.target.dataset.resize=='col') {
        const delta2=$resizer.getCoords().width;
        const query=`[data-col-index='${$parent.$el.dataset.colIndex}']`
        const col = document.querySelectorAll(query)
        document.onmousemove=event=>{
          const delta = event.pageX-coords.right
          const value = coords.width+delta+delta2
          col.forEach(el => el.style.width=value + 'px')
          // $parent.$el.style.width=value + 'px';
        }
      }

      if (e.target.dataset.resize=='row') {
        const delta2=$resizer.getCoords().height;
        document.onmousemove=event=>{
          const delta = event.pageY-coords.bottom
          const value = coords.height+delta+delta2
          $parent.$el.style.height=value + 'px';
        }
      }

      document.onmouseup=()=>{
        $resizer.clear();
        document.onmousemove = null;
        document.onmouseup = null;
      }
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
