import {$} from '@core/dom';

export function resizeHandler($root, event) {
  const $resizer=$(event.target)
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
    document.onmousemove=(e)=>{
      const delta = e.pageX-coords.right
      value = coords.width+delta
      $resizer.css({
        right: -delta+'px',
      })
    }
  }

  if (type =='row') {
    const delta2=$resizer.getCoords().height;
    document.onmousemove=(e)=>{
      const delta = e.pageY-coords.bottom - window.scrollY+delta2
      value = coords.height+delta
      $resizer.css({
        bottom: -delta+'px',
      })
    }
  }

  document.onmouseup=()=>{
    document.onmousemove = null;
    document.onmouseup = null;

    if (type=='col') {
      $root.findAll(`[data-col-index="${$parent.data.colIndex}"]`)
          .forEach((el) => el.style.width=value + 'px')
    }
    if (type=='row') {
      $parent.css({'height': value + 'px'});
    }
    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0
    })
  }
}

