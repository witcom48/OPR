import { Component, Input, OnInit } from '@angular/core';
import { InitialCurrent } from 'src/app/config/initial_current';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @Input() loadding: boolean = false;
  constructor() {
  }

  ngOnInit(): void {
  }

}
