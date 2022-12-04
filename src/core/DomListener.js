/* eslint-disable  */

import { capitalize } from "@core/utils"


export class DomListener {
  constructor($root, listeners=[]) {
    if (!$root){
      throw new Error('No $root provided for DOM listener')
    }
    this.$root=$root
    this.listeners=listeners
  }

  initDOMListeners() {
    //console.log(this.listeners, this.$root)
    this.listeners.forEach(listener=>{
      const method = getMethodName(listener)
      const name = this.name || ''
      if (!this[method]){
        throw new Error(`Method ${method} is not implemented in ${name} Component`)
      }
      this.$root.on(listener, this[method].bind(this))
    })
  }

  removeDOMListeners() {

  }
}

function getMethodName(eventName) {
  return 'on'+capitalize(eventName)
}