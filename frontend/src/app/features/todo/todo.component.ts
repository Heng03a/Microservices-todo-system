import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';
import { finalize } from 'rxjs/operators';

/* ======================
   TYPES
   ====================== */
type SortOption =
  | 'newest'
  | 'oldest'
  | 'az'
  | 'za'
  | 'completed'
  | 'active'
  | 'completed-first'
  | 'active-first';

type FilterOption = 'all' | 'active' | 'completed';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  /* ======================
     STATE
     ====================== */
  todos: Todo[] = [];            // master list (source of truth)
  displayedTodos: Todo[] = [];   // filtered + sorted list (UI)

  newTask = '';

  // Editing state
  editingId: string | null = null;
  editTitle = '';

  // Sort & filter state
  sortOption: SortOption = 'newest';
  filterOption: FilterOption = 'all';

  constructor(private todoService: TodoService) {}
loading = false;

  /* ======================
     LIFECYCLE
     ====================== */
  ngOnInit(): void {
    this.loadTodos();
  }

  /* ======================
     LOAD TODOS
     ====================== */
  loadTodos(): void {
    this.todoService.getTodos().subscribe({
      next: (res: any) => {
        // supports both { todos: [...] } and [...] response shapes
        const todos = res.todos ?? res;

        this.todos = todos;
        this.applySortAndFilter();
      },
      error: (err) => console.error('Load todos error:', err)
    });
  }

  /* ======================
     ADD
     ====================== */
 addTask(): void {
  const text = this.newTask.trim();
  if (!text) return;

  this.loading = true;

  this.todoService.createTodo(text)
    .pipe(finalize(() => this.loading = false))
    .subscribe({
      next: () => {
        this.newTask = '';
        this.loadTodos(); // backend is source of truth
      },
      error: (err) => {
        console.error('Create error:', err);
      }
    });
}
  /* ======================
     TOGGLE COMPLETE
     ====================== */
toggleCompleted(todo: Todo): void {
  this.todoService.updateTodo(todo.id, {
    title: todo.title,
    completed: !todo.completed
  }).subscribe({
    next: () => {
      this.loadTodos();
    },
    error: (error) => {
      console.error('Update error:', error);
    }
  });
}

  /* ======================
     DELETE (CONFIRM)
     ====================== */
  confirmDelete(task: Todo): void {
    const ok = window.confirm('Are you sure you want to delete this task?');
    if (!ok || !task.id) return;

    this.todoService.deleteTodo(task.id).subscribe({
      next: () => {
        this.loadTodos();
      },
      error: err => console.error('Delete failed', err)
    });
  }

  /* ======================
     EDIT
     ====================== */
  startEdit(task: Todo): void {
    if (!task.id) return;

    this.editingId = task.id;
    this.editTitle = task.title;
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editTitle = '';
  }

  saveEdit(task: Todo): void {
    const newText = this.editTitle.trim();
    if (!newText || !task.id) return;

    this.todoService.updateTodo(task.id, {
      title: newText
    }).subscribe({
      next: () => {
        this.cancelEdit();
        this.loadTodos();
      },
      error: (err) => console.error('Edit error:', err)
    });
  }

  /* ======================
     FILTER / SORT
     ====================== */
  setFilter(filter: FilterOption): void {
    this.filterOption = filter;
    this.applySortAndFilter();
  }

  setSort(option: SortOption): void {
    this.sortOption = option;
    this.applySortAndFilter();
  }

  /* ======================
     CORE: APPLY SORT + FILTER
     ====================== */
  applySortAndFilter(): void {
    let result = [...this.todos];

    /* ---------- FILTER ---------- */
    switch (this.filterOption) {
      case 'active':
        result = result.filter(t => !t.completed);
        break;

      case 'completed':
        result = result.filter(t => t.completed);
        break;

      case 'all':
      default:
        break;
    }

    /* ---------- SORT ---------- */
    switch (this.sortOption) {
      case 'newest':
        result.sort((b, a) => Number(b.id) - Number(a.id));
        break;

      case 'oldest':
        result.sort((a, b) => Number(a.id) - Number(b.id));
        break;

      case 'az':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case 'za':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;

      case 'completed-first':
        result.sort((a, b) => Number(b.completed) - Number(a.completed));
        break;

      case 'active-first':
        result.sort((a, b) => Number(a.completed) - Number(b.completed));
        break;
    }

    this.displayedTodos = result;
  }

  /* ======================
     HELPERS
     ====================== */
  private getDateValue(todo: Todo): number {
    return todo.createdAt
      ? new Date(todo.createdAt).getTime()
      : 0;
  }
}
