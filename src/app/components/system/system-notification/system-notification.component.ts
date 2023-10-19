import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-system-notification',
  templateUrl: './system-notification.component.html',
  styleUrls: ['./system-notification.component.scss']
})
export class SystemNotificationComponent implements OnInit {


  
  itemslike: MenuItem[] = [{ label: 'Notification System', routerLink: '/system/security', styleClass: 'activelike' }];
  home: any = { icon: 'pi pi-home', routerLink: '/' }




  title_newemployee: { [key: string]: string } = { EN: "New Employee", TH: "พนักงานเข้าใหม่" }
  title_resign: { [key: string]: string } = { EN: "Resign Employee", TH: "พนักงานลาออก" }
  title_aplication: { [key: string]: string } = { EN: "Aplication", TH: "สมัครงาน" }
  title_hire: { [key: string]: string } = { EN: "Hire", TH: "ว่าจ้าง" }

  title_birthday: { [key: string]: string } = { EN: "Birthday", TH: "วันเกิด" }
  title_expired: { [key: string]: string } = { EN: "Expired Record", TH: "บัตรหมดอายุ" }

  title_end: { [key: string]: string } = { EN: "End Probation", TH: "พนักงานพ้นทดลองงาน" }
  title_over: { [key: string]: string } = { EN: "Over the age", TH: "อายุพนักงานเกิน" }

  title_newUnitproject: { [key: string]: string } = { EN: "New Unit/Project", TH: "หน่วยงานใหม่" }
  title_adjust: { [key: string]: string } = { EN: "Cost Adjust", TH: "ปรับเปลี่ยนต้นทุน" }

  title_transfer: { [key: string]: string } = { EN: "Transfer Employee ", TH: "โอนย้ายพนักงาน" }
  title_wage: { [key: string]: string } = { EN: "Wage over Cost", TH: "ค่าจ้างเกินต้นทุน" }


 
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private taskService: TaskService,
    private router: Router,) 

    { }
    public initial_current: InitialCurrent = new InitialCurrent();
    doGetInitialCurrent() {
      this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
      if (!this.initial_current) {
        this.router.navigateByUrl('login');
      }
    }
  ngOnInit(): void {
    this.doGetInitialCurrent();

  }

}
