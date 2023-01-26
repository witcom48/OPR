import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-set-diligence',
  templateUrl: './set-diligence.component.html',
  styleUrls: ['./set-diligence.component.scss']
})
export class SetDiligenceComponent implements OnInit {
  policy = [
    { name: 'DG - DILIGENCE', code: "DG" },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
