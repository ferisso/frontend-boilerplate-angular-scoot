import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as dayjs from 'dayjs';

interface ITodo {
  id?: string
  name: string;
  description: string;
  due?: Date;
  dueFormat?: string;
  priority: string;
  status: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'angular-todo';

  constructor(private http: HttpClient) { }

  todos: Array<ITodo> = [];
  filteredTodos: Array<ITodo> = [];
  search: string = "";
  selectedPriority = "ALL"
  priorityFilter = [
    { text: 'All', color: '#10b981', value: 'ALL' },
    { text: 'High', color: '#ef4444', value: 'HIGH' },
    { text: 'Medium', color: '#eab308', value: 'MEDIUM' },
    { text: 'Low', color: '#0284c7', value: 'LOW' },
  ]
  priority = [
    { text: 'High', color: '#ef4444', value: 'HIGH' },
    { text: 'Medium', color: '#eab308', value: 'MEDIUM' },
    { text: 'Low', color: '#0284c7', value: 'LOW' },
  ]
  selectedStatus = false
  status = [
    { text: "To do", value: false },
    { text: "Done", value: true },
  ]
  newTodo: boolean = false;
  todoItem: ITodo = {
    name: "",
    description: "",
    priority: "",
    status: false,
  }

  async ngOnInit() {
    await this.getTodos()
  }

  async getTodos() {
    this.http.get('http://localhost:3001/todos')
      .subscribe((res: any) => {
        this.todos = res.map((item: any) => {
          return {
            ...item,
            dueFormat: item.due && dayjs(item.due).format('MMMM/DD/YYYY')
          }
        })
        this.filterPriorityAndStatus()
      })
  }

  priorityColors = (data: string) => {
    let color = {
      'HIGH': '#ef4444',
      'MEDIUM': '#eab308',
      'LOW': '#0284c7'
    }[data]
    if (color) {
      return color
    }
    return '#fff'
  };

  filterTodos() {
    if (!!this.search) {
      const filteredTodos = this.filteredTodos.filter((todo: any) => {
        return todo.name.toUpperCase().includes(this.search.toUpperCase())
      })
      this.filteredTodos = filteredTodos
      return;
    }
    this.filterPriorityAndStatus();
  }

  filterPriorityAndStatus() {
    const filteredTodos = this.todos.filter((todo: any) => {
      if (this.selectedPriority == "ALL") {
        return todo.status == this.selectedStatus
      }
      return todo.priority == this.selectedPriority && todo.status == this.selectedStatus
    })
    this.filteredTodos = filteredTodos
    return;
  }

  toggleCreateOrEditTodo(item?: ITodo) {
    this.todoItem = {
      name: "",
      description: "",
      priority: "",
      status: false,
    }
    if (item) {
      this.todoItem = { ...item }
      delete this.todoItem.dueFormat
    }
    this.newTodo = true
  }

  createOrEditTodo() {
    const headers = { 'content-type': 'application/json' }
    const body = [this.todoItem]

    this.http[this.todoItem.id ? 'put' : 'post']('http://localhost:3001/todos', body)
      .subscribe((res) => {
        this.getTodos()
        this.newTodo = false
      })
  }

  deleteTodo() {
    this.http.delete(`http://localhost:3001/todos/${this.todoItem.id}`)
      .subscribe(() => {
        this.getTodos()
        this.newTodo = false
      })
  }

  changeStatus(todo: ITodo) {
    this.newTodo = false
    const body = [{
      id: todo.id,
      status: todo.status
    }]
    this.http.put('http://localhost:3001/todos', body)
      .subscribe(() => {
        this.getTodos()
      })
  }

  cancel() {
    this.newTodo = false
  }

}
