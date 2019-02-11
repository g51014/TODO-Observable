import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { scan, startWith, shareReplay } from 'rxjs/operators';

export interface Todo {
  title: string;
  content: string;
  complete: boolean;
  id: number;
  bgColor: string;
  delete?: boolean;
  edit?: boolean;
  edited?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor() { }
  private currentId = 0 ;
  private bgColors = {
    'red': 'rgb(245, 112, 112)',
    'green': 'rgb(174, 238, 195)',
    'yellow': 'rgb(245, 243, 112)',
  };
  private todos: Subject<Todo> = new Subject();
  public todos$: Observable<Todo> = this.todos.asObservable().pipe(
    startWith([]),
    scan(this.modidyTodoList),
    shareReplay(),
  );

  public createTodo(title) {
    return  {
      'title': title,
      'content': 'Double click to modify',
      'complete': false,
      'id': this.currentId += 1 ,
      'bgColor': this.bgColors.green
    };
  }

  public addTodo(title: string) {
    this.todos.next(this.createTodo(title));
  }

  public deleteTodo(todoObject: Todo) {
    this.todos.next({...todoObject, delete: true});
  }

  public editTodo(todoObject: Todo) {
    this.todos.next({...todoObject, edit: true, edited: true});
  }

  public pickTodoColor(todoObject: Todo , bgColor: string) {
    this.todos.next({...todoObject, edit: true, bgColor: this.bgColors[bgColor]});
  }

  private modidyTodoList(todos, todo) {
      if (todo.delete) {
        return todos.filter((checkTodo) => todo.id !== checkTodo.id);
      } else if (todo.edit) {
        for (let i = 0; i < todos.length ; i++) {
          if (todos[i].id === todo.id) {
            todos[i] = todo;
          }
        }
        todo.edit = false;
        return todos;
      } else {
        return todos.concat(todo);
      }
    }

}
