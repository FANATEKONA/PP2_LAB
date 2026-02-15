import {Component, input} from '@angular/core';
import {RouterOutlet, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-user',
  template: ` <p>The user's name is {{ name() }}</p>
  <div>Username: {{ username }}</div>
  <p>Username: {{ username }}</p>
  <p>{{ username }}'s favorite framework: {{ favoriteFramework }}</p>
  <label for="framework">
    Favorite Framework:
    <input id="framework" type="text" [(ngModel)]="favoriteFramework" />
  </label>
  `,
  imports: [FormsModule],
})
export class User {
  readonly name = input<string>();
  logoUrl = '/logo.svg';
  logoAlt = 'Angular logo';
  username = 'youngTech';
  favoriteFramework = '';
}
