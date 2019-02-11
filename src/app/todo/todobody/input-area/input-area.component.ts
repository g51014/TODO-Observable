import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { TodoService, Todo } from '../../services/todo.service';
import { Observable, Subject, } from 'rxjs';
import { takeUntil, take  } from 'rxjs/operators';

@Component({
  selector: 'app-input-area',
  templateUrl: './input-area.component.html',
  styleUrls: ['./input-area.component.css']
})
export class InputAreaComponent implements OnInit, OnDestroy {
  // This observable fires when the component is destroyed and
  // coupled with takeUntil makes it so all observables get destroyed
  // when the component gets destroyed, any persistent state is stored in the
  // service layer
  private onDestroy = new Subject();
  private onDestroy$ = this.onDestroy.asObservable().pipe(take(1));
   // much more concise, most of the logic can be delegated to the service
   protected addTodo: Subject<string> = new Subject();
   private addTodo$: Observable<string> = this.addTodo.asObservable().pipe(takeUntil(this.onDestroy$));
  constructor(private $todo: TodoService) { }
  ngOnInit() {
    this.addTodo$.subscribe((title: string) => this.$todo.addTodo(title) );
  }
  ngOnDestroy() { this.onDestroy.next(''); }
}
