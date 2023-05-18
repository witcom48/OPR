import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as L from "leaflet";
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { ProjectModel } from 'src/app/models/project/project';
import { MTAreaModel } from 'src/app/models/self/MTArea'
import { LocationModel } from 'src/app/models/system/policy/location';
import { ProjectService } from 'src/app/services/project/project.service';
import { LocationService } from 'src/app/services/system/policy/location.service';
import { EmployeeModel } from 'src/app/models/employee/employee';
import { EmployeeService } from 'src/app/services/emp/worker.service';
import { AreaServices } from 'src/app/services/self/area.service';
import { TRAreaModel } from 'src/app/models/self/TRArea';
declare var area: any;
interface Type {
  name: string,
  code: string
}
@Component({
  selector: 'app-self-area',
  templateUrl: './self-area.component.html',
  styleUrls: ['./self-area.component.scss']
})
export class SelfAreaComponent implements OnInit {
  langs: any = area;
  selectlang: string = "EN";
  constructor(private projectService: ProjectService,
    private locationService: LocationService,
    private empService: EmployeeService,
    private router: Router,
    private areaService: AreaServices,
    private messageService: MessageService,
  ) { }
  items_menu: MenuItem[] = [];
  locationList: Type[] = [];
  selectedlocation: any;
  projectList: Type[] = [];
  selectedproject: any;
  new_data: boolean = false
  edit_data: boolean = false
  displayUpload: boolean = false;
  area_list: MTAreaModel[] = [];
  markers: any = [];
  circledata: any = [];
  lat: number = 13.734110815755576;
  long: number = 100.53175066697202;
  zoom: number = 14;
  distance: number = 1000;
  areas: MTAreaModel = new MTAreaModel()
  emp_list: EmployeeModel[] = [];
  emp_list_source: EmployeeModel[] = [];
  emp_list_dest: EmployeeModel[] = [];
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current.Token) {
      this.router.navigateByUrl('');
    }
    this.selectlang = this.initial_current.Language;
  }
  map: any;
  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadMenu();
    this.doLoadEmployee();
    this.doLoadLocation();
    this.doLoadProject();
    this.doLoadArea();
  }

  doLoadEmployee() {
    this.emp_list = [];
    this.empService.worker_get(this.initial_current.CompCode, "").then(async (res) => {
      this.emp_list = await res;
    });
  }
  doLoadArea() {
    this.area_list = [];
    var tmp = new MTAreaModel()
    this.areaService.area_get(tmp).then(async (res) => {
      this.area_list = await res;
    });
  }
  doLoadLocation() {
    this.locationList = [];
    var tmp = new LocationModel();
    this.locationService.location_get(tmp).then(async (res) => {
      await res.forEach((element: LocationModel) => {
        this.locationList.push({ code: element.location_code, name: this.selectlang == "EN" ? element.location_name_en : element.location_name_th })
      });
    });
  }
  doLoadProject() {
    this.projectList = [];
    this.projectService.project_get(this.initial_current.CompCode, "").then(async (res) => {
      await res.forEach((element: ProjectModel) => {
        this.projectList.push({ code: element.project_code, name: this.selectlang == "EN" ? element.project_name_en : element.project_name_th })
      });
    });
  }
  async doRecordArea(data: MTAreaModel) {
    await this.areaService.area_record(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadArea()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
  }

  async doDeleteArea(data: MTAreaModel) {
    await this.areaService.area_delete(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadArea()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
  }

  getLocatonname(codes: string) {
    return this.locationList.find(({ code }) => code === codes)?.name
  }
  getProjectname(codes: string) {
    return this.projectList.find(({ code }) => code === codes)?.name
  }
  doLoadMenu() {
    this.items_menu = [
      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.emp_list_source = []
          this.emp_list_dest = []
          this.areas = new MTAreaModel();
          this.selectedlocation = this.locationList[0]
          this.selectedproject = this.projectList[0]
          this.lat = 13.734110815755576;
          this.long = 100.53175066697202;
          this.areas.area_lat = 13.734110815755576;
          this.areas.area_long = 100.53175066697202;
          this.areas.area_distance = 1000;
          this.areas.location_code = this.locationList[0].code;
          this.areas.project_code = this.projectList[0].code;
          this.distance = 1000;
          this.zoom = 14;
          this.emp_list.filter((elm: EmployeeModel) => {
            this.emp_list_source.push(elm)
          })
          try {
            this.map.removeLayer(this.markers[0]);
            this.markers.pop();
          } catch {

          }
          this.new_data = true;
          this.edit_data = false;
        }
      }
      ,
      {
        label: this.langs.get('import')[this.selectlang],
        icon: 'pi pi-fw pi-file-import',
        command: (event) => {

        }
      }
      ,
      {
        label: this.langs.get('export')[this.selectlang],
        icon: 'pi pi-fw pi-file-export',
        command: (event) => {
        }
      }
    ];
  }
  async setMap() {
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
      var marker = new L.Marker([this.lat, this.long], {
        icon: L.icon({
          iconUrl: '../../../../assets/images/placeholder.png',
          iconSize: [30, 30]
        })
      });
      this.markers.push(marker)
      this.markers[0].addTo(this.map);
    } else {
      try {
        this.map.removeLayer(this.markers[0]);
        this.markers.pop()
      } catch {

      }
      this.map.setView([this.lat, this.long], this.zoom);
      var marker = new L.Marker([this.lat, this.long], {
        icon: L.icon({
          iconUrl: '../../../../assets/images/placeholder.png',
          iconSize: [30, 30]
        })
      });
      this.markers.push(marker)
      this.markers[0].addTo(this.map);
    }
    this.map.on("click", async (e: any) => {
      this.map.removeLayer(this.markers[0]);
      this.markers.pop()
      var marker = new L.Marker([e.latlng.lat, e.latlng.lng], {
        icon: L.icon({
          iconUrl: '../../../../assets/images/placeholder.png',
          iconSize: [30, 30]
        })
      });
      this.markers.push(marker)
      this.markers[0].addTo(this.map);
      this.map.setView([e.latlng.lat, e.latlng.lng], this.zoom);
      this.lat = e.latlng.lat;
      this.long = e.latlng.lng;
      this.areas.area_lat = await e.latlng.lat;
      this.areas.area_long = await e.latlng.lng;
      try {
        this.map.removeLayer(this.circledata[0]);
        this.circledata.pop()
      } catch {

      }
      var circles = L.circle([e.latlng.lat, e.latlng.lng], { radius: this.distance });
      this.circledata.push(circles)
      this.circledata[0].addTo(this.map);
    });
    this.map.on('zoomend', async (e: any) => {
      this.zoom = e.target._zoom;
    });
    try {
      this.map.removeLayer(this.circledata[0]);
      this.circledata.pop()
    } catch {

    }
    var circles = L.circle([this.lat, this.long], { radius: this.distance });
    this.circledata.push(circles)
    this.circledata[0].addTo(this.map);
  }
  changedistance() {
    this.distance = this.areas.area_distance;
    try {
      this.map.removeLayer(this.circledata[0]);
      this.circledata.pop()
    } catch {

    }
    var circles = L.circle([this.lat, this.long], { radius: this.areas.area_distance });
    this.circledata.push(circles)
    this.circledata[0].addTo(this.map);
  }
  selectlocation() {
    this.areas.location_code = this.selectedlocation.code;
  }
  selectproject() {
    this.areas.project_code = this.selectedproject.code;
  }
  onRowSelect(event: any) {
    this.emp_list_source = []
    this.emp_list_dest = []
    this.selectedlocation = this.locationList.find(({ code }) => code === this.areas.location_code);
    this.selectedproject = this.projectList.find(({ code }) => code === this.areas.project_code);
    this.lat = this.areas.area_lat;
    this.long = this.areas.area_long;
    this.distance = this.areas.area_distance
    this.zoom = 14;
    try {
      this.map.removeLayer(this.markers[0]);
      this.markers.pop();
    } catch {

    }
    this.areas.area_data.filter((obj: TRAreaModel) => {
      this.emp_list.filter((elm: EmployeeModel) => {
        if (obj.worker_code === elm.worker_code) {
          this.emp_list_dest.push(elm)
        }
      })
    })
    this.emp_list.filter((elm: EmployeeModel) => {
      if (!this.emp_list_dest.includes(elm)) {
        this.emp_list_source.push(elm)
      }
    })
    this.new_data = true
    this.edit_data = true;
  }
  async openmap() {
    this.displayUpload = true;
    await new Promise(resolve => setTimeout(resolve, 400));
    this.distance = this.areas.area_distance;
    this.lat = this.areas.area_lat;
    this.long = this.areas.area_long;
    this.setMap();
  }
  close() {
    this.new_data = false
    this.areas = new MTAreaModel()
  }
  Save() {
    // this.doRecordYear(this.yearperiods)
    this.areas.area_data = [];
    this.emp_list_dest.forEach((obj: EmployeeModel) => {
      this.areas.area_data.push({
        company_code: this.initial_current.CompCode,
        location_code: this.selectedlocation.code,
        worker_code: obj.worker_code

      })
    })
    // console.log(this.areas)
    this.doRecordArea(this.areas)
  }
  Delete() {
    this.doDeleteArea(this.areas)
  }

}
