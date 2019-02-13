import { Component, OnInit, Input, Output, EventEmitter, OnChanges , ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import { fromEvent, Subject, Observable } from 'rxjs';
import {map , merge , take, takeUntil} from 'rxjs/operators';
import { TodoService, Todo } from '../../services/todo.service';
@Component({
  selector: 'app-cards-area',
  templateUrl: './cards-area.component.html',
  styleUrls: ['./cards-area.component.css']
})
export class CardsAreaComponent implements OnInit, OnDestroy {

  // This observable fires when the component is destroyed and
  // coupled with takeUntil makes it so all observables get destroyed
  // when the component gets destroyed, any persistent state is stored in the
  // service layer
  // make sure to use takeUntil ondestroy here,
    // otherwise these observables subscriptions will stay active after the component has completed!
    //
  private onDestroy = new Subject();
  private onDestroy$ = this.onDestroy.asObservable().pipe(take(1));
  // much more concise, most of the logic can be delegated to the service, please refactor this functionality using these
  protected deleteTodo: Subject<Todo> = new Subject();
  private deleteTodo$ = this.deleteTodo.asObservable()
    .pipe(takeUntil(this.onDestroy$)).subscribe(todo => this.$todo.deleteTodo(todo));

  protected editTodo: Subject<Todo> = new Subject();
  private editTodo$ = this.editTodo.asObservable()
    .pipe(takeUntil(this.onDestroy$)).subscribe(editedTodo => this.$todo.editTodo(editedTodo));

  protected pickTodoColor: Subject<any> = new Subject();
  private pickTodoColor$ = this.pickTodoColor.asObservable().pipe(
    takeUntil(this.onDestroy$)).subscribe(
      info => this.$todo.pickTodoColor(info.todo, info.color)
    );
  @Input() data;
  @Input() cardsInfo;
  public editStatus: boolean;
  public buttonTitle: string;
  constructor(private $todo: TodoService) { }
  ngOnDestroy() {
    this.onDestroy.next('');
  }
  ngOnInit() {
    this.buttonTitle = 'complete';
    this.editStatus = false;
  }
  DoEdit(content) {
    this.editStatus = !this.editStatus;
    if (content !== undefined && content !== '') {
    this.data.content = content;
    this.editTodo.next(this.data);
    }
  }
  CancleEdit() {
    this.editStatus = false;
  }
}
