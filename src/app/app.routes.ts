import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { BoardPageComponent } from './modules/board/board-page/board-page.component';

export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'board', component: BoardPageComponent },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' }
];
