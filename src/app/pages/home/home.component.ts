import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
    Auth,
    signOut,
} from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TodoListComponent } from "../todo-list/todo-list.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [FormsModule, CommonModule, RouterModule, TodoListComponent]
})
export class HomeComponent {

    constructor(private auth: Auth, private router: Router) { }

    async logout() {
        await signOut(this.auth);
        localStorage.removeItem('lastLogin');
        this.router.navigate(['/']);
    }
}
