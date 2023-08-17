import { DatePipe } from '@angular/common';
import * as L from "leaflet";
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { cls_MTReqdocumentModel } from 'src/app/models/self/cls_MTReqdocument';
import { cls_TRTimecheckinModel } from 'src/app/models/self/cls_TRTimecheckin';
 import { TimecheckinServices } from 'src/app/services/self/timecheckin.service';
import { LocationService } from 'src/app/services/system/policy/location.service';
import { AreaServices } from 'src/app/services/self/area.service';
import { MTAreaModel } from 'src/app/models/self/MTArea';
import { TRAccountModel } from 'src/app/models/self/traccount';
import { AccountModel } from 'src/app/models/self/account';
import { AccountServices } from 'src/app/services/self/account.service';
import { SysLocationModel } from 'src/app/models/system/policy/location';
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
  selector: 'app-self-checkin',
  templateUrl: './self-checkin.component.html',
  styleUrls: ['./self-checkin.component.scss']
})
export class SelfCheckinComponent implements OnInit {
  @ViewChild('fileUploader') fileUploader: ElementRef | any = null;
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
    private timecheckinService: TimecheckinServices,
    private locationService: LocationService,
    private areaService: AreaServices,
    private datePipe: DatePipe,
    private accountServie: AccountServices,
    private router: Router,
  ) { }
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
  timecheckin_list: cls_TRTimecheckinModel[] = [];
  selectedtimecheckin: cls_TRTimecheckinModel = new cls_TRTimecheckinModel();
  selectedreqdoc: cls_MTReqdocumentModel = new cls_MTReqdocumentModel();
  account_list: TRAccountModel[] = [];
  account_list_source: TRAccountModel[] = [];
  account_list_dest: TRAccountModel[] = [];
  selectedAccount: TRAccountModel = new TRAccountModel();
  start_date: Date = new Date();
  end_date: Date = new Date();
  status_list: Status[] = [{ name: this.langs.get('wait')[this.selectlang], code: 0 }, { name: this.langs.get('finish')[this.selectlang], code: 3 }, { name: this.langs.get('reject')[this.selectlang], code: 4 }];
  status_select: Status = { name: this.langs.get('wait')[this.selectlang], code: 0 }
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
      this.doLoadAccount();
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
    // setInterval(this.getLocation, 1000);
  }
  Search() {
    this.doLoadTimecheckin();
    this.doLoadArea();
  }
  doLoadAccount() {
    var tmp = new AccountModel();
    tmp.account_user = this.initial_current.Username;
    tmp.account_type = this.initial_current.Usertype;
    this.accountServie.account_get(tmp).then(async (res) => {
      res[0].worker_data.forEach((obj: TRAccountModel) => {
        obj.worker_detail_en = obj.worker_code + " : " + obj.worker_detail_en;
        obj.worker_detail_th = obj.worker_code + " : " + obj.worker_detail_th;
      });
      this.account_list = await res[0].worker_data;
      this.selectedAccount = res[0].worker_data[0];
      this.doLoadTimecheckin();
      this.doLoadArea();
    });
  }
  doLoadTimecheckin() {
    this.timecheckin_list = [];
    var tmp = new cls_TRTimecheckinModel();
    tmp.timecheckin_workdate = this.start_date;
    tmp.timecheckin_todate = this.end_date;
    tmp.status = this.status_select.code;
    tmp.worker_code = this.selectedAccount.worker_code;
    this.timecheckinService.timecheckin_get(tmp).then(async (res) => {
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
  // circledata: any = [L.circle([13.755402, 100.6130647], { radius: 1000, attribution: "00000" }), L.circle([13.734110815755576, 100.63175066697202], { radius: 2000, attribution: "11111" })];
  doLoadArea() {
    this.circledata = [];
    let data = new MTAreaModel()
    data.worker_code = this.selectedAccount.worker_code
    this.areaService.area_get(data).then(async (res) => {
      res.forEach((obj: MTAreaModel) => {
        if (obj.area_data.length) {
          this.circledata.push(L.circle([obj.area_lat, obj.area_long], { radius: obj.area_distance, attribution: obj.location_code }))
        }
      })
      // this.location_list = await res;
    });
  }
  async doRecordTimecheckin(data: cls_TRTimecheckinModel[]) {
    await this.timecheckinService.timecheckin_record(data).then((res) => {
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
  async doDeleteTimecheckin(data: cls_TRTimecheckinModel) {
    await this.timecheckinService.timecheckin_delete(data).then((res) => {
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
    this.timecheckinService.get_file(file_path).then((res) => {
      var url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: type }));
      window.open(url);
      this.selectedreqdoc = new cls_MTReqdocumentModel();
    })
  }
  doUploadFile() {
    const filename = "CHECKIN_DOC" + this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
    const filetype = this.fileToUpload.name.split(".")[1];
    this.timecheckinService.file_import(this.fileToUpload, filename, filetype).then((res) => {
      // console.log(res)
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
    this.items = [
      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.account_list_source = [];
          this.account_list_dest = [];
          this.selectedtimecheckin = new cls_TRTimecheckinModel();
          this.locationselected = this.location_list[0]
          this.selectedtimecheckin.location_code = this.location_list[0].location_code
          if (this.initial_current.Usertype == "GRP") {
            this.account_list.forEach((obj: TRAccountModel) => {
              this.account_list_source.push(obj)
            })
          }
          this.showManage()
        }
      },
      {
        label: this.langs.get('import')[this.selectlang],
        icon: 'pi pi-fw pi-file-import',
      }
      ,
      {
        label: this.langs.get('export')[this.selectlang],
        icon: 'pi pi-fw pi-file-export',
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
  DeleteFile(data: cls_MTReqdocumentModel) {
    this.confirmationService.confirm({
      message: this.langs.get('confirm_delete')[this.selectlang] + data.document_name,
      header: this.langs.get('delete')[this.selectlang],
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (data.document_id) {
          this.timecheckinService.delete_file(data).then((res) => {
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
        this.timecheckinService.deletefilepath_file(data.document_path).then((res) => {
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
  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        if (!this.edit_data) {
          this.lat = latitude;
          this.long = longitude;
        }
        // this.callApi(longitude, latitude);
      });
    } else {
      // console.log("No support for geolocation")
    }
  }
  async setMap() {
    this.getLocation();
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
          let data_doc: cls_TRTimecheckinModel[] = []
          this.account_list_dest.forEach((obj: TRAccountModel, index) => {
            var tmp: cls_TRTimecheckinModel = new cls_TRTimecheckinModel();
            tmp.timecheckin_id = this.selectedtimecheckin.timecheckin_id;
            tmp.timecheckin_doc = "CHECKIN_" + (Number(this.datePipe.transform(new Date(), 'yyyyMMddHHmmss')) + index);
            tmp.timecheckin_workdate = this.selectedtimecheckin.timecheckin_workdate;
            tmp.timecheckin_todate = this.selectedtimecheckin.timecheckin_todate;
            tmp.timecheckin_lat = this.selectedtimecheckin.timecheckin_lat;
            tmp.timecheckin_time = this.selectedtimecheckin.timecheckin_time;
            tmp.timecheckin_long = this.selectedtimecheckin.timecheckin_long;
            tmp.location_code = this.selectedtimecheckin.location_code;
            tmp.timecheckin_type = this.selectedtimecheckin.timecheckin_type;
            tmp.timecheckin_note = this.selectedtimecheckin.timecheckin_note;
            tmp.reqdoc_data = this.selectedtimecheckin.reqdoc_data;
            tmp.worker_code = obj.worker_code;
            data_doc.push(tmp)
          })
          let checkdistance = false;
          await this.circledata.forEach((element: any) => {
            if (this.calcCrow(this.lat, this.long, element._latlng.lat, element._latlng.lng) < element.options.radius) {
              checkdistance = true;
              this.selectedtimecheckin.location_code = element.options.attribution;
              return
            }
          });
          if (!checkdistance) {
            this.confirmationService.confirm({
              message: this.langs.get('confirm_doc')[this.selectlang],
              header: this.langs.get('title_checkin')[this.selectlang],
              icon: 'pi pi-exclamation-triangle',
              accept: () => {
                // // console.log(this.selectedtimecheckin)
              },
              reject: () => {

              }
            });
          } else {
            // // console.log(this.selectedtimecheckin)
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
            this.confirmationService.confirm({
              message: this.langs.get('confirm_delete_doc')[this.selectlang],
              header: this.langs.get('title_checkin')[this.selectlang],
              icon: 'pi pi-exclamation-triangle',
              accept: () => {
                // // console.log(this.selectedtimecheckin)
              },
              reject: () => {

              }
            });
          } else {
            // // console.log(this.selectedtimecheckin)
            this.doRecordTimecheckin([this.selectedtimecheckin])
          }
        }
      },
      reject: () => {
      }
    });
    // // console.log(this.selectedtrtimeonsite)
    // this.doRecordTimecheckin([this.selectedtimecheckin])
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
    this.selectedtimecheckin = new cls_TRTimecheckinModel();
    this.displayManage = false

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

  getFullStatus(code: string) {
    let status = ""
    switch (code) {
      case "W":
        status = this.langs.get('wait')[this.selectlang];
        break;
      case "F":
        status = this.langs.get('finish')[this.selectlang];
        break;
      case "C":
        status = this.langs.get('reject')[this.selectlang];
    }
    return status;
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

}
