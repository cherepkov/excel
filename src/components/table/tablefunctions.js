import {range} from '@core/utils';

export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function isCell(event) {
  return event.target.dataset.type=='cell';
}

export function matrix($current, $tagret) {
  const current=$current.id(true)
  const tagret=$tagret.id(true)
  const cols = range(current.col, tagret.col)
  const rows = range(current.row, tagret.row)
  return cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`))
    return acc
  }, [])
}
