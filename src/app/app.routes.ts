import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'todo', component: TodoListComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];
