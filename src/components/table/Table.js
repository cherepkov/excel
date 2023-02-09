/* eslint-disable no-unused-vars */
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
    return createTable(200);
  }

  onClick() {
    console.log('click')
  }

  onMousedown(e) {
    // console.log(e.target.getAttribute('data-resize'))

    if (e.target.dataset.resize) {
      // console.log('start resize', e.target.dataset.resize)
      const $resizer=$(e.target)
      const $parent=$resizer.closest('[data-type="resizable"]')
      const coords=$parent.getCoords()
      const type=$resizer.data.resize;
      const sideProp = type=='col' ? 'bottom' : 'right'
      $resizer.css({
        opacity: 1,
        [sideProp]: '-5000px'
      }
      )
      let value;

      if (type =='col') {
        // const delta2=$resizer.getCoords().width;
        document.onmousemove=event=>{
          const delta = event.pageX-coords.right
          value = coords.width+delta
          $resizer.css({
            right: -delta+'px',
          })
          //
        }
      }

      if (type =='row') {
        const delta2=$resizer.getCoords().height;
        document.onmousemove=event=>{
          const delta = event.pageY-coords.bottom - window.scrollY+delta2
          value = coords.height+delta
          $resizer.css({
            bottom: -delta+'px',
          })
          // $parent.css({'height': value + 'px'});
        }
      }

      document.onmouseup=()=>{
        document.onmousemove = null;
        document.onmouseup = null;

        if (type=='col') {
          this.$root.findAll(`[data-col-index="${$parent.data.colIndex}"]`)
              .forEach(el => el.style.width=value + 'px')
        }
        if (type=='row') {
          $parent.css({'height': value + 'px'});
        }
        // window.getSelection()?.removeAllRanges();
        $resizer.css({
          opacity: 0,
          bottom: 0,
          right: 0
        })
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
