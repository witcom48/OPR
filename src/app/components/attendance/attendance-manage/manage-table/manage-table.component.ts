import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-table',
  templateUrl: './manage-table.component.html',
  styleUrls: ['./manage-table.component.scss']
})
export class ManageTableComponent implements OnInit {
  @Input() columns = [];
  @Input() values = [];
  constructor() { }

  ngOnInit(): void {
  }

}
