import { DatePipe } from '@angular/common';
import * as L from "leaflet";
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { cls_MTReqdocumentModel } from 'src/app/models/self/cls_MTReqdocument';
import { cls_TRTimecheckinModel } from 'src/app/models/self/cls_TRTimecheckin';
import { LocationModel } from 'src/app/models/system/policy/location';
import { TimecheckinServices } from 'src/app/services/self/timecheckin.service';
import { LocationService } from 'src/app/services/system/policy/location.service';
import { AreaServices } from 'src/app/services/self/area.service';
import { MTAreaModel } from 'src/app/models/self/MTArea';
import { ApproveModel } from 'src/app/models/self/approve';
import { ApproveServices } from 'src/app/services/self/approve.service';
declare var reqcheckin: any;
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
  selector: 'app-self-approve-checkin',
  templateUrl: './self-approve-checkin.component.html',
  styleUrls: ['./self-approve-checkin.component.scss']
})
export class SelfApproveCheckinComponent implements OnInit {
  @ViewChild('fileUploader') fileUploader: ElementRef | any = null;
  map: any;
  langs: any = reqcheckin;
  selectlang: string = "EN";
  locatiodis: string = "location_name_en"
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
    private router: Router,
    private approveService: ApproveServices,
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
  location_list: LocationModel[] = [];
  locationselected: LocationModel = new LocationModel();
  type_list: Type[] = [{ name: this.langs.get('in')[this.selectlang], code: "I" }, { name: this.langs.get('out')[this.selectlang], code: "O" }];
  typeselected: Type = { name: this.langs.get('in')[this.selectlang], code: "I" };
  timecheckin_list: cls_TRTimecheckinModel[] = [];
  selectedtimecheckin: cls_TRTimecheckinModel = new cls_TRTimecheckinModel();
  selectedtimecheckinall: cls_TRTimecheckinModel[] = []
  selectedreqdoc: cls_MTReqdocumentModel = new cls_MTReqdocumentModel();
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current.Token) {
      this.router.navigateByUrl('');
    }
    this.selectlang = this.initial_current.Language;
    if (this.initial_current.Language == "TH") {
      this.locatiodis = "location_name_th"

    }
  }
  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadMenu();
    this.doLoadTimecheckin();
    this.doLoadLocation();
    // setInterval(this.getLocation, 1000);
  }
  doLoadTimecheckin() {
    this.timecheckin_list = [];
    var tmp = new ApproveModel();
    tmp.job_type = "CI"
    this.approveService.approve_get(tmp).then(async (res) => {
      res.forEach((elm: any) => {
        elm.timecheckin_workdate = new Date(elm.timecheckin_workdate)
      });
      this.timecheckin_list = await res
    });
  }
  doLoadLocation() {
    this.location_list = [];
    let data = new LocationModel()
    this.locationService.location_get(data).then(async (res) => {
      this.location_list = await res;
    });
  }
  // circledata: any = [L.circle([13.755402, 100.6130647], { radius: 1000, attribution: "00000" }), L.circle([13.734110815755576, 100.63175066697202], { radius: 2000, attribution: "11111" })];
  doLoadArea(worker_code: string) {
    this.circledata = [];
    let data = new MTAreaModel()
    data.worker_code = worker_code;
    this.areaService.area_get(data).then(async (res) => {
      res.forEach((obj: MTAreaModel) => {
        if (obj.area_data.length) {
          this.circledata.push(L.circle([obj.area_lat, obj.area_long], { radius: obj.area_distance, attribution: obj.location_code }))
        }
      })
      this.edit_data = true;
      this.displayManage = true
      this.setMap();
      // this.location_list = await res;
    });
  }
  async doGetfileTimecheckin(file_path: string, type: string) {
    this.timecheckinService.get_file(file_path).then((res) => {
      var url = window.URL.createObjectURL(new Blob([new Uint8Array(res)], { type: type }));
      window.open(url);
      this.selectedreqdoc = new cls_MTReqdocumentModel();
    })
  }
  async doApproveJob(data: ApproveModel) {
    data.job_type = "CI";
    data.lang = this.selectlang;
    await this.approveService.approveJob(data).then((res) => {
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
  doLoadMenu() {
    this.items = [
      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.selectedtimecheckin = new cls_TRTimecheckinModel();
          this.locationselected = this.location_list[0]
          this.selectedtimecheckin.location_code = this.location_list[0].location_code
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
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
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
      console.log("No support for geolocation")
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
      this.map.eachLayer((layer: { toGeoJSON: any; }) => {
        if (!!layer.toGeoJSON) {
          this.map.removeLayer(layer);
        }
      });
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
  Save(data: cls_TRTimecheckinModel) {
    if (!this.selectedtimecheckinall.length) {
      this.confirmationService.confirm({
        message: this.langs.get('conapprove')[this.selectlang],
        header: this.langs.get('condoc')[this.selectlang],
        icon: 'pi pi-check',
        accept: () => {
          let tmp = new ApproveModel();
          tmp.job_id = [data.jobtable_id];
          tmp.approve_status = "A";
          tmp.company_code = data.company_code;
          this.doApproveJob(tmp)
        },
        reject: () => {

        }
      });
    }

  }
  Delete(data: cls_TRTimecheckinModel) {
    if (!this.selectedtimecheckinall.length) {
      this.confirmationService.confirm({
        message: this.langs.get('connotapprove')[this.selectlang],
        header: this.langs.get('connotdoc')[this.selectlang],
        icon: 'pi pi-times',
        accept: () => {
          let tmp = new ApproveModel();
          tmp.job_id = [data.jobtable_id];
          tmp.approve_status = "C";
          tmp.company_code = data.company_code;
          this.doApproveJob(tmp)
        },
        reject: () => {

        }
      });
    }
  }
  Saveall() {
    if (this.selectedtimecheckinall.length) {
      this.confirmationService.confirm({
        message: this.langs.get('conapprove')[this.selectlang],
        header: this.langs.get('condoc')[this.selectlang],
        icon: 'pi pi-check',
        accept: () => {
          let tmp = new ApproveModel();
          this.selectedtimecheckinall.forEach((data: cls_TRTimecheckinModel) => {
            tmp.job_id.push(data.jobtable_id)
            tmp.approve_status = "A";
            tmp.company_code = data.company_code;
          })
          console.log(tmp)
          this.doApproveJob(tmp)
        },
        reject: () => {

        }
      });
    }
  }
  Deleteall() {
    if (this.selectedtimecheckinall.length) {
      this.confirmationService.confirm({
        message: this.langs.get('connotapprove')[this.selectlang],
        header: this.langs.get('connotdoc')[this.selectlang],
        icon: 'pi pi-times',
        accept: () => {
          let tmp = new ApproveModel();
          this.selectedtimecheckinall.forEach((data: cls_TRTimecheckinModel) => {
            tmp.job_id.push(data.jobtable_id)
            tmp.approve_status = "C";
            tmp.company_code = data.company_code;
          })
          console.log(tmp)
          this.doApproveJob(tmp)
        },
        reject: () => {

        }
      });
    }
  }
  viwe(data: cls_TRTimecheckinModel) {
    this.selectedtimecheckin = data
    this.doLoadArea(data.worker_code);
    this.location_list.forEach((obj: LocationModel) => {
      if (obj.location_code == data.location_code) {
        this.locationselected = obj;
      }
    })
    this.type_list.forEach((obj: Type) => {
      if (obj.code == data.timecheckin_type) {
        this.typeselected = obj;
      }
    })
    this.lat = data.timecheckin_lat;
    this.long = data.timecheckin_long;
    // this.edit_data = true;
    // this.displayManage = true
    // this.setMap();
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
