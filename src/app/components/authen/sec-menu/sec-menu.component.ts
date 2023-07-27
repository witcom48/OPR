import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService, TreeNode } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { AccessmenuModel } from 'src/app/models/system/security/accessmenu';
import { ItemmenuModel } from 'src/app/models/system/security/itemmenu';
import { MainmenuModel } from 'src/app/models/system/security/mainmenu';
import { PolmenuModel } from 'src/app/models/system/security/polmenu';
import { SubmenuModel } from 'src/app/models/system/security/submenu';
import { MainmenuServices } from 'src/app/services/system/security/menu.service';
import { PolmenuServices } from 'src/app/services/system/security/polmenu.service';
declare var menu: any;
@Component({
  selector: 'app-sec-menu',
  templateUrl: './sec-menu.component.html',
  styleUrls: ['./sec-menu.component.scss']
})
export class SecMenuComponent implements OnInit {
  accountLanguages: any = menu;
  selectedLanguage: string = 'EN';
  itemslike: MenuItem[] = [{ label: 'Security system', routerLink: '/system/security' }, { label: 'Security system', routerLink: '/system/security', styleClass: 'activelike' }];
  home: any = { icon: 'pi pi-home', routerLink: '/' }
  menuItems: MenuItem[] = [];
  memu_list: MainmenuModel[] = [];
  isDisplayingManagement: boolean = false;
  edit_data: boolean = false;
  new_data: boolean = false;
  positionAlignment: string = 'right';
  polmenuList: PolmenuModel[] = []
  selectedpolmenu: PolmenuModel = new PolmenuModel();
  selfadding: boolean = false;
  selfedit: boolean = false;
  selfdelete: boolean = false;
  selfsalary: boolean = false;

  proadding: boolean = false;
  proedit: boolean = false;
  prodelete: boolean = false;
  prosalary: boolean = false;

  empadding: boolean = false;
  empedit: boolean = false;
  empdelete: boolean = false;
  empsalary: boolean = false;

  reqadding: boolean = false;
  reqedit: boolean = false;
  reqdelete: boolean = false;
  reqsalary: boolean = false;

  attadding: boolean = false;
  attedit: boolean = false;
  attdelete: boolean = false;
  attsalary: boolean = false;

  payadding: boolean = false;
  payedit: boolean = false;
  paydelete: boolean = false;
  paysalary: boolean = false;

  sysadding: boolean = false;
  sysedit: boolean = false;
  sysdelete: boolean = false;
  syssalary: boolean = false;

  filesself: TreeNode[] = [];
  filespro: TreeNode[] = [];
  filesemp: TreeNode[] = [];
  filesreq: TreeNode[] = [];
  filesatt: TreeNode[] = [];
  filespay: TreeNode[] = [];
  filessys: TreeNode[] = [];

  selectedFilesself: TreeNode[] = [];
  selectedFilespro: TreeNode[] = [];
  selectedFilesemp: TreeNode[] = [];
  selectedFilesreq: TreeNode[] = [];
  selectedFilesatt: TreeNode[] = [];
  selectedFilespay: TreeNode[] = [];
  selectedFilessys: TreeNode[] = [];
  constructor(
    private router: Router,
    private messageService: MessageService,
    private mainmenuService: MainmenuServices,
    private polmenuService: PolmenuServices
  ) { }
  initialCurrent: InitialCurrent = new InitialCurrent();
  loadInitialCurrent(): void {
    this.initialCurrent = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initialCurrent.Token) {
      this.router.navigateByUrl('login');
    }
    this.selectedLanguage = this.initialCurrent.Language;
  }
  ngOnInit(): void {
    this.loadInitialCurrent();
    this.doLoadMenu();
    this.loadMenu();
  }
  sumit(): void {
    // console.log(this.selectedFilesatt);
    // console.log(this.selectedFilesemp);
    // console.log(this.filesatt);
    var tem = new PolmenuModel();
    tem.polmenu_id = this.selectedpolmenu.polmenu_id;
    tem.polmenu_code = this.selectedpolmenu.polmenu_code;
    tem.polmenu_name_en = this.selectedpolmenu.polmenu_name_en;
    tem.polmenu_name_th = this.selectedpolmenu.polmenu_name_th;
    tem.flag = this.selectedpolmenu.flag;
    var dataself = new AccessdataModel();
    dataself.company_code = this.initialCurrent.CompCode;
    dataself.polmenu_code = this.selectedpolmenu.polmenu_code;
    dataself.accessdata_module = "SELF";
    dataself.accessdata_new = this.selfadding;
    dataself.accessdata_edit = this.selfedit;
    dataself.accessdata_delete = this.selfdelete;
    dataself.accessdata_salary = this.selfsalary;
    this.selectedFilesself.forEach((fileself: TreeNode) => {
      dataself.accessmenu_data.push({
        company_code: dataself.company_code,
        polmenu_code: this.selectedpolmenu.polmenu_code,
        accessmenu_module: "SELF",
        accessmenu_type: fileself.data,
        accessmenu_code: fileself.key || ""
      })
    })
    var datapro = new AccessdataModel();
    datapro.company_code = this.initialCurrent.CompCode;
    datapro.polmenu_code = this.selectedpolmenu.polmenu_code;
    datapro.accessdata_module = "PRO";
    datapro.accessdata_new = this.proadding;
    datapro.accessdata_edit = this.proedit;
    datapro.accessdata_delete = this.prodelete;
    datapro.accessdata_salary = this.prosalary;
    this.selectedFilespro.forEach((filepro: TreeNode) => {
      datapro.accessmenu_data.push({
        company_code: datapro.company_code,
        polmenu_code: this.selectedpolmenu.polmenu_code,
        accessmenu_module: "PRO",
        accessmenu_type: filepro.data,
        accessmenu_code: filepro.key || ""
      })
    })
    var dataemp = new AccessdataModel();
    dataemp.company_code = this.initialCurrent.CompCode;
    dataemp.polmenu_code = this.selectedpolmenu.polmenu_code;
    dataemp.accessdata_module = "EMP";
    dataemp.accessdata_new = this.empadding;
    dataemp.accessdata_edit = this.empedit;
    dataemp.accessdata_delete = this.empdelete;
    dataemp.accessdata_salary = this.empsalary;
    this.selectedFilesemp.forEach((fileemp: TreeNode) => {
      dataemp.accessmenu_data.push({
        company_code: dataemp.company_code,
        polmenu_code: this.selectedpolmenu.polmenu_code,
        accessmenu_module: "EMP",
        accessmenu_type: fileemp.data,
        accessmenu_code: fileemp.key || ""
      })
    })
    var datareq = new AccessdataModel();
    datareq.company_code = this.initialCurrent.CompCode;
    datareq.polmenu_code = this.selectedpolmenu.polmenu_code;
    datareq.accessdata_module = "REQ";
    datareq.accessdata_new = this.reqadding;
    datareq.accessdata_edit = this.reqedit;
    datareq.accessdata_delete = this.reqdelete;
    datareq.accessdata_salary = this.reqsalary;
    this.selectedFilesreq.forEach((filereq: TreeNode) => {
      datareq.accessmenu_data.push({
        company_code: datareq.company_code,
        polmenu_code: this.selectedpolmenu.polmenu_code,
        accessmenu_module: "REQ",
        accessmenu_type: filereq.data,
        accessmenu_code: filereq.key || ""
      })
    })
    var dataatt = new AccessdataModel();
    dataatt.company_code = this.initialCurrent.CompCode;
    dataatt.polmenu_code = this.selectedpolmenu.polmenu_code;
    dataatt.accessdata_module = "ATT";
    dataatt.accessdata_new = this.attadding;
    dataatt.accessdata_edit = this.attedit;
    dataatt.accessdata_delete = this.attdelete;
    dataatt.accessdata_salary = this.attsalary;
    this.selectedFilesatt.forEach((fileAtt: TreeNode) => {
      dataatt.accessmenu_data.push({
        company_code: dataatt.company_code,
        polmenu_code: this.selectedpolmenu.polmenu_code,
        accessmenu_module: "ATT",
        accessmenu_type: fileAtt.data,
        accessmenu_code: fileAtt.key || ""
      })
    })
    var datapay = new AccessdataModel();
    datapay.company_code = this.initialCurrent.CompCode;
    datapay.polmenu_code = this.selectedpolmenu.polmenu_code;
    datapay.accessdata_module = "PAY";
    datapay.accessdata_new = this.payadding;
    datapay.accessdata_edit = this.payedit;
    datapay.accessdata_delete = this.paydelete;
    datapay.accessdata_salary = this.paysalary;
    this.selectedFilespay.forEach((filepay: TreeNode) => {
      datapay.accessmenu_data.push({
        company_code: datapay.company_code,
        polmenu_code: this.selectedpolmenu.polmenu_code,
        accessmenu_module: "PAY",
        accessmenu_type: filepay.data,
        accessmenu_code: filepay.key || ""
      })
    })
    var datasys = new AccessdataModel();
    datasys.company_code = this.initialCurrent.CompCode;
    datasys.polmenu_code = this.selectedpolmenu.polmenu_code;
    datasys.accessdata_module = "SYS";
    datasys.accessdata_new = this.sysadding;
    datasys.accessdata_edit = this.sysedit;
    datasys.accessdata_delete = this.sysdelete;
    datasys.accessdata_salary = this.syssalary;
    this.selectedFilessys.forEach((filesys: TreeNode) => {
      datasys.accessmenu_data.push({
        company_code: datasys.company_code,
        polmenu_code: this.selectedpolmenu.polmenu_code,
        accessmenu_module: "SYS",
        accessmenu_type: filesys.data,
        accessmenu_code: filesys.key || ""
      })
    })
    tem.accessdata_data.push(dataself)
    tem.accessdata_data.push(datapro)
    tem.accessdata_data.push(dataemp)
    tem.accessdata_data.push(datareq)
    tem.accessdata_data.push(dataatt)
    tem.accessdata_data.push(datapay)
    tem.accessdata_data.push(datasys)
    this.doRecordPolmenu(tem);
  }

  // Loads the menu items for the Table
  loadMenu(): void {
    this.menuItems = [
      {
        label: this.accountLanguages.get('new')[this.selectedLanguage],
        icon: 'pi pi-fw pi-plus',
        command: () => {
          this.selectedpolmenu = new PolmenuModel();
          this.isDisplayingManagement = true;
          this.edit_data = false;
        }
      }
    ];
  }
  doLoadPolmenu(): void {
    this.polmenuList = [];
    var tmp = new PolmenuModel();
    this.polmenuService.polmenu_get(tmp).then((res: PolmenuModel[]) => {
      this.polmenuList = res;
    })
  }
  async doRecordPolmenu(data: PolmenuModel) {
    await this.polmenuService.polmenu_record(data).then((res) => {
      // console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadPolmenu()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
    this.closeManagement();
  }
  doLoadMenu(): void {
    this.memu_list = [];
    var tmp = new MainmenuModel();
    this.mainmenuService.menu_get(tmp).then(async (res: MainmenuModel[]) => {
      this.memu_list = await res;
      res.forEach((item: MainmenuModel) => {
        if (item.mainmenu_code == "SELF") {
          this.filesself = [
            {
              key: item.mainmenu_code,
              data: "MAIN",
              label: item.mainmenu_detail_en,
              // data: 'Attendance',
              // icon: 'pi pi-fw pi-inbox',
              children: [],
              expanded: true
            }
          ];
          item.submenu_data.forEach(async (obj: SubmenuModel) => {
            let data: any = {
              key: obj.submenu_code,
              data: "SUB",
              label: obj.submenu_detail_en,
              // data: 'Work Folder',
              children: []
            };
            obj.itemmenu_data.forEach((itemmenu: ItemmenuModel) => {
              data.children.push({ key: itemmenu.itemmenu_code, data: "ITEM", label: itemmenu.itemmenu_detail_en },)
            })
            this.filesself[0].children?.push(data);
            // if (obj.submenu_code == 'ATT001') {
            //   this.selectedFilesatt.push(data)
            // }
          })
        }
        if (item.mainmenu_code == "PRO") {
          this.filespro = [
            {
              key: item.mainmenu_code,
              data: "MAIN",
              label: item.mainmenu_detail_en,
              // data: 'Attendance',
              // icon: 'pi pi-fw pi-inbox',
              children: [],
              expanded: true
            }
          ];
          item.submenu_data.forEach(async (obj: SubmenuModel) => {
            let data: any = {
              key: obj.submenu_code,
              data: "SUB",
              label: obj.submenu_detail_en,
              // data: 'Work Folder',
              children: []
            };
            obj.itemmenu_data.forEach((itemmenu: ItemmenuModel) => {
              data.children.push({ key: itemmenu.itemmenu_code, data: "ITEM", label: itemmenu.itemmenu_detail_en },)
            })
            this.filespro[0].children?.push(data);
            // if (obj.submenu_code == 'ATT001') {
            //   this.selectedFilesatt.push(data)
            // }
          })
        }
        if (item.mainmenu_code == "EMP") {
          this.filesemp = [
            {
              key: item.mainmenu_code,
              data: "MAIN",
              label: item.mainmenu_detail_en,
              // data: 'Attendance',
              // icon: 'pi pi-fw pi-inbox',
              children: [],
              expanded: true
            }
          ];
          item.submenu_data.forEach(async (obj: SubmenuModel) => {
            let data: any = {
              key: obj.submenu_code,
              data: "SUB",
              label: obj.submenu_detail_en,
              // data: 'Work Folder',
              children: []
            };
            obj.itemmenu_data.forEach((itemmenu: ItemmenuModel) => {
              data.children.push({ key: itemmenu.itemmenu_code, data: "ITEM", label: itemmenu.itemmenu_detail_en },)
            })
            this.filesemp[0].children?.push(data);
          })
        }
        if (item.mainmenu_code == "REQ") {
          this.filesreq = [
            {
              key: item.mainmenu_code,
              data: "MAIN",
              label: item.mainmenu_detail_en,
              // data: 'Attendance',
              // icon: 'pi pi-fw pi-inbox',
              children: [],
              expanded: true
            }
          ];
          item.submenu_data.forEach(async (obj: SubmenuModel) => {
            let data: any = {
              key: obj.submenu_code,
              data: "SUB",
              label: obj.submenu_detail_en,
              // data: 'Work Folder',
              children: []
            };
            obj.itemmenu_data.forEach((itemmenu: ItemmenuModel) => {
              data.children.push({ key: itemmenu.itemmenu_code, data: "ITEM", label: itemmenu.itemmenu_detail_en },)
            })
            this.filesreq[0].children?.push(data);
            // if (obj.submenu_code == 'ATT001') {
            //   this.selectedFilesatt.push(data)
            // }
          })
        }
        if (item.mainmenu_code == "ATT") {
          this.filesatt = [
            {
              key: item.mainmenu_code,
              data: "MAIN",
              label: item.mainmenu_detail_en,
              // data: 'Attendance',
              // icon: 'pi pi-fw pi-inbox',
              children: [],
              expanded: true
            }
          ];
          item.submenu_data.forEach(async (obj: SubmenuModel) => {
            let data: any = {
              key: obj.submenu_code,
              data: "SUB",
              label: obj.submenu_detail_en,
              // data: 'Work Folder',
              children: []
            };
            obj.itemmenu_data.forEach((itemmenu: ItemmenuModel) => {
              data.children.push({ key: itemmenu.itemmenu_code, data: "ITEM", label: itemmenu.itemmenu_detail_en },)
            })
            this.filesatt[0].children?.push(data);
            // if (obj.submenu_code == 'ATT001') {
            //   this.selectedFilesatt.push(data)
            // }
          })
        }
        if (item.mainmenu_code == "PAY") {
          this.filespay = [
            {
              key: item.mainmenu_code,
              data: "MAIN",
              label: item.mainmenu_detail_en,
              // data: 'Attendance',
              // icon: 'pi pi-fw pi-inbox',
              children: [],
              expanded: true
            }
          ];
          item.submenu_data.forEach(async (obj: SubmenuModel) => {
            let data: any = {
              key: obj.submenu_code,
              data: "SUB",
              label: obj.submenu_detail_en,
              // data: 'Work Folder',
              children: []
            };
            obj.itemmenu_data.forEach((itemmenu: ItemmenuModel) => {
              data.children.push({ key: itemmenu.itemmenu_code, data: "ITEM", label: itemmenu.itemmenu_detail_en },)
            })
            this.filespay[0].children?.push(data);
            // if (obj.submenu_code == 'ATT001') {
            //   this.selectedFilesatt.push(data)
            // }
          })
        }
        if (item.mainmenu_code == "SYS") {
          this.filessys = [
            {
              key: item.mainmenu_code,
              data: "MAIN",
              label: item.mainmenu_detail_en,
              // data: 'Attendance',
              // icon: 'pi pi-fw pi-inbox',
              children: [],
              expanded: true
            }
          ];
          item.submenu_data.forEach(async (obj: SubmenuModel) => {
            let data: any = {
              key: obj.submenu_code,
              data: "SUB",
              label: obj.submenu_detail_en,
              // data: 'Work Folder',
              children: []
            };
            obj.itemmenu_data.forEach((itemmenu: ItemmenuModel) => {
              data.children.push({ key: itemmenu.itemmenu_code, data: "ITEM", label: itemmenu.itemmenu_detail_en },)
            })
            this.filessys[0].children?.push(data);
            // if (obj.submenu_code == 'ATT001') {
            //   this.selectedFilesatt.push(data)
            // }
          })
        }
      })
      this.doLoadPolmenu();
    });
  }
  onRowSelection(events: any) {
    this.selectedFilesself = [];
    this.selectedFilespro = [];
    this.selectedFilesemp = [];
    this.selectedFilesreq = [];
    this.selectedFilesatt = [];
    this.selectedFilespay = [];
    this.selectedFilessys = [];
    for (const item of this.selectedpolmenu.accessdata_data) {
      if (item.accessdata_module == "SELF") {
        this.selfadding = item.accessdata_new;
        this.selfedit = item.accessdata_edit;
        this.selfdelete = item.accessdata_delete;
        this.selfsalary = item.accessdata_salary;
        if (item.accessmenu_data.some((item: AccessmenuModel) => item.accessmenu_type == "MAIN")) {
          this.selectedFilesself = [];
          this.filesself.forEach((fileSelf: TreeNode) => {
            fileSelf.partialSelected = false;
            this.selectedFilesself.push(fileSelf)
            fileSelf.children?.forEach((child: TreeNode) => {
              child.partialSelected = false;
              this.selectedFilesself.push(child)
              child.children?.forEach((item: TreeNode) => {
                item.partialSelected = false;
                this.selectedFilesself.push(item)
              })
            })
          })
        } else {
          for (const obj of item.accessmenu_data) {
            if (obj.accessmenu_type == 'SUB') {
              this.filesself[0].children?.find((child: TreeNode) => {
                if (child.key == obj.accessmenu_code) {
                  child.partialSelected = false;
                  child.parent!.partialSelected = true;
                  this.selectedFilesself.push(child)
                }
              })
            }
            if (obj.accessmenu_type == 'ITEM') {
              this.filesself[0].children?.find((child: TreeNode) => {
                if (child.key == obj.accessmenu_code.split('-')[0]) {

                  if (item.accessmenu_data.some((item: AccessmenuModel) => item.accessmenu_code === obj.accessmenu_code.split('-')[0] && item.accessmenu_type == "SUB")) {
                    child.children?.find((item: TreeNode) => {
                      if (item.key == obj.accessmenu_code) {
                        item.partialSelected = false;
                        this.selectedFilesself.push(item)
                      }
                    })
                  } else {
                    child.children?.find((item: TreeNode) => {
                      if (item.key == obj.accessmenu_code) {
                        item.partialSelected = false;
                        item.parent = child;
                        item.parent.partialSelected = true;
                        this.selectedFilesself.push(item)
                      }
                    })
                  }
                }
              })
            }
          }
        }
      }
      if (item.accessdata_module == "PRO") {
        this.proadding = item.accessdata_new;
        this.proedit = item.accessdata_edit;
        this.prodelete = item.accessdata_delete;
        this.prosalary = item.accessdata_salary;
        if (item.accessmenu_data.some((item: AccessmenuModel) => item.accessmenu_type == "MAIN")) {
          this.selectedFilespro = [];
          this.filespro.forEach((filepro: TreeNode) => {
            filepro.partialSelected = false;
            this.selectedFilespro.push(filepro)
            filepro.children?.forEach((child: TreeNode) => {
              child.partialSelected = false;
              this.selectedFilespro.push(child)
              child.children?.forEach((item: TreeNode) => {
                item.partialSelected = false;
                this.selectedFilespro.push(item)
              })
            })
          })
        } else {
          for (const obj of item.accessmenu_data) {
            if (obj.accessmenu_type == 'SUB') {
              this.filespro[0].children?.find((child: TreeNode) => {
                if (child.key == obj.accessmenu_code) {
                  child.partialSelected = false;
                  child.parent!.partialSelected = true;
                  this.selectedFilespro.push(child)
                }
              })
            }
            if (obj.accessmenu_type == 'ITEM') {
              this.filespro[0].children?.find((child: TreeNode) => {
                if (child.key == obj.accessmenu_code.split('-')[0]) {

                  if (item.accessmenu_data.some((item: AccessmenuModel) => item.accessmenu_code === obj.accessmenu_code.split('-')[0] && item.accessmenu_type == "SUB")) {
                    child.children?.find((item: TreeNode) => {
                      if (item.key == obj.accessmenu_code) {
                        item.partialSelected = false;
                        this.selectedFilespro.push(item)
                      }
                    })
                  } else {
                    child.children?.find((item: TreeNode) => {
                      if (item.key == obj.accessmenu_code) {
                        item.partialSelected = false;
                        item.parent = child;
                        item.parent.partialSelected = true;
                        this.selectedFilespro.push(item)
                      }
                    })
                  }
                }
              })
            }
          }
        }
      }
      if (item.accessdata_module == "EMP") {
        this.empadding = item.accessdata_new;
        this.empedit = item.accessdata_edit;
        this.empdelete = item.accessdata_delete;
        this.empsalary = item.accessdata_salary;
        if (item.accessmenu_data.some((item: AccessmenuModel) => item.accessmenu_type == "MAIN")) {
          this.selectedFilesemp = [];
          this.filesemp.forEach((fileemp: TreeNode) => {
            fileemp.partialSelected = false;
            this.selectedFilesemp.push(fileemp)
            fileemp.children?.forEach((child: TreeNode) => {
              child.partialSelected = false;
              this.selectedFilesemp.push(child)
              child.children?.forEach((item: TreeNode) => {
                item.partialSelected = false;
                this.selectedFilesemp.push(item)
              })
            })
          })
        } else {
          for (const obj of item.accessmenu_data) {
            if (obj.accessmenu_type == 'SUB') {
              this.filesemp[0].children?.find((child: TreeNode) => {
                if (child.key == obj.accessmenu_code) {
                  child.partialSelected = false;
                  child.parent!.partialSelected = true;
                  this.selectedFilesemp.push(child)
                }
              })
            }
            if (obj.accessmenu_type == 'ITEM') {
              this.filesemp[0].children?.find((child: TreeNode) => {
                if (child.key == obj.accessmenu_code.split('-')[0]) {

                  if (item.accessmenu_data.some((item: AccessmenuModel) => item.accessmenu_code === obj.accessmenu_code.split('-')[0] && item.accessmenu_type == "SUB")) {
                    child.children?.find((item: TreeNode) => {
                      if (item.key == obj.accessmenu_code) {
                        item.partialSelected = false;
                        this.selectedFilesemp.push(item)
                      }
                    })
                  } else {
                    child.children?.find((item: TreeNode) => {
                      if (item.key == obj.accessmenu_code) {
                        item.partialSelected = false;
                        item.parent = child;
                        item.parent.partialSelected = true;
                        this.selectedFilesemp.push(item)
                      }
                    })
                  }
                }
              })
            }
          }
        }
      }
      if (item.accessdata_module == "REQ") {
        this.reqadding = item.accessdata_new;
        this.reqedit = item.accessdata_edit;
        this.reqdelete = item.accessdata_delete;
        this.reqsalary = item.accessdata_salary;
        if (item.accessmenu_data.some((item: AccessmenuModel) => item.accessmenu_type == "MAIN")) {
          this.selectedFilesreq = [];
          this.filesreq.forEach((filereq: TreeNode) => {
            filereq.partialSelected = false;
            this.selectedFilesreq.push(filereq)
            filereq.children?.forEach((child: TreeNode) => {
              child.partialSelected = false;
              this.selectedFilesreq.push(child)
              child.children?.forEach((item: TreeNode) => {
                item.partialSelected = false;
                this.selectedFilesreq.push(item)
              })
            })
          })
        } else {
          for (const obj of item.accessmenu_data) {
            if (obj.accessmenu_type == 'SUB') {
              this.filesreq[0].children?.find((child: TreeNode) => {
                if (child.key == obj.accessmenu_code) {
                  child.partialSelected = false;
                  child.parent!.partialSelected = true;
                  this.selectedFilesreq.push(child)
                }
              })
            }
            if (obj.accessmenu_type == 'ITEM') {
              this.filesreq[0].children?.find((child: TreeNode) => {
                if (child.key == obj.accessmenu_code.split('-')[0]) {

                  if (item.accessmenu_data.some((item: AccessmenuModel) => item.accessmenu_code === obj.accessmenu_code.split('-')[0] && item.accessmenu_type == "SUB")) {
                    child.children?.find((item: TreeNode) => {
                      if (item.key == obj.accessmenu_code) {
                        item.partialSelected = false;
                        this.selectedFilesreq.push(item)
                      }
                    })
                  } else {
                    child.children?.find((item: TreeNode) => {
                      if (item.key == obj.accessmenu_code) {
                        item.partialSelected = false;
                        item.parent = child;
                        item.parent.partialSelected = true;
                        this.selectedFilesreq.push(item)
                      }
                    })
                  }
                }
              })
            }
          }
        }
      }
      if (item.accessdata_module == "ATT") {
        this.attadding = item.accessdata_new;
        this.attedit = item.accessdata_edit;
        this.attdelete = item.accessdata_delete;
        this.attsalary = item.accessdata_salary;
        if (item.accessmenu_data.some((item: AccessmenuModel) => item.accessmenu_type == "MAIN")) {
          this.selectedFilesatt = [];
          this.filesatt.forEach((fileatt: TreeNode) => {
            fileatt.partialSelected = false;
            this.selectedFilesatt.push(fileatt)
            fileatt.children?.forEach((child: TreeNode) => {
              child.partialSelected = false;
              this.selectedFilesatt.push(child)
              child.children?.forEach((item: TreeNode) => {
                item.partialSelected = false;
                this.selectedFilesatt.push(item)
              })
            })
          })
        } else {
          for (const obj of item.accessmenu_data) {
            if (obj.accessmenu_type == 'SUB') {
              this.filesatt[0].children?.find((child: TreeNode) => {
                if (child.key == obj.accessmenu_code) {
                  child.partialSelected = false;
                  child.parent!.partialSelected = true;
                  this.selectedFilesatt.push(child)
                }
              })
            }
            if (obj.accessmenu_type == 'ITEM') {
              this.filesatt[0].children?.find((child: TreeNode) => {
                if (child.key == obj.accessmenu_code.split('-')[0]) {

                  if (item.accessmenu_data.some((item: AccessmenuModel) => item.accessmenu_code === obj.accessmenu_code.split('-')[0] && item.accessmenu_type == "SUB")) {
                    child.children?.find((item: TreeNode) => {
                      if (item.key == obj.accessmenu_code) {
                        item.partialSelected = false;
                        this.selectedFilesatt.push(item)
                      }
                    })
                  } else {
                    child.children?.find((item: TreeNode) => {
                      if (item.key == obj.accessmenu_code) {
                        item.partialSelected = false;
                        item.parent = child;
                        item.parent.partialSelected = true;
                        this.selectedFilesatt.push(item)
                      }
                    })
                  }
                }
              })
            }
          }
        }
      }
      if (item.accessdata_module == "PAY") {
        this.payadding = item.accessdata_new;
        this.payedit = item.accessdata_edit;
        this.paydelete = item.accessdata_delete;
        this.paysalary = item.accessdata_salary;
        if (item.accessmenu_data.some((item: AccessmenuModel) => item.accessmenu_type == "MAIN")) {
          this.selectedFilespay = [];
          this.filespay.forEach((filepay: TreeNode) => {
            filepay.partialSelected = false;
            this.selectedFilespay.push(filepay)
            filepay.children?.forEach((child: TreeNode) => {
              child.partialSelected = false;
              this.selectedFilespay.push(child)
              child.children?.forEach((item: TreeNode) => {
                item.partialSelected = false;
                this.selectedFilespay.push(item)
              })
            })
          })
        } else {
          for (const obj of item.accessmenu_data) {
            if (obj.accessmenu_type == 'SUB') {
              this.filespay[0].children?.find((child: TreeNode) => {
                if (child.key == obj.accessmenu_code) {
                  child.partialSelected = false;
                  child.parent!.partialSelected = true;
                  this.selectedFilespay.push(child)
                }
              })
            }
            if (obj.accessmenu_type == 'ITEM') {
              this.filespay[0].children?.find((child: TreeNode) => {
                if (child.key == obj.accessmenu_code.split('-')[0]) {

                  if (item.accessmenu_data.some((item: AccessmenuModel) => item.accessmenu_code === obj.accessmenu_code.split('-')[0] && item.accessmenu_type == "SUB")) {
                    child.children?.find((item: TreeNode) => {
                      if (item.key == obj.accessmenu_code) {
                        item.partialSelected = false;
                        this.selectedFilespay.push(item)
                      }
                    })
                  } else {
                    child.children?.find((item: TreeNode) => {
                      if (item.key == obj.accessmenu_code) {
                        item.partialSelected = false;
                        item.parent = child;
                        item.parent.partialSelected = true;
                        this.selectedFilespay.push(item)
                      }
                    })
                  }
                }
              })
            }
          }
        }
      }
      if (item.accessdata_module == "SYS") {
        this.sysadding = item.accessdata_new;
        this.sysedit = item.accessdata_edit;
        this.sysdelete = item.accessdata_delete;
        this.syssalary = item.accessdata_salary;
        if (item.accessmenu_data.some((item: AccessmenuModel) => item.accessmenu_type == "MAIN")) {
          this.selectedFilessys = [];
          this.filessys.forEach((filesys: TreeNode) => {
            filesys.partialSelected = false;
            this.selectedFilessys.push(filesys)
            filesys.children?.forEach((child: TreeNode) => {
              child.partialSelected = false;
              this.selectedFilessys.push(child)
              child.children?.forEach((item: TreeNode) => {
                item.partialSelected = false;
                this.selectedFilessys.push(item)
              })
            })
          })
        } else {
          for (const obj of item.accessmenu_data) {
            if (obj.accessmenu_type == 'SUB') {
              this.filessys[0].children?.find((child: TreeNode) => {
                if (child.key == obj.accessmenu_code) {
                  child.partialSelected = false;
                  child.parent!.partialSelected = true;
                  this.selectedFilessys.push(child)
                }
              })
            }
            if (obj.accessmenu_type == 'ITEM') {
              this.filessys[0].children?.find((child: TreeNode) => {
                if (child.key == obj.accessmenu_code.split('-')[0]) {

                  if (item.accessmenu_data.some((item: AccessmenuModel) => item.accessmenu_code === obj.accessmenu_code.split('-')[0] && item.accessmenu_type == "SUB")) {
                    child.children?.find((item: TreeNode) => {
                      if (item.key == obj.accessmenu_code) {
                        item.partialSelected = false;
                        this.selectedFilessys.push(item)
                      }
                    })
                  } else {
                    child.children?.find((item: TreeNode) => {
                      if (item.key == obj.accessmenu_code) {
                        item.partialSelected = false;
                        item.parent = child;
                        item.parent.partialSelected = true;
                        this.selectedFilessys.push(item)
                      }
                    })
                  }
                }
              })
            }
          }
        }
      }
    }
    this.isDisplayingManagement = true;
    this.edit_data = true;
  }
  closeManagement(): void {
    this.isDisplayingManagement = false;
    this.edit_data = false;
    this.selectedpolmenu = new PolmenuModel();
    this.selectedFilesself = [];
    this.selectedFilespro = [];
    this.selectedFilesemp = [];
    this.selectedFilesreq = [];
    this.selectedFilesatt = [];
    this.selectedFilespay = [];
    this.selectedFilessys = [];
    this.selfadding = false;
    this.selfedit = false;
    this.selfdelete = false;
    this.selfsalary = false;

    this.proadding = false;
    this.proedit = false;
    this.prodelete = false;
    this.prosalary = false;

    this.empadding = false;
    this.empedit = false;
    this.empdelete = false;
    this.empsalary = false;

    this.reqadding = false;
    this.reqedit = false;
    this.reqdelete = false;
    this.reqsalary = false;

    this.attadding = false;
    this.attedit = false;
    this.attdelete = false;
    this.attsalary = false;

    this.payadding = false;
    this.payedit = false;
    this.paydelete = false;
    this.paysalary = false;

    this.sysadding = false;
    this.sysedit = false;
    this.sysdelete = false;
    this.syssalary = false;
  }
  tabChange(e: { index: any; }) {
    // console.log(e)
  }
}
