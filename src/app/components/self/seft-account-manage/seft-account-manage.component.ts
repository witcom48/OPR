import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';

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
    const initialCurrent = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    this.itemslike = [{ label: initialCurrent.Language == "TH" ? 'การตั้งค่า' : 'Setup', routerLink: '/self/approve' }, {
      label: initialCurrent.Language == "TH" ? 'บัญชีผู้ใช้งาน' : 'Account', styleClass: 'activelike'
    }]
  }

}
