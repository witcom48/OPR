import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-set-overtime',
  templateUrl: './set-overtime.component.html',
  styleUrls: ['./set-overtime.component.scss']
})
export class SetOvertimeComponent implements OnInit {
  policy = [
    { name: 'OTD - OT (Daily work)', code: "OTD" },
    { name: 'OTM - OT (Monthly)', code: "OTM" },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
