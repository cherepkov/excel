import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom'

export class Formula extends ExcelComponent {
  static className='excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click', 'keydown'],
      ...options
    });
  }

  init() {
    super.init()
    this.$formula=this.$root.find('#formula')
    this.$on('table:select', ($cell)=>(
      this.$formula.text($cell.text())
    ))
    this.$on('table:input', ($cell)=>(
      this.$formula.text($cell.text())
    ))
  }

  toHTML() {
    return `
    <div class="info">fx</div>
    <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `
  }

  onInput(event) {
    this.emitter.emit('formula:input', $(event.target).text());
  }

  onClick(event) {
    // console.log(this.$root)
  }
  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:done')
    }
  }
}
