import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { AccountServices } from 'src/app/services/self/account.service';

@Component({
  selector: 'app-self-changepassword',
  templateUrl: './self-changepassword.component.html',
  styleUrls: ['./self-changepassword.component.scss']
})
export class SelfChangepasswordComponent implements OnInit {
  itemslike: MenuItem[] = [{ label: 'Employee', routerLink: '/self/employee' }, {
    label: 'Account', styleClass: 'activelike'
  }];
  home: any = { icon: 'pi pi-home', routerLink: '/' }
  constructor(
    private accountServer: AccountServices,
    private messageService: MessageService,
    private router: Router,
  ) { }

  cur_password: string = "";
  new_password: string = "";
  confirm_password: string = "";

  language: string = "EN";
  ngOnInit(): void {
    const initialCurrent = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    this.language = initialCurrent.Language;
    if (initialCurrent.Usertype == 'Emp') {
      this.itemslike = [{ label: initialCurrent.Language == "TH" ? 'การตั้งค่า' : 'Setup', routerLink: '/self/employee' }, {
        label: initialCurrent.Language == "TH" ? 'เปลี่ยนรหัสผ่าน' : 'Change Password', styleClass: 'activelike'
      }]
    }
    else if (initialCurrent.Usertype == 'APR') {
      this.itemslike = [{ label: initialCurrent.Language == "TH" ? 'การตั้งค่า' : 'Setup', routerLink: '/self/approve' }, {
        label: initialCurrent.Language == "TH" ? 'เปลี่ยนรหัสผ่าน' : 'Change Password', styleClass: 'activelike'
      }]
    }
  }
  Save() {
    const initialCurrent = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    console.log(initialCurrent.Usertype, initialCurrent.Username, this.cur_password, this.new_password)
    this.accountServer.ChangePassowrd(this.cur_password, this.new_password).then((result) => {
      console.log(result)
      if (result.result == 1) {
        localStorage.clear();
        this.router.navigateByUrl('login');
      } else
        if (result.result == 2) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this.language == 'TH' ? 'รหัสผ่านเดิมไม่ถูกต้อง' : 'The current password is incorrect.' });
        }
        else if (result.result == 0) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: result.result_text });
        }
    })
  }

}
