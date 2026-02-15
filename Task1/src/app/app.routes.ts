import { Routes } from '@angular/router';
import {User} from './user';
import {Home} from './home';
export const routes: Routes = [
  {
    path: '',
    title: 'App Home Page',
    component: Home,
  },
  {
    path: 'user',
    title: 'App User Page',
    component: User,
  },
];
