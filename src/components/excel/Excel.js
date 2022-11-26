import {$} from '@core/dom'

export class Excel {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.components = options.components || []
  }
  getRoot() {
    const $root=$.create('div', 'excel')
    this.components.forEach((Components) => {
      const $el=$.create('div', Components.className)
      const component = new Components($el)
      $el.innerHTML=component.toHTML();
      $root.append($el)
    });

    return $root
  }
  render() {
    this.$el.append(this.getRoot())
  }
}
