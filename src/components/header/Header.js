import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  static className='excel__header';

  constructor($root) {
    super($root, {
      name: 'Header',
      listeners: ['input']
    });
  }

  toHTML() {
    return `
    <input type="text" class="input" value="Новая таблица" />
    <div>
      <div class="button">
        <span class="material-symbols-outlined">
          delete
        </span>
      </div>
      <div class="button">
        <span class="material-symbols-outlined">
          exit_to_app
        </span>
      </div>
    </div>
    `
  }

  onInput(event) {
    console.log(`${this.name} onInput`, event.target.value.trim())
  }
}
