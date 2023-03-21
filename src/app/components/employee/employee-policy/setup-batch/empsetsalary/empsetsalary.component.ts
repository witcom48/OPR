import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empsetsalary',
  templateUrl: './empsetsalary.component.html',
  styleUrls: ['./empsetsalary.component.scss']
})
export class EmpsetsalaryComponent implements OnInit {

  index: number = 0;

  constructor() { }

  new_data: boolean = false;

  ngOnInit(): void {
  }

  process(){}

  function(e: any) {
    var page = e.index;
    this.index = page;
    if (page == 1) {
      setTimeout(() => {
        this.new_data = true;
      }, 300);
    } else {
      this.new_data = false;
    }
  }

}
