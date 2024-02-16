import { DatePipe } from '@angular/common';
import * as L from "leaflet";
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { LocationService } from 'src/app/services/system/policy/location.service';
import { AreaServices } from 'src/app/services/self/area.service';
import { MTAreaModel } from 'src/app/models/self/MTArea';
import { SysLocationModel } from 'src/app/models/system/policy/location';
import { interval, Subscription } from 'rxjs';
import { attcheckinModel } from 'src/app/models/attendance/attcheckin';
import { AttcheckinService } from 'src/app/services/attendance/attcheckin.service';
import { ATTReqdocumentModel } from 'src/app/models/attendance/attreqdocument';
import { PeriodsServices } from 'src/app/services/payroll/periods.service';
import { SearchEmpComponent } from 'src/app/components/usercontrol/search-emp/search-emp.component';
import { FillterEmpModel } from 'src/app/models/usercontrol/filteremp';
import { EmployeeModel } from 'src/app/models/employee/employee';
import { EmployeeService } from 'src/app/services/emp/worker.service';
import * as XLSX from 'xlsx';

declare var reqcheckin: any;
interface Status { name: string, code: number }
interface Area {
  lat: number,
  long: number,
  distance: number
}
interface Type {
  name: string,
  code: string
}
@Component({
  selector: 'app-request-checkin',
  templateUrl: './request-checkin.component.html',
  styleUrls: ['./request-checkin.component.scss']
})
export class RequestCheckinComponent implements OnInit {
  @ViewChild('fileUploader') fileUploader: ElementRef | any = null;
  @ViewChild(SearchEmpComponent) selectEmp: any;
   @ViewChild('TABLE') table: ElementRef | any = null;
  map: any;
  langs: any = reqcheckin;
  selectlang: string = "EN";
  locatiodis: string = "location_name_en"
  namedis: string = "worker_detail_en"
  position: string = "right";
  displayManage: boolean = false;
  edit_data: boolean = false;
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private attcheckinService: AttcheckinService,
    private locationService: LocationService,
    private areaService: AreaServices,
    private datePipe: DatePipe,
    private router: Router,
    private periodsService: PeriodsServices,
    private employeeService: EmployeeService,

  ) { }
  subscription: Subscription = new Subscription;
  mainMenuItems: MenuItem[] = [];
  homeIcon: any = { icon: 'pi pi-home', routerLink: '/' };
  fileToUpload: File | any = null;
  Uploadfile: boolean = false;
  markers: any = [];
  circledata: any = [L.circle([13.755402, 100.6130647], { radius: 1000, attribution: "00000" }), L.circle([13.734110815755576, 100.63175066697202], { radius: 2000, attribution: "11111" })];
  lat: number = 13.734110815755576;
  long: number = 100.53175066697202;
  zoom: number = 14;
  distance: number = 1000;
  items: MenuItem[] = [];
  items_attfile: MenuItem[] = [];
  location_list: SysLocationModel[] = [];
  locationselected: SysLocationModel = new SysLocationModel();
  type_list: Type[] = [{ name: this.langs.get('in')[this.selectlang], code: "I" }, { name: this.langs.get('out')[this.selectlang], code: "O" }];
  typeselected: Type = { name: this.langs.get('in')[this.selectlang], code: "I" };
  timecheckin_list: attcheckinModel[] = [];
  selectedtimecheckin: attcheckinModel = new attcheckinModel();
  selectedreqdoc: ATTReqdocumentModel = new ATTReqdocumentModel();

  start_date: Date = new Date();
  end_date: Date = new Date();

  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current.Token) {
      this.router.navigateByUrl('login');
    }
    this.start_date = new Date(`${this.initial_current.PR_Year}-01-01`);
    this.end_date = new Date(`${this.initial_current.PR_Year}-12-31`);
    this.selectlang = this.initial_current.Language;
    if (this.initial_current.Language == "TH") {
      this.locatiodis = "location_name_th"
      this.namedis = "worker_detail_th"
    }
    if (this.initial_current.Usertype == "GRP") {
    } else {
      this.doLoadTimecheckin();
    }
  }
  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadMenu();
    this.doLoadTimecheckin();
    this.doLoadLocation();
    this.doLoadArea();
    this.Periodclosed();

    setTimeout(() => {
      this.doLoadEmployee()
      this.doLoadTimecheckin()
    }, 300);
  }
  title_checkinout: { [key: string]: string } = { EN: "Check IN/OUT", TH: "การเช็คอิน / การเช็คเอาท์" };

  title_btn_select: { [key: string]: string } = { EN: "Select", TH: "เลือก" }
  title_btn_close: { [key: string]: string } = { EN: "Close", TH: "ปิด" }
  title_modified_by: { [key: string]: string } = { EN: "Edit by", TH: "ผู้ทำรายการ" }
  title_modified_date: { [key: string]: string } = { EN: "Edit date", TH: "วันที่ทำรายการ" }
  title_page_from: { [key: string]: string } = { EN: "Showing", TH: "แสดง" }
  title_page_to: { [key: string]: string } = { EN: "to", TH: "ถึง" }
  title_page_total: { [key: string]: string } = { EN: "of", TH: "จาก" }
  title_page_record: { [key: string]: string } = { EN: "entries", TH: "รายการ" }

  title_new: { [key: string]: string } = { EN: "New", TH: "เพิ่ม" }
  title_edit: { [key: string]: string } = { EN: "Edit", TH: "แก้ไข" }
  title_delete: { [key: string]: string } = { EN: "Delete", TH: "ลบ" }
  title_export: { [key: string]: string } = { EN: "Export", TH: "ส่งออกไฟล์" }
  title_save: { [key: string]: string } = { EN: "Save", TH: "บันทึก" }
  title_close: { [key: string]: string } = { EN: "Close", TH: "ปิด" }
  title_cancel: { [key: string]: string } = { EN: "Cancel", TH: "ยกเลิก" }
  title_search: { [key: string]: string } = { EN: "Search", TH: "ค้นหา" }
  title_confirm: { [key: string]: string } = { EN: "Are you sure?", TH: "ยืนยันการทำรายการ" }
  title_confirm_record: { [key: string]: string } = { EN: "Confirm to record", TH: "คุณต้องการบันทึกการทำรายการ" }
  title_confirm_delete: { [key: string]: string } = { EN: "Confirm to delete", TH: "คุณต้องการลบรายการ" }
  title_confirm_yes: { [key: string]: string } = { EN: "Yes", TH: "ใช่" }
  title_confirm_no: { [key: string]: string } = { EN: "No", TH: "ยกเลิก" }
  title_confirm_cancel: { [key: string]: string } = { EN: "You have cancelled", TH: "คุณยกเลิกการทำรายการ" }


  title_code: { [key: string]: string } = { EN: "Code", TH: "รหัส" }
  title_fromdate: { [key: string]: string } = { EN: "From", TH: "จากวันที่" }
  title_todate: { [key: string]: string } = { EN: "To", TH: "ถึงวันที่" }

  title_page: { [key: string]: string } = { EN: "Dic Request", TH: "ใบคำร้อง" }
  title_record_time: { [key: string]: string } = { EN: "Record time", TH: "บันทึกการลงเวลา" };
  title_date: { [key: string]: string } = { EN: "Date", TH: "วันที่" }
  title_ot_doc: { [key: string]: string } = { EN: "OT Doc", TH: "เลขที่เอกสาร" }
  title_no: { [key: string]: string } = { EN: "No.", TH: "ลำดับ" }
  title_Before: { [key: string]: string } = { EN: "Before", TH: "ก่อนเข้างาน " }
  title_Normal: { [key: string]: string } = { EN: "Normal", TH: "เวลาปกติ" }
  title_Break: { [key: string]: string } = { EN: "OBreak", TH: "เวลาพักเบรก" }
  title_After: { [key: string]: string } = { EN: "OAfter", TH: "หลังเลิกงาน" }
  title_Location: { [key: string]: string } = { EN: "Location", TH: "สถานที่ปฎิบัติงาน" }
  title_reason: { [key: string]: string } = { EN: "Reason", TH: "เหตุผลการทำล่วงเวลา" }
  title_detail: { [key: string]: string } = { EN: "Detail", TH: "รายละเอียด" }
  title_time_in: { [key: string]: string } = { EN: "Time in", TH: "เข้างาน" }
  title_time_out: { [key: string]: string } = { EN: "Time out", TH: "ออกงาน" }
  file_name: { [key: string]: string } = { EN: "File Name", TH: "ชื่อไฟล์" }

  confirm_upload: { [key: string]: string } = { EN: "Confirm Upload file", TH: "ยืนยันนำเข้าไฟล์" }
  confirm_delete: { [key: string]: string } = { EN: "Confirm delete", TH: "ยืนยันการลบรายการ" }
  confirm_deletefile: { [key: string]: string } = { EN: "Confirm Delete file", TH: "ยืนยันลบไฟล์" }
  confirm_delete_doc: { [key: string]: string } = { EN: "Confirm Delete Doc", TH: "ยืนยันลบเอกสาร" }
  confirm_doc: { [key: string]: string } = { EN: "Confirm record ChangeShift doc", TH: "ยืนยันบันทึกเอกสารเปลียนกะการทำงาน" }

  title_import: { [key: string]: string } = { EN: "import", TH: "นำเข้า" }


  //
  workerDetail: EmployeeModel = new EmployeeModel();
  worker_list: EmployeeModel[] = [];
  worker_index: number = 0;
  worker_code: string = "";
  worker_name: string = "";
  fillterIncludeResign: boolean = false;

  doLoadEmployee() {
    var fillter: FillterEmpModel = new FillterEmpModel;

    fillter.worker_resignstatus = this.fillterIncludeResign;
    if (this.fillterSearchemp) {
      fillter.searchemp = this.selectedSearchemp;
    } else {
      fillter.searchemp = "";
    }
    this.employeeService.worker_getbyfillter(fillter).then(async (res) => {
      this.worker_list = res;
      setTimeout(() => {

        this.worker_index = 0;
        this.doSetDetailWorker();

      }, 500);
    });
  }
  //-- Emp master
  selectedSearchemp: string = "";
  fillterSearchemp: boolean = false;
  doChangeSearchemp(event: any) {
    if (this.fillterSearchemp) {
      this.doLoadEmployee();
      this.doSetDetailWorker();
    }
  }

  doNextWorker() {
    if (this.worker_index < this.worker_list.length - 1) {
      this.worker_index++;
      this.doSetDetailWorker();

    }
  }

  doBackWorker() {
    if (this.worker_index > 0) {
      this.worker_index--;
      this.doSetDetailWorker();

    }
  }

  doSetDetailWorker() {
    this.workerDetail = this.worker_list[this.worker_index];
    this.worker_code = this.workerDetail.worker_code;
    if (this.initial_current.Language === 'EN') {
      this.worker_name =
        this.workerDetail.worker_fname_en + ' ' + this.workerDetail.worker_lname_en;
    } else {
      this.worker_name =
        this.workerDetail.worker_fname_th + ' ' + this.workerDetail.worker_lname_th;
    }
    this.doLoadTimecheckin();

  }

  close_searchemp() {
    this.searchEmp = false
  }

  searchEmp: boolean = false;
  open_searchemp() {
    this.searchEmp = true
  }
  // Search() {
  //   this.doLoadTimeot();
  // }
  select_emp() {

    let select = this.selectEmp.selectedEmployee.worker_code
    if (select != "") {
      this.doGetIndexWorker(select)
      this.searchEmp = false
    }

  }

  doGetIndexWorker(worker_code: string) {
    for (let i = 0; i < this.worker_list.length; i++) {
      if (this.worker_list[i].worker_code == worker_code) {
        this.worker_index = i;
        break;
      }
    }

    this.doSetDetailWorker();

  }
  //
  Search() {
    this.doLoadTimecheckin();
    this.doLoadArea();
  }

  doLoadTimecheckin() {
    this.timecheckin_list = [];
    var tmp = new attcheckinModel();
    tmp.timecheckin_workdate = this.start_date;
    tmp.timecheckin_todate = this.end_date;
    tmp.worker_code = this.workerDetail.worker_code;
    this.attcheckinService.attcheckin_get(tmp).then(async (res) => {
      res.forEach((elm: any) => {
        elm.timecheckin_workdate = new Date(elm.timecheckin_workdate)
      });
      this.timecheckin_list = await res
    });
  }
  doLoadLocation() {
    this.location_list = [];
    let data = new SysLocationModel()
    this.locationService.location_get(data).then(async (res) => {
      this.location_list = await res;
    });
  }
  doLoadArea() {
    this.circledata = [];
    let data = new MTAreaModel()
    data.worker_code = this.workerDetail.worker_code
    this.areaService.area_get(data).then(async (res) => {
      res.forEach((obj: MTAreaModel) => {
        if (obj.area_data.length) {
          this.circledata.push(L.circle([obj.area_lat, obj.area_long], { radius: obj.area_distance, attribution: obj.location_code }))
        }
      })
    });
  }
  async doRecordTimecheckin(data: attcheckinModel[]) {
    await this.attcheckinService.attcheckin_record(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadTimecheckin();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.closeManage()
  }
  async doDeleteTimecheckin(data: attcheckinModel) {
    await this.attcheckinService.attcheckin_delete(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadTimecheckin();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.closeManage()
  }
  async doGetfileTimecheckin(file_path: string, type: string) {
    this.attcheckinService.get_file(file_path).then((res) => {
      var url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: type }));
      window.open(url);
      this.selectedreqdoc = new ATTReqdocumentModel();
    })
  }
  doUploadFile() {
    const filename = "CHECKIN_DOC" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
    const filetype = this.fileToUpload.name.split(".")[1];
    this.attcheckinService.file_import(this.fileToUpload, filename, filetype).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.selectedtimecheckin.reqdoc_data = this.selectedtimecheckin.reqdoc_data.concat({
          company_code: this.selectedtimecheckin.company_code || this.initial_current.CompCode,
          document_id: 0,
          job_id: this.selectedtimecheckin.timecheckin_id.toString(),
          job_type: 'CI',
          document_name: filename + "." + filetype,
          document_type: this.fileToUpload.type,
          document_path: res.message,
          created_by: this.initial_current.Username,
          created_date: new Date().toISOString()
        })
        this.Uploadfile = false;
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }
      this.fileToUpload = null;
    });
  }
  doLoadMenu() {
    this.mainMenuItems = [{ label: this.title_page[this.initial_current.Language], routerLink: '/attendance/dicrequest' },
    { label: this.title_checkinout[this.initial_current.Language], routerLink: '/dicrequest/checkin-out', styleClass: 'activelike' }]
    this.items = [

 
      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.selectedtimecheckin = new attcheckinModel();
          this.locationselected = this.location_list[0]
          this.selectedtimecheckin.location_code = this.location_list[0].location_code
          if (this.initial_current.Usertype == "GRP") {


          }
          this.subscription = interval(1000).subscribe(val => { this.setMap(); });
          this.showManage()
        }
      },
      {
        label: this.title_export[this.initial_current.Language],
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
          this.exportAsExcel()
        }
      }


    ];
    this.items_attfile = [
      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.Uploadfile = true;
        }
      },
    ];

  }
  Uploadfiledoc() {
    if (this.fileToUpload) {
      this.confirmationService.confirm({
        message: this.langs.get('confirm_upload')[this.selectlang] + this.fileToUpload.name,
        header: this.langs.get('import')[this.selectlang],
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.Uploadfile = false;
          this.doUploadFile();
          this.fileUploader.nativeElement.value = null;
        },
        reject: () => {
          this.Uploadfile = false;
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'File', detail: "Please choose a file." });
    }
  }
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
  }
  DeleteFile(data: ATTReqdocumentModel) {
    this.confirmationService.confirm({
      message: this.langs.get('confirm_delete')[this.selectlang] + data.document_name,
      header: this.langs.get('delete')[this.selectlang],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (data.document_id) {
          this.attcheckinService.delete_file(data).then((res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            }
          })
        } else {
          this.selectedtimecheckin.reqdoc_data = this.selectedtimecheckin.reqdoc_data.filter((item) => {
            return item !== data;
          });
        }
        this.attcheckinService.deletefilepath_file(data.document_path).then((res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.selectedtimecheckin.reqdoc_data = this.selectedtimecheckin.reqdoc_data.filter((item) => {
              return item !== data;
            });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
          }
        })
      },
      reject: () => {

      }
    });
  }
  calcCrow(lat1: number, lon1: number, lat2: number, lon2: number) {
    var R = 6371; // km
    var dLat = this.toRad(lat2 - lat1);
    var dLon = this.toRad(lon2 - lon1);
    var lat1 = this.toRad(lat1);
    var lat2 = this.toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d * 1000;
  }
  // Converts numeric degrees to radians
  toRad(Value: number) {
    return Value * Math.PI / 180;
  }
  async getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        if (!this.edit_data) {
          this.lat = latitude;
          this.long = longitude;
        }
      });
    } else {
    }
  }
  async setMap() {
    await this.getLocation();
    await new Promise(resolve => setTimeout(resolve, 400));
    if (this.map == undefined) {
      try {
        this.map.removeLayer(this.markers[0]);
        this.markers.pop()
      } catch {

      }
      this.map = L.map("map").setView([this.lat, this.long], this.zoom);
      L.tileLayer("https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      }).addTo(this.map);
    } else {
      try {
        this.map.removeLayer(this.markers[0]);
        this.markers.pop()
      } catch {

      }
      this.map.setView([this.lat, this.long], this.zoom);
    }
    this.map.on('zoomend', async (e: any) => {
      this.zoom = e.target._zoom;
    });
    try {

    } catch {

    }
    var marker = new L.Marker([this.lat, this.long], {
      icon: L.icon({
        iconUrl: '../../../../assets/images/pngwing.png',
        iconSize: [20, 20],
      })
    });
    this.markers.push(marker)
    this.markers[0].addTo(this.map);
    this.circledata.forEach((element: any) => {
      element.addTo(this.map);
    });
  }
  async Save() {
    this.confirmationService.confirm({
      message: this.langs.get('confirm_doc')[this.selectlang],
      header: this.langs.get('title_checkin')[this.selectlang],
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        if (this.initial_current.Usertype == "GRP" && !this.edit_data) {
          this.selectedtimecheckin.timecheckin_time = this.datePipe.transform(new Date(), 'HH:mm') || "00:00"
          this.selectedtimecheckin.timecheckin_lat = this.lat;
          this.selectedtimecheckin.timecheckin_long = this.long;
          let data_doc: attcheckinModel[] = []
          var tmp: attcheckinModel = new attcheckinModel();
          tmp.timecheckin_id = this.selectedtimecheckin.timecheckin_id;
          tmp.timecheckin_doc = "CHECKIN_" + (Number(this.datePipe.transform(new Date(), 'yyyyMMddHHmmss')));
          tmp.timecheckin_workdate = this.selectedtimecheckin.timecheckin_workdate;
          tmp.timecheckin_todate = this.selectedtimecheckin.timecheckin_todate;
          tmp.timecheckin_lat = this.selectedtimecheckin.timecheckin_lat;
          tmp.timecheckin_time = this.selectedtimecheckin.timecheckin_time;
          tmp.timecheckin_long = this.selectedtimecheckin.timecheckin_long;
          tmp.location_code = this.selectedtimecheckin.location_code;
          tmp.timecheckin_type = this.selectedtimecheckin.timecheckin_type;
          tmp.timecheckin_note = this.selectedtimecheckin.timecheckin_note;
          tmp.reqdoc_data = this.selectedtimecheckin.reqdoc_data;
          tmp.worker_code = this.workerDetail.worker_code;
          data_doc.push(tmp)

          let checkdistance = false;
          await this.circledata.forEach((element: any) => {
            if (this.calcCrow(this.lat, this.long, element._latlng.lat, element._latlng.lng) < element.options.radius) {
              checkdistance = true;
              this.selectedtimecheckin.location_code = element.options.attribution;
              return
            }
          });
          if (!checkdistance) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: this.langs == "EN" ? 'Not in the designated area' : 'ไม่อยู่ในพื้นที่ที่กำหนด' });
            this.closeManage()

          } else {
            this.doRecordTimecheckin(data_doc)
          }
        } else {
          if (this.selectedtimecheckin.timecheckin_doc === "") {
            this.selectedtimecheckin.timecheckin_doc = "CHECKIN_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
            this.selectedtimecheckin.timecheckin_time = this.datePipe.transform(new Date(), 'HH:mm') || "00:00"
            this.selectedtimecheckin.timecheckin_lat = this.lat;
            this.selectedtimecheckin.timecheckin_long = this.long;

            

          }
          let checkdistance = false;
          await this.circledata.forEach((element: any) => {
            if (this.calcCrow(this.lat, this.long, element._latlng.lat, element._latlng.lng) < element.options.radius) {
              checkdistance = true;
              this.selectedtimecheckin.location_code = element.options.attribution;
              return
            }
          });
          if (!checkdistance) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: this.langs == "EN" ? 'Not in the designated area' : 'ไม่อยู่ในพื้นที่ที่กำหนด' });
            this.closeManage()

          } else {
            this.selectedtimecheckin.timecheckin_doc = "CHECKIN_" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
            this.selectedtimecheckin.timecheckin_time = this.datePipe.transform(new Date(), 'HH:mm') || "00:00"
            this.selectedtimecheckin.timecheckin_lat = this.lat;
            this.selectedtimecheckin.timecheckin_long = this.long;

            let data_doc2: attcheckinModel[] = []
            var data: attcheckinModel = new attcheckinModel();
            data.timecheckin_id = this.selectedtimecheckin.timecheckin_id;
            data.timecheckin_doc = "CHECKIN_" + (Number(this.datePipe.transform(new Date(), 'yyyyMMddHHmmss')));
            data.timecheckin_workdate = this.selectedtimecheckin.timecheckin_workdate;
            data.timecheckin_todate = this.selectedtimecheckin.timecheckin_todate;
            data.timecheckin_lat = this.selectedtimecheckin.timecheckin_lat;
            data.timecheckin_time = this.selectedtimecheckin.timecheckin_time;
            data.timecheckin_long = this.selectedtimecheckin.timecheckin_long;
            data.location_code = this.selectedtimecheckin.location_code;
            data.timecheckin_type = this.selectedtimecheckin.timecheckin_type;
            data.timecheckin_note = this.selectedtimecheckin.timecheckin_note;
            data.reqdoc_data = this.selectedtimecheckin.reqdoc_data;
            data.worker_code = this.workerDetail.worker_code;
            data_doc2.push(data)
            this.doRecordTimecheckin(data_doc2)
          }
        }
      },
      reject: () => {
      }
    });

  }
  Delete() {
    this.confirmationService.confirm({
      message: this.langs.get('confirm_delete_doc')[this.selectlang] + this.selectedtimecheckin.timecheckin_doc,
      header: this.langs.get('title_checkin')[this.selectlang],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doDeleteTimecheckin(this.selectedtimecheckin)
      },
      reject: () => {
      }
    });
  }
  showManage() {
    this.typeselected = this.type_list[0];
    this.selectedtimecheckin.timecheckin_type = this.type_list[0].code;
    this.displayManage = true
    this.edit_data = false;
    this.setMap();
  }

  closeManage() {
    this.selectedtimecheckin = new attcheckinModel();
    this.displayManage = false
    this.subscription.unsubscribe();
  }
  selectlocation() {
    this.selectedtimecheckin.location_code = this.locationselected.location_code;
  }
  selecttype() {
    this.selectedtimecheckin.timecheckin_type = this.typeselected.code;
  }
  onRowSelectfile(event: Event) {
    this.doGetfileTimecheckin(this.selectedreqdoc.document_path, this.selectedreqdoc.document_type)
  }
  onRowSelect(event: Event) {
    this.subscription.unsubscribe();
    this.location_list.forEach((obj: SysLocationModel) => {
      if (obj.location_code == this.selectedtimecheckin.location_code) {
        this.locationselected = obj;
      }
    })
    this.type_list.forEach((obj: Type) => {
      if (obj.code == this.selectedtimecheckin.timecheckin_type) {
        this.typeselected = obj;
      }
    })
    this.lat = this.selectedtimecheckin.timecheckin_lat;
    this.long = this.selectedtimecheckin.timecheckin_long;
    this.edit_data = true;
    this.displayManage = true
    this.setMap();
  }
  getFulltype(code: string) {
    let type = ""
    switch (code) {
      case "I":
        type = this.langs.get('in')[this.selectlang];
        break;
      case "O":
        type = this.langs.get('out')[this.selectlang];
    }
    return type;
  }


  //เช็คชข้อมูลเมื่อมีการปิดงวด
  hasTruePeriodCloseta: boolean = false;
  async Periodclosed() {
    try {
      const res = await this.periodsService.period_get2(this.initial_current.CompCode, "PAY", this.initial_current.EmpType, this.initial_current.PR_Year, this.initial_current.TA_FromDate, this.initial_current.TA_ToDate);
      if (res && res.length > 0) {
        for (const element of res) {
          element.period_from = new Date(element.period_from);
          element.period_to = new Date(element.period_to);
          element.period_payment = new Date(element.period_payment);
        }
        this.hasTruePeriodCloseta = res.some((item: { period_closepr: boolean }) => item.period_closepr === true);
        if (this.hasTruePeriodCloseta) {
          this.confirmationService.confirm({
            message: this.initial_current.Language === 'TH' ? 'ข้อมูลที่ทำรายการอยู่ในงวดที่ปิดแล้ว' : 'Period is closed permission set to read-only !!!',
            header: this.initial_current.Language === 'TH' ? 'คำเตือน' : 'Warning',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
            },
            rejectVisible: false,
          });
        }
      }
    } catch { }
  }
  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Export_Checkin/out.xlsx');

  }
}


