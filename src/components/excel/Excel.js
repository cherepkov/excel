import {$} from '@core/dom'
import {Emitter} from '@core/Emitter'

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
    this.emitter = new Emitter()
  }
  getRoot() {
    const $root=$.create('div', 'excel')
    const componentOptins={
      emitter: this.emitter
    }
    this.components=this.components.map((Components) => {
      const $el=$.create('div', Components.className)
      const component = new Components($el, componentOptins)
      // DEBUG
      // if (component.name) {
      //   window['c'+component.name] = component
      // }
      $el.html(component.toHTML());
      $root.append($el)
      return component
    });

    return $root
  }
  render() {
    this.$el.append(this.getRoot())
    this.components.forEach((component) => component.init());
  }
  destroy() {
    this.components.forEach((component)=>component.destroy())
  }
}
