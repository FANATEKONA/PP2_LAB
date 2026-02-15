import {Component,inject} from '@angular/core';
import {User} from './user';
import {Child} from './child';
import {Comments} from './comments';
import {NgOptimizedImage} from '@angular/common';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {FormsModule, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CarService} from './car.service';
import {LowerCasePipe} from '@angular/common';
import {DecimalPipe,DatePipe,CurrencyPipe} from '@angular/common';
import {ReversePipe} from './reverse.pipe';


@Component({
  selector: 'app-root',
  template: ` Hello universe,
    @if (isServerRunning) {
        <span>Yes, the server is running</span>
    } @else {
        <span>No, the server is not running</span>
    }
    Hello {{ city }}, {{ 1 + 1 }}
    @for (os of operatingSystems; track os.id) {
        {{ os.name }} }
    @for (user of users; track user.id) {
        <p> {{user.name}} </p>
    }

    <div [contentEditable]="isEditable"> Hello world </div>

  <section (mouseover) = "showSecretMessage()">
    There's a secret message for you, hover to reveal 👀
    {{ message }}
  </section>
  <app-user name="SIGMA BOY" />


  <app-child (addItemEvent)="addItem($event)"/>
  <p> 🐢 all the way down {{ items.length }} </p>

  <div>
    <h1>How I feel about Angular</h1>
    <article>
      <p>
        Angular is my favorite framework, and this is why. Angular has the coolest deferrable view
        feature that makes defer loading content the easiest and most ergonomic it could possibly
        be. The Angular community is also filled with amazing contributors and experts that create
        excellent content. The community is welcoming and friendly, and it really is the best
        community out there.
      </p>
      <p>
        I can't express enough how much I enjoy working with Angular. It offers the best developer
        experience I've ever had. I love that the Angular team puts their developers first and
        takes care to make us very happy. They genuinely want Angular to be the best framework it
        can be, and they're doing such an amazing job at it, too. This statement comes from my
        heart and is not at all copied and pasted. In fact, I think I'll say these exact same
        things again a few times.
      </p>
      <p>
        Angular is my favorite framework, and this is why. Angular has the coolest deferrable view
        feature that makes defer loading content the easiest and most ergonomic it could possibly
        be. The Angular community is also filled with amazing contributors and experts that create
        excellent content. The community is welcoming and friendly, and it really is the best
        community out there.
      </p>
      <p>
        I can't express enough how much I enjoy working with Angular. It offers the best developer
        experience I've ever had. I love that the Angular team puts their developers first and
        takes care to make us very happy. They genuinely want Angular to be the best framework it
        can be, and they're doing such an amazing job at it, too. This statement comes from my
        heart and is not at all copied and pasted. In fact, I think I'll say these exact same
        things again a few times.
      </p>
      <p>
        Angular is my favorite framework, and this is why. Angular has the coolest deferrable view
        feature that makes defer loading content the easiest and most ergonomic it could possibly
        be. The Angular community is also filled with amazing contributors and experts that create
        excellent content. The community is welcoming and friendly, and it really is the best
        community out there.
      </p>
      <p>
        I can't express enough how much I enjoy working with Angular. It offers the best developer
        experience I've ever had. I love that the Angular team puts their developers first and
        takes care to make us very happy. They genuinely want Angular to be the best framework it
        can be, and they're doing such an amazing job at it, too. This statement comes from my
        heart and is not at all copied and pasted.
      </p>
    </article>

    @defer (on viewport) {
      <comments />
    } @placeholder {
      <p>Future comments</p>
    } @loading (minimum 2s) {
      <p>Loading comments...</p>
    }
  </div>

  <nav>
    <a href="/">Home</a>
    |
    <a href="/user">User</a>
  </nav>
  <router-outlet />

  <nav>
    <a routerLink="/">Home</a>
    |
    <a routerLink="/user">User</a>
  </nav>
  <router-outlet />

  <p>Username: {{ username }}</p>
  <p>{{ username }}'s favorite framework: {{ favoriteFramework }}</p>
  <label for="framework">
    Favorite Framework:
    <input id="framework" type="text" [(ngModel)]="favoriteFramework"/>
  </label>
  <button (click)="showFramework()">Show Framework</button>

  <form [formGroup]="profileForm" (ngSubmit)="handleSubmit()">
    <input type="text" formControlName="name" />
    <input type="email" formControlName="email" />
    <button type="submit">Submit</button>
  </form>

  <h2>Profile Form</h2>
  <p>Name: {{ profileForm.value.name }}</p>
  <p>Email: {{ profileForm.value.email }}</p>


  <form [formGroup]="profileForm">
    <input type="text" formControlName="name" name="name" />
    <input type="email" formControlName="email" name="email" />
    <button type="submit" [disabled]="!profileForm.valid">Submit</button>
  </form>


  <p> {{ carService.getCars() }} </p>

  <p>Car Listing: {{ display }}</p>

  <p> {{ username | lowercase }} </p>

  <ul>
    <li>Number with "decimal" {{ num | number: '3.2-2' }}</li>
    <li>Date with "date" {{ birthday | date: 'medium' }}</li>
    <li>Currency with "currency" {{ cost | currency }}</li>
  </ul>


  <p> Reverse Machine: {{ word | reverse }} </p>

  `,
  imports: [User,Child,Comments,RouterOutlet, RouterLink, FormsModule,ReactiveFormsModule,
    LowerCasePipe,DecimalPipe, DatePipe, CurrencyPipe, ReversePipe],
  styles: `
    :host {
      color: rgba(0, 0, 255, 0.89);
    }
  `,

})

export class App {
  city = 'San Francisco';
  isServerRunning = true;
  operatingSystems = [{id:'win',name:'Windows'},{id:'osx',name:'MacOS'},{id:'linux', name:'Linux'}];
  users = [
    {id: 0, name: 'Sarah'},
    {id: 1, name: 'Amy'},
    {id: 2, name: 'Rachel'},
    {id: 3, name: 'Jessica'},
    {id: 4, name: 'Poornima'},
  ];
  isEditable = true;
  message = '';

  showSecretMessage() {
    this.message = 'Way to go 🚀';
  }

  items = new Array();
  addItem(item:string) {
    this.items.push(item);
  }

  username = 'YOUNGTECH';
  favoriteFramework = '';
  showFramework() {
    alert(this.favoriteFramework);
  }
  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  handleSubmit() {
    alert(this.profileForm.value.name + ' | ' + this.profileForm.value.email);
  }
  carService = inject(CarService);

  display = this.carService.getCars().join(' ⭐️ ');

  num = 103.1234;
  birthday = new Date(2023, 3, 2);
  cost = 4560.34;

  word = 'You are a champion';


}



