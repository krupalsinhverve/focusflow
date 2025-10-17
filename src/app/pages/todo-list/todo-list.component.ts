import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TodoDrawerComponent } from './todo-drawer/todo-drawer.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoDrawerComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  drawerOpen = false;
  selectedTask: Task | null = null;
  selectedFilter: string = 'All';
  loading = false;
  private tasksSub?: Subscription;
  userId?: string;

  constructor(
    private auth: Auth,
    private router: Router,
    private taskService: TaskService,
    private firestore: Firestore
  ) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (!userData) {
      this.router.navigate(['/login']);
      return;
    }

    const user = JSON.parse(userData);
    this.userId = user.uid;

    this.subscribeTasks();
  }

  ngOnDestroy(): void {
    this.tasksSub?.unsubscribe();
  }

  private subscribeTasks() {
    if (!this.userId) return;
    this.loading = true;
    this.tasksSub = this.taskService.getTasksObservable(this.userId).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load tasks', err);
        this.loading = false;
      }
    });
  }

  openDrawer(task?: Task) {
    this.selectedTask = task ? { ...task } : null; // copy
    this.drawerOpen = true;
  }

  closeDrawer() {
    this.drawerOpen = false;
    this.selectedTask = null;
  }

  async saveTask(task: Task) {
    if (!this.userId) {
      console.error('User not logged in');
      return;
    }

    try {
      if (task.id) {
        // Update existing
        await this.taskService.updateTask(this.userId, task);
      } else {
        // Add new — ensure no id present
        delete task.id;
        await this.taskService.addTask(this.userId, task);
      }
      this.closeDrawer();
    } catch (err) {
      console.error('Save failed', err);
    }
  }

  async deleteTask(id: string) {
    if (!this.userId) return;
    try {
      await this.taskService.deleteTask(this.userId, id);
    } catch (err) {
      console.error('Delete failed', err);
    }
  }

  get filteredTasks() {
    let items = this.tasks;
    if (this.selectedFilter !== 'All') {
      items = items.filter((t) => t.status === this.selectedFilter);
    }
    return items;
  }
}
