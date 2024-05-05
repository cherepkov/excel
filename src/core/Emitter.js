export class Emitter {
  constructor() {
    this.listeners={}
  }
  // Уведопляем слушателя если есть события
  emit(eventName, ...args) {
    if (!Array.isArray(this.listeners[eventName])) {
      return false
    }
    this.listeners[eventName].forEach((listener) => {
      listener(...args)
    });
  }
  // formula.subscribe('',()=>{})
  subscribe(eventName, fn) {
    this.listeners[eventName]=this.listeners[eventName] || []
    this.listeners[eventName].push(fn)
    return () => {
      this.listeners[eventName]=this.listeners[eventName].filter((listener) => !listener == fn)
    }
  }
}

// Example
// const emitter = new Emitter()
// const unsub = emitter.subscribe('ant', (data) => console.log('sub', data))
// emitter.emit('anwqantewet', 'start')
// setTimeout(()=>{
//   emitter.emit('ant', 'After 2 seconts')
// }, 2000)
// setTimeout(()=>{
//   unsub()
// }, 3000)

// setTimeout(()=>{
//   emitter.emit('ant', 'After 4 seconts')
// }, 4000)
