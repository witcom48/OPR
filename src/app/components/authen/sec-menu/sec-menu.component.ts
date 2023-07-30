import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService, TreeNode } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';
import { AccessmenuModel } from 'src/app/models/system/security/accessmenu';
import { ItemMenuModel } from 'src/app/models/system/security/itemmenu';
import { MainMenuModel } from 'src/app/models/system/security/mainmenu';
import { PolmenuModel } from 'src/app/models/system/security/polmenu';
import { SubMenuModel } from 'src/app/models/system/security/submenu';
import { MainMenuService } from 'src/app/services/system/security/menu.service';
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
  menuList: MainMenuModel[] = [];
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

  selfFiles: TreeNode[] = [];
  proFiles: TreeNode[] = [];
  empFiles: TreeNode[] = [];
  reqFiles: TreeNode[] = [];
  attFiles: TreeNode[] = [];
  payFiles: TreeNode[] = [];
  sysFiles: TreeNode[] = [];

  selectedselfFiles: TreeNode[] = [];
  selectedproFiles: TreeNode[] = [];
  selectedempFiles: TreeNode[] = [];
  selectedreqFiles: TreeNode[] = [];
  selectedattFiles: TreeNode[] = [];
  selectedpayFiles: TreeNode[] = [];
  selectedsysFiles: TreeNode[] = [];
  constructor(
    private router: Router,
    private messageService: MessageService,
    private mainMenuService: MainMenuService,
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
    this.loadMainMenu();
    this.loadMenu();
  }
  sumit(): void {
    // console.log(this.selectedattFiles);
    // console.log(this.selectedempFiles);
    // console.log(this.attFiles);
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
    this.selectedselfFiles.forEach((fileself: TreeNode) => {
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
    this.selectedproFiles.forEach((filepro: TreeNode) => {
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
    this.selectedempFiles.forEach((fileemp: TreeNode) => {
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
    this.selectedreqFiles.forEach((filereq: TreeNode) => {
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
    this.selectedattFiles.forEach((fileAtt: TreeNode) => {
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
    this.selectedpayFiles.forEach((filepay: TreeNode) => {
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
    this.selectedsysFiles.forEach((filesys: TreeNode) => {
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

  async doDeletePolmenu(data: PolmenuModel) {
    await this.polmenuService.polmenu_delete(data).then((res) => {
      // console.log(res)
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadPolmenu()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.closeManagement();
    this.new_data = false;
    this.edit_data = false;
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
  async loadMainMenu(): Promise<void> {
    this.menuList = [];
    const mainMenuRequest = new MainMenuModel();
    const mainMenuData = await this.mainMenuService.fetchMainMenu(mainMenuRequest);

    mainMenuData.forEach(async (mainMenu: MainMenuModel) => {
      const mainMenuCode = mainMenu.mainmenu_code;
      const mainMenuDetail = this.accountLanguages == "EN" ? mainMenu.mainmenu_detail_en : mainMenu.mainmenu_detail_th;
      const submenuList: any[] = [];

      mainMenu.submenu_data.forEach((submenu: SubMenuModel) => {
        const submenuCode = submenu.submenu_code;
        const submenuDetail = this.accountLanguages == "EN" ? submenu.submenu_detail_en : submenu.submenu_detail_th;
        const itemMenuList: any[] = [];

        submenu.itemmenu_data.forEach((itemMenu: ItemMenuModel) => {
          const itemMenuCode = itemMenu.itemmenu_code;
          const itemMenuDetail = this.accountLanguages == "EN" ? itemMenu.itemmenu_detail_en : itemMenu.itemmenu_detail_th;
          itemMenuList.push({
            key: itemMenuCode,
            data: "ITEM",
            label: itemMenuDetail
          });
        });

        submenuList.push({
          key: submenuCode,
          data: "SUB",
          label: submenuDetail,
          children: itemMenuList
        });
      });

      switch (mainMenuCode) {
        case "SELF":
          this.selfFiles = [
            {
              key: mainMenuCode,
              data: "MAIN",
              label: mainMenuDetail,
              children: submenuList,
              expanded: true
            }
          ];
          break;

        case "PRO":
          this.proFiles = [
            {
              key: mainMenuCode,
              data: "MAIN",
              label: mainMenuDetail,
              children: submenuList,
              expanded: true
            }
          ];
          break;

        case "EMP":
          this.empFiles = [
            {
              key: mainMenuCode,
              data: "MAIN",
              label: mainMenuDetail,
              children: submenuList,
              expanded: true
            }
          ];
          break;

        case "REQ":
          this.reqFiles = [
            {
              key: mainMenuCode,
              data: "MAIN",
              label: mainMenuDetail,
              children: submenuList,
              expanded: true
            }
          ];
          break;

        case "ATT":
          this.attFiles = [
            {
              key: mainMenuCode,
              data: "MAIN",
              label: mainMenuDetail,
              children: submenuList,
              expanded: true
            }
          ];
          break;

        case "PAY":
          this.payFiles = [
            {
              key: mainMenuCode,
              data: "MAIN",
              label: mainMenuDetail,
              children: submenuList,
              expanded: true
            }
          ];
          break;

        case "SYS":
          this.sysFiles = [
            {
              key: mainMenuCode,
              data: "MAIN",
              label: mainMenuDetail,
              children: submenuList,
              expanded: true
            }
          ];
          break;

        default:
          // Do nothing for unknown main menu codes.
          break;
      }
    });

    this.doLoadPolmenu();
  }
  onRowSelection1(events: any) {
    this.resetSelectedFiles();

    for (const item of this.selectedpolmenu.accessdata_data) {
      const module = item.accessdata_module.toLowerCase();
      const filesKey: keyof this = `${module}Files` as keyof this;
      const selectedFilesKey: keyof this = `selected${module}Files` as keyof this;

      const files = this[filesKey]
      const selectedFiles = this[selectedFilesKey]
      console.log(files)
      console.log(selectedFiles)

      this.updateSelectedFiles(item.accessmenu_data, files, selectedFiles);
    }

    this.isDisplayingManagement = true;
    this.edit_data = true;
  }

  resetSelectedFiles() {
    this.selectedselfFiles = [];
    this.selectedproFiles = [];
    this.selectedempFiles = [];
    this.selectedreqFiles = [];
    this.selectedattFiles = [];
    this.selectedpayFiles = [];
    this.selectedsysFiles = [];
  }

  updateSelectedFiles(accessmenu_data: AccessmenuModel[], files: any, selectedFiles: any) {
    const processMenuType = (menuType: string, file: TreeNode) => {
      if (menuType === 'ITEM') {
        file.partialSelected = false;
        if (file.parent) {
          file.parent.partialSelected = true;
        }
        selectedFiles.push(file);
      } else if (menuType === 'SUB') {
        file.partialSelected = false;
        if (file.parent) {
          file.parent.partialSelected = true;
        }
        selectedFiles.push(file);
      }
    };

    const updateFiles = (menuCode: string, menuType: string) => {
      const file = files[0].children?.find((child: TreeNode) => child.key === menuCode);
      if (file) {
        processMenuType(menuType, file);
      }
    };

    for (const obj of accessmenu_data) {
      const { accessmenu_type, accessmenu_code } = obj;
      const menuCode = accessmenu_code.split('-')[0];

      if (accessmenu_type === 'MAIN') {
        files.forEach((file: TreeNode) => {
          file.partialSelected = false;
          selectedFiles.push(file);
          file.children?.forEach((child: TreeNode) => {
            child.partialSelected = false;
            selectedFiles.push(child);
            child.children?.forEach((item: TreeNode) => {
              item.partialSelected = false;
              selectedFiles.push(item);
            });
          });
        });
      } else {
        updateFiles(menuCode, accessmenu_type);
      }
    }
  }


  onRowSelection(events: any) {
    this.selectedselfFiles = [];
    this.selectedproFiles = [];
    this.selectedempFiles = [];
    this.selectedreqFiles = [];
    this.selectedattFiles = [];
    this.selectedpayFiles = [];
    this.selectedsysFiles = [];
    for (const item of this.selectedpolmenu.accessdata_data) {
      if (item.accessdata_module == "SELF") {
        this.selfadding = item.accessdata_new;
        this.selfedit = item.accessdata_edit;
        this.selfdelete = item.accessdata_delete;
        this.selfsalary = item.accessdata_salary;
        if (item.accessmenu_data.some((item: AccessmenuModel) => item.accessmenu_type == "MAIN")) {
          this.selectedselfFiles = [];
          this.selfFiles.forEach((fileSelf: TreeNode) => {
            fileSelf.partialSelected = false;
            this.selectedselfFiles.push(fileSelf)
            fileSelf.children?.forEach((child: TreeNode) => {
              child.partialSelected = false;
              this.selectedselfFiles.push(child)
              child.children?.forEach((item: TreeNode) => {
                item.partialSelected = false;
                this.selectedselfFiles.push(item)
              })
            })
          })
        } else {
          for (const obj of item.accessmenu_data) {
            if (obj.accessmenu_type == 'SUB') {
              this.selfFiles[0].children?.find((child: TreeNode) => {
                if (child.key == obj.accessmenu_code) {
                  child.partialSelected = false;
                  child.parent!.partialSelected = true;
                  this.selectedselfFiles.push(child)
                }
              })
            }
            if (obj.accessmenu_type == 'ITEM') {
              this.selfFiles[0].children?.find((child: TreeNode) => {
                if (child.key == obj.accessmenu_code.split('-')[0]) {

                  if (item.accessmenu_data.some((item: AccessmenuModel) => item.accessmenu_code === obj.accessmenu_code.split('-')[0] && item.accessmenu_type == "SUB")) {
                    child.children?.find((item: TreeNode) => {
                      if (item.key == obj.accessmenu_code) {
                        item.partialSelected = false;
                        this.selectedselfFiles.push(item)
                      }
                    })
                  } else {
                    child.children?.find((item: TreeNode) => {
                      if (item.key == obj.accessmenu_code) {
                        item.partialSelected = false;
                        item.parent = child;
                        item.parent.partialSelected = true;
                        this.selectedselfFiles.push(item)
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
          this.selectedproFiles = [];
          this.proFiles.forEach((filepro: TreeNode) => {
            filepro.partialSelected = false;
            this.selectedproFiles.push(filepro)
            filepro.children?.forEach((child: TreeNode) => {
              child.partialSelected = false;
              this.selectedproFiles.push(child)
              child.children?.forEach((item: TreeNode) => {
                item.partialSelected = false;
                this.selectedproFiles.push(item)
              })
            })
          })
        } else {
          for (const obj of item.accessmenu_data) {
            if (obj.accessmenu_type == 'SUB') {
              this.proFiles[0].children?.find((child: TreeNode) => {
                if (child.key == obj.accessmenu_code) {
                  child.partialSelected = false;
                  child.parent!.partialSelected = true;
                  this.selectedproFiles.push(child)
                }
              })
            }
            if (obj.accessmenu_type == 'ITEM') {
              this.proFiles[0].children?.find((child: TreeNode) => {
                if (child.key == obj.accessmenu_code.split('-')[0]) {

                  if (item.accessmenu_data.some((item: AccessmenuModel) => item.accessmenu_code === obj.accessmenu_code.split('-')[0] && item.accessmenu_type == "SUB")) {
                    child.children?.find((item: TreeNode) => {
                      if (item.key == obj.accessmenu_code) {
                        item.partialSelected = false;
                        this.selectedproFiles.push(item)
                      }
                    })
                  } else {
                    child.children?.find((item: TreeNode) => {
                      if (item.key == obj.accessmenu_code) {
                        item.partialSelected = false;
                        item.parent = child;
                        item.parent.partialSelected = true;
                        this.selectedproFiles.push(item)
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
          this.selectedempFiles = [];
          this.empFiles.forEach((fileemp: TreeNode) => {
            fileemp.partialSelected = false;
            this.selectedempFiles.push(fileemp)
            fileemp.children?.forEach((child: TreeNode) => {
              child.partialSelected = false;
              this.selectedempFiles.push(child)
              child.children?.forEach((item: TreeNode) => {
                item.partialSelected = false;
                this.selectedempFiles.push(item)
              })
            })
          })
        } else {
          for (const obj of item.accessmenu_data) {
            if (obj.accessmenu_type == 'SUB') {
              this.empFiles[0].children?.find((child: TreeNode) => {
                if (child.key == obj.accessmenu_code) {
                  child.partialSelected = false;
                  child.parent!.partialSelected = true;
                  this.selectedempFiles.push(child)
                }
              })
            }
            if (obj.accessmenu_type == 'ITEM') {
              this.empFiles[0].children?.find((child: TreeNode) => {
                if (child.key == obj.accessmenu_code.split('-')[0]) {

                  if (item.accessmenu_data.some((item: AccessmenuModel) => item.accessmenu_code === obj.accessmenu_code.split('-')[0] && item.accessmenu_type == "SUB")) {
                    child.children?.find((item: TreeNode) => {
                      if (item.key == obj.accessmenu_code) {
                        item.partialSelected = false;
                        this.selectedempFiles.push(item)
                      }
                    })
                  } else {
                    child.children?.find((item: TreeNode) => {
                      if (item.key == obj.accessmenu_code) {
                        item.partialSelected = false;
                        item.parent = child;
                        item.parent.partialSelected = true;
                        this.selectedempFiles.push(item)
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
          this.selectedreqFiles = [];
          this.reqFiles.forEach((filereq: TreeNode) => {
            filereq.partialSelected = false;
            this.selectedreqFiles.push(filereq)
            filereq.children?.forEach((child: TreeNode) => {
              child.partialSelected = false;
              this.selectedreqFiles.push(child)
              child.children?.forEach((item: TreeNode) => {
                item.partialSelected = false;
                this.selectedreqFiles.push(item)
              })
            })
          })
        } else {
          for (const obj of item.accessmenu_data) {
            if (obj.accessmenu_type == 'SUB') {
              this.reqFiles[0].children?.find((child: TreeNode) => {
                if (child.key == obj.accessmenu_code) {
                  child.partialSelected = false;
                  child.parent!.partialSelected = true;
                  this.selectedreqFiles.push(child)
                }
              })
            }
            if (obj.accessmenu_type == 'ITEM') {
              this.reqFiles[0].children?.find((child: TreeNode) => {
                if (child.key == obj.accessmenu_code.split('-')[0]) {

                  if (item.accessmenu_data.some((item: AccessmenuModel) => item.accessmenu_code === obj.accessmenu_code.split('-')[0] && item.accessmenu_type == "SUB")) {
                    child.children?.find((item: TreeNode) => {
                      if (item.key == obj.accessmenu_code) {
                        item.partialSelected = false;
                        this.selectedreqFiles.push(item)
                      }
                    })
                  } else {
                    child.children?.find((item: TreeNode) => {
                      if (item.key == obj.accessmenu_code) {
                        item.partialSelected = false;
                        item.parent = child;
                        item.parent.partialSelected = true;
                        this.selectedreqFiles.push(item)
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
          this.selectedattFiles = [];
          this.attFiles.forEach((fileatt: TreeNode) => {
            fileatt.partialSelected = false;
            this.selectedattFiles.push(fileatt)
            fileatt.children?.forEach((child: TreeNode) => {
              child.partialSelected = false;
              this.selectedattFiles.push(child)
              child.children?.forEach((item: TreeNode) => {
                item.partialSelected = false;
                this.selectedattFiles.push(item)
              })
            })
          })
        } else {
          for (const obj of item.accessmenu_data) {
            if (obj.accessmenu_type == 'SUB') {
              this.attFiles[0].children?.find((child: TreeNode) => {
                if (child.key == obj.accessmenu_code) {
                  child.partialSelected = false;
                  child.parent!.partialSelected = true;
                  this.selectedattFiles.push(child)
                }
              })
            }
            if (obj.accessmenu_type == 'ITEM') {
              this.attFiles[0].children?.find((child: TreeNode) => {
                if (child.key == obj.accessmenu_code.split('-')[0]) {

                  if (item.accessmenu_data.some((item: AccessmenuModel) => item.accessmenu_code === obj.accessmenu_code.split('-')[0] && item.accessmenu_type == "SUB")) {
                    child.children?.find((item: TreeNode) => {
                      if (item.key == obj.accessmenu_code) {
                        item.partialSelected = false;
                        this.selectedattFiles.push(item)
                      }
                    })
                  } else {
                    child.children?.find((item: TreeNode) => {
                      if (item.key == obj.accessmenu_code) {
                        item.partialSelected = false;
                        item.parent = child;
                        item.parent.partialSelected = true;
                        this.selectedattFiles.push(item)
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
          this.selectedpayFiles = [];
          this.payFiles.forEach((filepay: TreeNode) => {
            filepay.partialSelected = false;
            this.selectedpayFiles.push(filepay)
            filepay.children?.forEach((child: TreeNode) => {
              child.partialSelected = false;
              this.selectedpayFiles.push(child)
              child.children?.forEach((item: TreeNode) => {
                item.partialSelected = false;
                this.selectedpayFiles.push(item)
              })
            })
          })
        } else {
          for (const obj of item.accessmenu_data) {
            if (obj.accessmenu_type == 'SUB') {
              this.payFiles[0].children?.find((child: TreeNode) => {
                if (child.key == obj.accessmenu_code) {
                  child.partialSelected = false;
                  child.parent!.partialSelected = true;
                  this.selectedpayFiles.push(child)
                }
              })
            }
            if (obj.accessmenu_type == 'ITEM') {
              this.payFiles[0].children?.find((child: TreeNode) => {
                if (child.key == obj.accessmenu_code.split('-')[0]) {

                  if (item.accessmenu_data.some((item: AccessmenuModel) => item.accessmenu_code === obj.accessmenu_code.split('-')[0] && item.accessmenu_type == "SUB")) {
                    child.children?.find((item: TreeNode) => {
                      if (item.key == obj.accessmenu_code) {
                        item.partialSelected = false;
                        this.selectedpayFiles.push(item)
                      }
                    })
                  } else {
                    child.children?.find((item: TreeNode) => {
                      if (item.key == obj.accessmenu_code) {
                        item.partialSelected = false;
                        item.parent = child;
                        item.parent.partialSelected = true;
                        this.selectedpayFiles.push(item)
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
          this.selectedsysFiles = [];
          this.sysFiles.forEach((filesys: TreeNode) => {
            filesys.partialSelected = false;
            this.selectedsysFiles.push(filesys)
            filesys.children?.forEach((child: TreeNode) => {
              child.partialSelected = false;
              this.selectedsysFiles.push(child)
              child.children?.forEach((item: TreeNode) => {
                item.partialSelected = false;
                this.selectedsysFiles.push(item)
              })
            })
          })
        } else {
          for (const obj of item.accessmenu_data) {
            if (obj.accessmenu_type == 'SUB') {
              this.sysFiles[0].children?.find((child: TreeNode) => {
                if (child.key == obj.accessmenu_code) {
                  child.partialSelected = false;
                  child.parent!.partialSelected = true;
                  this.selectedsysFiles.push(child)
                }
              })
            }
            if (obj.accessmenu_type == 'ITEM') {
              this.sysFiles[0].children?.find((child: TreeNode) => {
                if (child.key == obj.accessmenu_code.split('-')[0]) {

                  if (item.accessmenu_data.some((item: AccessmenuModel) => item.accessmenu_code === obj.accessmenu_code.split('-')[0] && item.accessmenu_type == "SUB")) {
                    child.children?.find((item: TreeNode) => {
                      if (item.key == obj.accessmenu_code) {
                        item.partialSelected = false;
                        this.selectedsysFiles.push(item)
                      }
                    })
                  } else {
                    child.children?.find((item: TreeNode) => {
                      if (item.key == obj.accessmenu_code) {
                        item.partialSelected = false;
                        item.parent = child;
                        item.parent.partialSelected = true;
                        this.selectedsysFiles.push(item)
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

  Delete() {
    this.doDeletePolmenu(this.selectedpolmenu);
  }
  closeManagement(): void {
    this.isDisplayingManagement = false;
    this.edit_data = false;
    this.selectedpolmenu = new PolmenuModel();
    this.selectedselfFiles = [];
    this.selectedproFiles = [];
    this.selectedempFiles = [];
    this.selectedreqFiles = [];
    this.selectedattFiles = [];
    this.selectedpayFiles = [];
    this.selectedsysFiles = [];
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
