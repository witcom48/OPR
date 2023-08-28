import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';
import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';
import { RequestService } from 'src/app/services/recruitment/request.service';
import { RequestModel } from 'src/app/models/recruitment/request';
import { PositionService } from 'src/app/services/emp/policy/position.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { EmptypeService } from 'src/app/services/emp/policy/emptype.service';
import { PositionModel } from 'src/app/models/employee/policy/position';
import { ProjectModel } from 'src/app/models/project/project';
import { EmptypeModel } from 'src/app/models/employee/policy/emptype';
import { AccessdataModel } from 'src/app/models/system/security/accessdata';

interface urgen {
  name_th: string,
  name_en: string,
  code: string
}
interface Status {
  name_th: string,
  name_en: string,
  code: number
}
@Component({
  selector: 'app-recruitment-request',
  templateUrl: './recruitment-request.component.html',
  styleUrls: ['./recruitment-request.component.scss']
})
export class RecruitmentRequestComponent implements OnInit {

  toolbar_menu: MenuItem[] = [];
  items: MenuItem[] = [];

  items_tab: MenuItem[] = [];
  edit_data: boolean = false;
  new_data: boolean = false;

  urgen_List: urgen[] = [];

  request_list: RequestModel[] = [];
  selectedRequest: RequestModel = new RequestModel();

  status_list: Status[] = [{ name_th: 'กำลังเปิด', name_en: 'Open', code: 0 }, { name_th: 'ปิดรับ', name_en: 'Close', code: 3 }, { name_th: 'ยกเลิก', name_en: 'Cancel', code: 4 }];
  status_select: Status = { name_th: 'กำลังเปิด', name_en: 'Open', code: 0 }
  status_doc: boolean = false

  itemsOptions: MenuItem[] = [];

  constructor(private requestService: RequestService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,

    private positionService: PositionService,
    private projectService: ProjectService,
    private emptypeService: EmptypeService,
  ) {
    this.urgen_List = [
      { name_th: 'ต่ำ', name_en: 'Low', code: 'Low' },
      { name_th: 'ปกติ', name_en: 'Normal', code: 'Normal' },
      { name_th: 'เร่งด่วน', name_en: 'Urgent', code: 'Urgent' },
    ];
  }

  ngOnInit(): void {

    this.doGetInitialCurrent()
    this.doLoadLanguage()
    this.doLoadMenu()

    //dropdown
    this.doloadPositionlist();
    this.doloadProjectlist();
    this.doloadEmptypelist();

    setTimeout(() => {

      this.doLoadRequest()
    }, 500);


  }

  initialData2: InitialCurrent = new InitialCurrent();
  accessData: AccessdataModel = new AccessdataModel();
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('login');
    }
    this.accessData = this.initialData2.dotGetPolmenu('REQ');
  }

  title_page: string = "Request";
  title_new: string = "New";
  title_edit: string = "Edit";
  title_delete: string = "Delete";
  title_import: string = "Import";
  title_export: string = "Export";
  title_save: string = "Save";
  title_code: string = "Code";
  title_name_th: string = "Name (Thai)";
  title_name_en: string = "Name (Eng.)";
  title_modified_by: string = "Edit by";
  title_modified_date: string = "Edit date";
  title_search: string = "Search";
  title_upload: string = "Upload";

  title_page_from: string = "Showing";
  title_page_to: string = "to";
  title_page_total: string = "of";
  title_page_record: string = "entries";

  title_confirm: string = "Are you sure?";
  title_confirm_record: string = "Confirm to record";
  title_confirm_delete: string = "Confirm to delete";
  title_confirm_yes: string = "Yes";
  title_confirm_no: string = "No";

  title_confirm_cancel: string = "You have cancelled";

  title_request: string = "Request Date";
  title_agency: string = "Agency";
  title_work: string = "Work";
  title_job_type: string = "Job Type";
  title_employee_type: string = "Employee Type";
  title_quantity: string = "Quantity";
  title_urgency: string = "Urgency";
  title_wage_rate: string = "Wage Rate";
  title_overtime: string = "Overtime";
  title_another: string = "Another";

  title_date: { [key: string]: string } = { EN: "Date", TH: "วันที่ทำรายการ" };
  title_startdate: { [key: string]: string } = { EN: "Startdate", TH: "ตั้งแต่วันที่" };
  title_enddate: { [key: string]: string } = { EN: "Duedate", TH: "ถึงวันที่" };
  title_position: { [key: string]: string } = { EN: "Position", TH: "ตำแหน่ง" };
  title_project: { [key: string]: string } = { EN: "Project", TH: "โครงการ" };
  title_note: { [key: string]: string } = { EN: "More", TH: "เพิ่มเติม" };

  title_status: { [key: string]: string } = { EN: "Status", TH: "สถานะ" };
  title_accepted: { [key: string]: string } = { EN: "Accepted", TH: "รับแล้ว" };
  title_complete: { [key: string]: string } = { EN: "Complete", TH: "สำเร็จ" };

  doLoadLanguage() {
    if (this.initial_current.Language == "TH") {
      this.title_page = "ร้องขอกำลังพล";
      this.title_new = "เพิ่ม";
      this.title_edit = "แก้ไข";
      this.title_delete = "ลบ";
      this.title_import = "นำเข้า";
      this.title_export = "โอนออก";
      this.title_save = "บันทึก";
      this.title_code = "รหัส";
      this.title_name_th = "ชื่อไทย";
      this.title_name_en = "ชื่ออังกฤษ";
      this.title_modified_by = "ผู้ทำรายการ";
      this.title_modified_date = "วันที่ทำรายการ";
      this.title_search = "ค้นหา";
      this.title_upload = "อัพโหลด";

      this.title_page_from = "แสดง";
      this.title_page_to = "ถึง";
      this.title_page_total = "จาก";
      this.title_page_record = "รายการ";

      this.title_confirm = "ยืนยันการทำรายการ";
      this.title_confirm_record = "คุณต้องการบันทึกการทำรายการ";
      this.title_confirm_delete = "คุณต้องการลบรายการ";

      this.title_confirm_yes = "ใช่";
      this.title_confirm_no = "ยกเลิก";
      this.title_confirm_cancel = "คุณยกเลิกการทำรายการ";




      this.title_request = "วันที่ร้องขอ";
      this.title_agency = "หน่วยงาน";
      this.title_work = "งาน";
      this.title_job_type = "ประเภทงาน";
      this.title_employee_type = "ประเภทพนักงาน";
      this.title_quantity = "จำนวน";
      this.title_urgency = "ความเร่งด่วน";
      this.title_wage_rate = "อัตราค่าจ้าง";
      this.title_overtime = "ค่าล่วงเวลา";
      this.title_another = "อื่นๆ";
    }
  }

  doLoadMenu() {

    this.items = [
      {
        label: this.title_new,
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          if (this.accessData.accessdata_new) {
            this.showManage()
            this.selectedRequest = new RequestModel();
            this.new_data = true;
            this.edit_data = false;
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Permission denied' });
          }
        }
      }
      ,
      {
        label: this.title_import,
        icon: 'pi pi-fw pi-file-import',
        command: (event) => {
          this.showUpload()

        }
      }
      ,
      {
        label: this.title_export,
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel()

        }
      }
    ];

    this.itemsOptions = [{

      items: [
        {
          label: this.title_edit,
          icon: 'pi pi-fw pi-pencil',
          command: (event) => {
            if (this.accessData.accessdata_edit) {
              this.showManage()
              this.edit_data = true;
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Permission denied' });
            }
          }
        }
        ,
        {
          label: this.title_delete,
          icon: 'pi pi-trash',
          command: () => {
            if (this.accessData.accessdata_delete) {
              this.confirmDelete(this.selectedRequest)
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Permission denied' });
            }
          }
        },
        {
          label: this.title_complete[this.initial_current.Language],
          icon: 'pi pi-check',
          command: () => {
            this.confirmationService.confirm({
              message: this.title_confirm_record,
              header: this.title_confirm,
              icon: 'pi pi-exclamation-triangle',
              accept: () => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Complete' });
              },
              reject: () => {
                this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
              }
            });
          }
        }
      ]
    },

    ];
  }
  selectRow(data: any) {
    this.selectedRequest = data;
  }

  //dropdown
  positionList: PositionModel[] = [];
  doloadPositionlist() {
    this.positionService.position_get().then((res) => {
      this.positionList = res;
    })
  }
  projectList: ProjectModel[] = [];
  doloadProjectlist() {
    this.projectService.project_get(this.initial_current.CompCode, '').then((res) => {
      this.projectList = res;
    })
  }
  emptypeList: EmptypeModel[] = [];
  doloadEmptypelist() {
    this.emptypeService.type_get().then((res) => {
      this.emptypeList = res;
    })
  }

  Search() {
    if (this.status_select.code) {
      this.status_doc = true;
    } else {
      this.status_doc = false;
    }
    this.doLoadRequest();
  }

  doLoadRequest() {
    var tmp = new RequestModel();
    tmp.request_status = this.status_select.code
    this.requestService.request_get(tmp).then(async (res) => {
      await res.forEach((element: RequestModel) => {
        element.request_date = new Date(element.request_date)
        element.request_startdate = new Date(element.request_startdate)
        element.request_enddate = new Date(element.request_enddate)
      })
      this.request_list = res;
    });
  }

  confirmRecord() {
    this.confirmationService.confirm({
      message: this.title_confirm_record,
      header: this.title_confirm,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doRecordRequest()
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
      },
      key: "myDialog"
    });
  }

  doRecordRequest() {
    this.requestService.request_record(this.selectedRequest).then((res) => {
      // console.log(res)
      let result = JSON.parse(res);

      if (result.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
        this.doLoadRequest()
        this.edit_data = false;
        this.new_data = false;
        this.displayManage = false
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
      }

    });
  }

  confirmDelete(data: RequestModel) {
    this.confirmationService.confirm({
      message: this.title_confirm_delete,
      header: this.title_confirm,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doDeleteRequest(data)
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: this.title_confirm_cancel });
      }
    });
  }

  async doDeleteRequest(data: RequestModel) {
    await this.requestService.request_delete(data).then((res) => {
      // console.log(res)
      let result = JSON.parse(res);

      if (result.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
        this.doLoadRequest();
        this.edit_data = false;
        this.new_data = false;
        this.displayManage = false
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
      }

    });
  }
  close() {
    this.new_data = false
    this.selectedRequest = new RequestModel()

  }

  onRowSelectRequest(event: Event) {
    this.edit_data = true;
    this.new_data = true;
    this.displayManage = true
  }



  fileToUpload: File | any = null;
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
  }

  doUploadRequest() {

    this.displayUpload = false;

    const filename = "Request_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmm');
    const filetype = "xls";


    this.requestService.request_import(this.fileToUpload, filename, filetype).then((res) => {
      // console.log(res)
      let result = JSON.parse(res);

      if (result.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message });
        this.doLoadRequest();
        this.edit_data = false;
        this.new_data = false;
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
      }

    });
  }
  ///
  displayManage: boolean = false;
  position: string = "right";
  showManage() {
    this.displayManage = true
  }


  displayUpload: boolean = false;
  showUpload() {
    this.displayUpload = true;
  }

  @ViewChild('TABLE') table: ElementRef | any = null;

  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    for (var i in ws) {
      if (i.startsWith("!") || i.charAt(1) !== "1") {
        continue;
      }
      var n = 0;
      for (var j in ws) {
        if (j.startsWith(i.charAt(0)) && j.charAt(1) !== "1" && ws[i].v !== "") {
          ws[j].v = ws[j].v.replace(ws[i].v, "")
        } else {
          n += 1;
        }

      }
    }
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Export_Request.xlsx');

  }

  //get position name
  doGetPositionDetail(PositionCode: string): any {
    for (let i = 0; i < this.positionList.length; i++) {
      if (this.positionList[i].position_code == PositionCode) {
        if (this.initial_current.Language == "TH") {
          return this.positionList[i].position_name_th;
        }
        else {
          return this.positionList[i].position_name_en;
        }
      }
    }
  }

  //get Project Name
  doGetProjectDetail(ProjectCode: string): any {
    for (let i = 0; i < this.projectList.length; i++) {
      if (this.projectList[i].project_code == ProjectCode) {
        if (this.initial_current.Language == "TH") {
          return this.projectList[i].project_name_th;
        }
        else {
          return this.projectList[i].project_name_en;
        }
      }
    }
  }

  //get type name
  doGetTypeDetail(TypeCode: string): any {
    for (let i = 0; i < this.emptypeList.length; i++) {
      if (this.emptypeList[i].type_code == TypeCode) {
        if (this.initial_current.Language == "TH") {
          return this.emptypeList[i].type_name_th;
        }
        else {
          return this.emptypeList[i].type_name_en;
        }
      }
    }
  }

  getFullStatus(code: number): any {
    for (let i = 0; i < this.status_list.length; i++) {
      if (this.status_list[i].code == code) {
        if (this.initial_current.Language == "TH") {
          return this.status_list[i].name_th;
        }
        else {
          return this.status_list[i].name_en;
        }
      }
    }
  }

}




