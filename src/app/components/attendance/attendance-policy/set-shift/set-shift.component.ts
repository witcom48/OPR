import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-set-shift',
  templateUrl: './set-shift.component.html',
  styleUrls: ['./set-shift.component.scss']
})
export class SetShiftComponent implements OnInit {
  policy = [
    { name: 'Plan01 - Plan for permanent Staff', code: "Plan01" },
    { name: 'Plan02 - Plan for Daily worker', code: "Plan02" },
    { name: 'Plan03 - Plan for driver', code: "Plan03" },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
