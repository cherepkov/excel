import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options={}) {
    super($root, options.listeners)
    this.name=options.name || '';

    this.prepare();
  }

  prepare() {

  }

  // return components template
  toHTML() {
    return '';
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners()
    console.log(`${this.name} has been destroed`)
  }
}
