import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Task } from '../../../models/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-drawer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-drawer.component.html',
  styleUrl: './todo-drawer.component.scss'
})
export class TodoDrawerComponent implements OnInit {
  @Input() task: Task | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Task>();

  formData: Task = { id: 0, title: '', description: '', status: 'Pending' };

  ngOnInit() {
    if (this.task) {
      this.formData = { ...this.task };
    }
  }

  onSubmit() {
    this.save.emit(this.formData);
  }
}