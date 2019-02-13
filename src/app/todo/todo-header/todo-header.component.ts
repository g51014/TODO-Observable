import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SetupService } from '../services/setup.service';
@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.css']
})
export class TodoHeaderComponent implements OnInit {

  public textSetup$ = this.$setup.textSetup$;
  public enter: Subject<any> = new Subject();
  private enter$ = this.enter.asObservable().subscribe(
    boolean => this.$setup.doEnter(boolean));
  constructor(private $setup: SetupService) { }
  ngOnInit() {}

}
