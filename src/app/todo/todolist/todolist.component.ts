import { Component, OnInit } from '@angular/core';
// 進入畫面
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  display: boolean;
  tempdata: any;
  constructor() { }

  ngOnInit() {
    this.display = true;
  }
  DoEnter($event: boolean) {
    this.display = $event;
  }
}
