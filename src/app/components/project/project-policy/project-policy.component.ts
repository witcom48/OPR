import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
interface Menu {
  title: string;
  link: string;
  accessCode: string;
  queryParamsdata: any;
}
@Component({
  selector: 'app-project-policy',
  templateUrl: './project-policy.component.html',
  styleUrls: ['./project-policy.component.scss']
})
export class ProjectPolicyComponent implements OnInit {
  mainMenuItems: MenuItem[] = [{ label: 'Policy project', routerLink: 'project/policy', styleClass: 'activelike' }];
  homeIcon: any = { icon: 'pi pi-home', routerLink: '/' };
  genaralMenuItems: Menu[] = [];
  workflowMenuItems: Menu[] = [];
  
  genaralMenuList: Menu[] = [];
  workflowMenuList: Menu[] = [];
  // genaralMenuList: Menu[] = [
  //   {
  //     title: 'Cost',
  //     link: 'pro_genaral',
  //     accessCode: 'PRO001-001',
  //     queryParamsdata: "procost"
  //   },
  //   {
  //     title: 'Project Type',
  //     link: 'pro_genaral',
  //     accessCode: 'PRO001-002',
  //     queryParamsdata: "protype"
  //   },
  //   {
  //     title: 'Project Business',
  //     link: 'pro_genaral',
  //     accessCode: 'PRO001-003',
  //     queryParamsdata: "probusiness"
  //   },
  //   {
  //     title: 'Uniform',
  //     link: 'pro_genaral',
  //     accessCode: 'PRO001-004',
  //     queryParamsdata: "prouniform"
  //   },
  //   {
  //     title: 'Slip form',
  //     link: 'pro_genaral',
  //     accessCode: 'PRO001-005',
  //     queryParamsdata: "proslip"
  //   },
  //   {
  //     title: 'Area',
  //     link: 'pro_genaral',
  //     accessCode: 'PRO001-006',
  //     queryParamsdata: "proarea"
  //   },
  //   {
  //     title: 'Group',
  //     link: 'pro_genaral',
  //     accessCode: 'PRO001-007',
  //     queryParamsdata: "progroup"
  //   },
  //   {
  //     title: 'Equipment Type',
  //     link: 'pro_genaral',
  //     accessCode: 'PRO001-008',
  //     queryParamsdata: "proequipmenttype"
  //   },

  //   // ... other approval menu items ...
  // ];

  // workflowMenuList: Menu[] = [
  //   {
  //     title: 'Project',
  //     link: 'workflow',
  //     accessCode: 'PRO001-009',
  //     queryParamsdata: ''
  //   }
  //   // ... other setup menu items ...
  // ];

  constructor(
    private router: Router,
  ) { }

  selectedLanguage: string = 'EN';
  initialData: InitialCurrent = new InitialCurrent();
  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();

  ngOnInit(): void {
    this.loadInitialData();
  }


  title_project: { [key: string]: string } = { EN: "Project", TH: "โครงการ" };
  title_cost: { [key: string]: string } = { EN: "Cost", TH: "ต้นทุน" }
  title_project_protype: { [key: string]: string } = { EN: "Type", TH: "ประเภทงาน" }
  title_project_probusiness: { [key: string]: string } = { EN: "Business", TH: "ประเภทธุรกิจ" }
  title_jobmain_poluniform: { [key: string]: string } = { EN: "Uniform", TH: "ชุดฟอร์ม" }
  title_project_proarea: { [key: string]: string } = { EN: "Area ", TH: "พื้นที่" }
  title_project_proroup: { [key: string]: string } = { EN: "Group ", TH: "กลุ่ม" }
  title_equipment_type: { [key: string]: string } = { EN: "Equipment Type", TH: "รูปแบบการเบิก" }
  title_shift: { [key: string]: string } = { EN: "Shift", TH: "กะการทำงาน" }
  title_general: { [key: string]: string } = { EN: "Genaral", TH: "ทั่วไป" };
  title_slipform: { [key: string]: string } = { EN: "Slip form", TH: "ฟอร์มสลิป" };

  
  loadInitialData(): void {
    this.initialData = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initialData.Token) {
      this.router.navigateByUrl('login');
    }
    this.selectedLanguage = this.initialData.Language;
    this.selectedLanguage = this.initialData.Language;
    this.genaralMenuList = [
      {
        title: this.title_cost[this.initialData.Language],
        link: 'pro_genaral',
        accessCode: 'PRO001-001',
        queryParamsdata: "procost"
      },

      {
        title: this.title_project_protype[this.initialData.Language],
        link: 'pro_genaral',
        accessCode: 'PRO001-002',
        queryParamsdata: "protype"
      },
      {
        title: this.title_project_probusiness[this.initialData.Language],
        link: 'pro_genaral',
        accessCode: 'PRO001-003',
        queryParamsdata: "probusiness"
      },
      {
        title: this.title_jobmain_poluniform[this.initialData.Language],
        link: 'pro_genaral',
        accessCode: 'PRO001-004',
        queryParamsdata: "prouniform"
      },
      {
        title: this.title_slipform[this.initialData.Language],
        link: 'pro_genaral',
        accessCode: 'PRO001-005',
        queryParamsdata: "proslip"
      },
      {
        title: this.title_project_proarea[this.initialData.Language],
        link: 'pro_genaral',
        accessCode: 'PRO001-006',
        queryParamsdata: "proarea"
      },
      {
        title: this.title_project_proroup[this.initialData.Language],
        link: 'pro_genaral',
        accessCode: 'PRO001-007',
        queryParamsdata: "progroup"
      },
      {
        title: this.title_equipment_type[this.initialData.Language],
        link: 'pro_genaral',
        accessCode: 'PRO001-008',
        queryParamsdata: "proequipmenttype"
      },

      // ... other approval menu items ...
    ];

    this.workflowMenuList = [
      {
        title: 'Project',
        link: 'workflow',
        accessCode: 'PRO001-009',
        queryParamsdata: ''
      }
      // ... other setup menu items ...
    ];
     
    this.setMenus();
    this.mainMenuItems = [{ label: this.title_project[this.initialData.Language], routerLink: '/project', styleClass: 'activelike' }];
  }



  setMenus() {
    this.accessData = this.initialData2.dotGetPolmenu('PRO');
    this.genaralMenuItems = this.genaralMenuList.filter(item => this.hasAccessMenu(item.accessCode));
    this.workflowMenuItems = this.workflowMenuList.filter(item => this.hasAccessMenu(item.accessCode));
  }

  private hasAccessMenu(accessCode: string): boolean {
    return this.accessData.accessmenu_data.some(item => item.accessmenu_code === accessCode);
  }

}
