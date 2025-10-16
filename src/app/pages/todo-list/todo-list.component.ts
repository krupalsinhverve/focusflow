import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  Auth
} from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Task } from '../../models/task.model';
import { TodoDrawerComponent } from "./todo-drawer/todo-drawer.component";
@Component({
  selector: 'app-todo-list',
  standalone: true,
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  imports: [FormsModule, CommonModule, RouterModule, TodoDrawerComponent]
})
export class TodoListComponent {
  tasks: Task[] = [];
  drawerOpen = false;
  selectedTask: Task | null = null;
  selectedFilter: string = 'All';

  constructor(private auth: Auth, private router: Router) { }

  openDrawer(task?: Task) {
    this.selectedTask = task ? { ...task } : null;
    this.drawerOpen = true;
  }

  closeDrawer() {
    this.drawerOpen = false;
  }

  saveTask(task: Task) {
    if (task.id) {
      const index = this.tasks.findIndex((t) => t.id === task.id);
      if (index !== -1) this.tasks[index] = task;
    } else {
      task.id = Date.now();
      this.tasks.push(task);
    }
    this.closeDrawer();
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }

  get filteredTasks() {
    if (this.selectedFilter === 'All') return this.tasks;
    return this.tasks.filter((t) => t.status === this.selectedFilter);
  }
}