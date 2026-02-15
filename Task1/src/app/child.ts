import {Component, output} from '@angular/core';

@Component({
  selector: 'app-child',
  template: `<button class="btn" (click)="addItem()" > Add item </button>`
})

export class Child {
  readonly addItemEvent = output<string>();
  addItem() {
    this.addItemEvent.emit('🐢');
  }
}

