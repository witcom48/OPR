import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-changeshift',
  templateUrl: './changeshift.component.html',
  styleUrls: ['./changeshift.component.scss']
})
export class ChangeshiftComponent implements OnInit {
  // @Input() test: string = "";
  // @Output() result = new EventEmitter<string>();

  column: any = ["workdate", "from", "to", "modified by", "modified date"];
  value: any = [
    { "workdate": "2022-01-20", "from": "3", "to": "4", "modified by": "Admin", "modified date": "2022-01-12" },
    { "workdate": "2022-01-21", "from": "3", "to": "4", "modified by": "Admin", "modified date": "2022-01-12" }
  ];

  // increment() {
  //   this.result.emit(this.test);
  // }

  constructor() { }

  ngOnInit(): void {
  }

}
