import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-todo-drawer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-drawer.component.html',
  styleUrl: './todo-drawer.component.scss'
})
export class TodoDrawerComponent implements OnInit {
  @Input() existingTask: Task | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Task>();

  formData: Task = { title: '', description: '', status: 'Pending' };

  ngOnInit(): void {
    if (this.existingTask) {
      // copy without mutating parent object
      this.formData = { ...this.existingTask };
    } else {
      // ensure there is NO id for a new task
      delete this.formData.id;
    }
  }

  onSubmit() {
    // Basic validation
    if (!this.formData.title || this.formData.title.trim().length === 0) {
      return; // you could also emit an error or show UI feedback
    }
    // Ensure id is undefined for new tasks
    if (!this.existingTask) {
      delete this.formData.id;
    }
    this.save.emit(this.formData);
  }

  onClose() {
    this.close.emit();
  }
}
