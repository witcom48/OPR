import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-set-holiday',
  templateUrl: './set-holiday.component.html',
  styleUrls: ['./set-holiday.component.scss']
})
export class SetHolidayComponent implements OnInit {
  policy = [
    { name: 'Holiday(Monthly)', code: "HOLM" },
    { name: 'Holiday(Day)', code: "HOLD" },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}