import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-set-late',
  templateUrl: './set-late.component.html',
  styleUrls: ['./set-late.component.scss']
})
export class SetLateComponent implements OnInit {
  policy = [
    { name: 'L01 - Policy Late', code: "L01" },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
