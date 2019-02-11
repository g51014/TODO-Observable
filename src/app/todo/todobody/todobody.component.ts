import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { Observable, fromEvent, Subject, merge } from 'rxjs';
import { takeUntil, take, filter  } from 'rxjs/operators';
import { TodoService, Todo } from '../services/todo.service';

@Component({
  selector: 'app-todobody',
  templateUrl: './todobody.component.html',
  styleUrls: ['./todobody.component.css']
})
export class TodobodyComponent implements OnInit, OnDestroy {

  constructor(private $todo: TodoService) {}
  // This observable fires when the component is destroyed and
  // coupled with takeUntil makes it so all observables get destroyed
  // when the component gets destroyed, any persistent state is stored in the
  // service layer
  private onDestroy = new Subject();
  private onDestroy$ = this.onDestroy.asObservable().pipe(take(1));
  // todo list is a compilation of added todos,stored in todo service
  // Todo interface makes it easier for others to develope, debug
  // and use your api in the future
  protected todos$: Observable<Todo> = this.$todo.todos$.pipe(takeUntil(this.onDestroy$));
  cardsInfo: any;
  cardsMargin: number;
  cardsWidth: number;
  padding: number;
  colNum: number;
  ngOnDestroy() {this.onDestroy.next(''); }
  ngOnInit() {
    this.padding = 50;
    this.cardsWidth = 300;
    this.colNum = 3;
    this.cardsInfo = {'padding': '', 'cardsWidth': '', 'cardsMargin': ''};
    window.onresize = () => {this.SetCards(); } ;
    this.SetCards();
  }

  SetCards() {
    this.cardsMargin = (document.body.clientWidth -  (this.cardsWidth * this.colNum) - (this.padding * 2)) / 6 - 30;
    if (document.body.clientWidth < 1200) {
      this.cardsWidth = 150;
    } else {
      this.cardsWidth = 300;
    }
    this.cardsInfo = {'padding': this.padding, 'cardsWidth': this.cardsWidth, 'cardsMargin': this.cardsMargin};
  }

}
