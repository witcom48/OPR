import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-set-leave',
  templateUrl: './set-leave.component.html',
  styleUrls: ['./set-leave.component.scss']
})
export class SetLeaveComponent implements OnInit {
  policy = [
    { name: 'LP01 - Leave Policy', code: "LP01" },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
