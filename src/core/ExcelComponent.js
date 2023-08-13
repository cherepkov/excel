import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options={}) {
    super($root, options.listeners)
    this.name=options.name || '';
    this.emitter=options.emitter
    this.prepare();
    this.unsubscribers=[]
  }


  // Настраиваем наш компонент до init
  prepare() {

  }

  // return components template
  toHTML() {
    return '';
  }
  // Уведомляем слушателей о событии
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  // Побписываемся на события Event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  // инициализирцем компонент
  // Добавляем DOM слушатели
  init() {
    this.initDOMListeners();
  }

  // Удаляем компонет
  // Чистим слушатели
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach((unsub)=>unsub())
  }
}
