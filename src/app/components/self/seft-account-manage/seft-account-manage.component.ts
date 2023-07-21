import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-seft-account-manage',
  templateUrl: './seft-account-manage.component.html',
  styleUrls: ['./seft-account-manage.component.scss']
})
export class SeftAccountManageComponent implements OnInit {
  itemslike: MenuItem[] = [{ label: 'Employee', routerLink: '/self/approve' }, {
    label: 'Account', styleClass: 'activelike'
  }];
  home: any = { icon: 'pi pi-home', routerLink: '/' }
  constructor() { }

  ngOnInit(): void {
  }

}
