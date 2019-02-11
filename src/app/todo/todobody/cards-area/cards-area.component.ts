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

  @Input() data;
  @Input() cardsInfo;


  editStatus: boolean;
  buttonTitle: string;
  title: string;
  id: number;
  bgColor: any;
  content: string;
  cardBgColor: any;


  // These are done correctly, but utilize the above observables instead
  @ViewChild('redButton') redButton;
  @ViewChild('greenButton') greenButton;
  @ViewChild('yellowButton') yellowButton;


  constructor(private $todo: TodoService) { }
  ngOnDestroy() {
    this.onDestroy.next('');
  }
  ngOnInit() {
    // this should be an object for expediency
    // this.bgColors = {
    //   red': 'rgb(245, 112, 112)',
    //   green': 'rgb(174, 238, 195)',
    //   yellow': 'rgb(245, 243, 112),
    // };
    this.bgColor = [
    {'color': 'red',  'value': 'rgb(245, 112, 112)'},
    {'color': 'green',  'value': 'rgb(174, 238, 195)'},
    {'color': 'yellow',  'value': 'rgb(245, 243, 112)'}
    ];
    this.buttonTitle = 'complete';
    this.editStatus = false;
    this.cardBgColor = this.data.bgColor;
    this.title = this.data.title;
    this.id = this.data.id;
    this.content = this.data.content;
    const redEvent = fromEvent(this.redButton.nativeElement, 'click').pipe(map(e => this.redButton.nativeElement.id));
    const greenEvent = fromEvent(this.greenButton.nativeElement, 'click').pipe(map(e => this.greenButton.nativeElement.id));
    const yellowEvent = fromEvent(this.yellowButton.nativeElement, 'click').pipe(map(e => this.yellowButton.nativeElement.id));
    const colorPickerEvent = redEvent.pipe(merge(yellowEvent, greenEvent)).subscribe(
      // if that was an object, this could be done like this:
      // clickedColor => this.$todo.editTodo({...this.data, cardBgColor:this.bgColor[clickedColor]})
      (e) => {
        for (let i = 0; i < this.bgColor.length; i++) {
          if (e === this.bgColor[i].color) {
            this.cardBgColor = this.bgColor[i].value;
          }
        }
      }
    );
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
