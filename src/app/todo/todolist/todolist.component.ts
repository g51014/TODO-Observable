import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { SetupService } from '../services/setup.service';
// 進入畫面
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit , OnDestroy {
  private destroy: Subject<any> = new Subject();
  private destroy$ = this.destroy.asObservable().pipe(take(1));
  public display: boolean;
  public display$ = this.$setup.display$;
  constructor(private $setup: SetupService) { }
  ngOnInit() {
    this.display = true;
  }
  ngOnDestroy() {
    this.destroy.next('');
  }
}
