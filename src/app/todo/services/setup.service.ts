import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { startWith, scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SetupService {

  constructor() { }
  private textSetup: BehaviorSubject<object> = new BehaviorSubject(
    {
      index: {title: 'todo', subtitle: 'W.Chiang'},
    });
  public textSetup$ = this.textSetup.asObservable().pipe();
  private display: Subject<boolean> = new Subject();
  public display$ = this.display.asObservable().pipe(startWith(true));
  doEnter(boolean) {
    this.display.next(boolean);
  }
}
