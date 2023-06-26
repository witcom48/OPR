import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';

import { EmployeeModel } from '../../../models/employee/employee';
import { EmployeeService } from 'src/app/services/emp/worker.service';
import { PartModel } from 'src/app/models/employee/policy/part';
import { LevelModel } from 'src/app/models/system/policy/level';
import { PartService } from 'src/app/services/emp/policy/part.service';
import { EmptypeService } from 'src/app/services/emp/policy/emptype.service';
import { PositionService } from 'src/app/services/emp/policy/position.service';
import { EmpDetailService } from 'src/app/services/emp/worker_detail.service';
import { EmptypeModel } from 'src/app/models/employee/policy/emptype';
import { PositionModel } from 'src/app/models/employee/policy/position';
import { LocationModel } from 'src/app/models/system/policy/location';
import { LocationService } from 'src/app/services/system/policy/location.service';
import { FillterEmpModel } from 'src/app/models/usercontrol/filteremp';
import { LevelService } from 'src/app/services/system/policy/level.service';

@Component({

  selector: 'app-select-emp',
  templateUrl: './select-emp.component.html',
  styleUrls: ['./select-emp.component.scss']
})
export class SelectEmpComponent implements OnInit {


  employee_source: EmployeeModel[] = [];
  employee_dest: EmployeeModel[] = [];
  fillterIncludeResign: boolean = false;

  constructor(
    private employeeService: EmployeeService, 
    private empdetailService: EmpDetailService,
    private router: Router,
    private depService: PartService,
    private levelService: LevelService,
    private emptypeService: EmptypeService,
    private positionService: PositionService,
    private locationService: LocationService,
    ) { }

  ngOnInit(): void {
    this.doGetInitialCurrent();

    //dropdown
    this.doLoadlevelList();
    // this.doLoadDeplevelList();
    this.doLoadLocationList();
    this.doLoadPositionList();
    this.doLoadEmptypeList();

    console.log(window.location.hash.split("/").pop())
    setTimeout(() => {
      // this.doLoadEmployee()
      this.doGetDataFillter();
      this.doLoadLanguage();
    }, 300);

  }

  title_level: string = "Level";
  title_position: string = "Position";
  title_emptype: string = "Type";
  title_location: string = "Location";
  title_resign: string = "Include Resign";
  title_searchemp :string = "Serch Employee";

  doLoadLanguage() {
    if (this.initial_current.Language == 'TH') {
      this.title_level= "ระดับ";
      this.title_position= "ตำแหน่ง";
      this.title_emptype= "ประเภทพนักงาน";
      this.title_location= "สถานที่ปฏิบัตืงาน";
      this.title_resign= "รวมพนักงานลาออก";
      this.title_searchemp = "ค้นหาพนักงาน";

    }
  }

  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('');
    }
  }

  //dropdown
  levelList: LevelModel[] = [];
  doLoadlevelList(){
    this.levelService.level_get().then(async(res)=>{
      this.levelList = await res;
    })
  }
  deplevelList: PartModel[] = [];
  doLoadDeplevelList() {
    var tmp = new LevelModel();
    tmp.level_code = this.selectedLevel;
    this.depService.dep_get(tmp).then(async (res) => {
      this.deplevelList = await res;
    })
  }
  emptypeList: EmptypeModel[] = [];
  doLoadEmptypeList() {
    this.emptypeService.type_get().then((res) => {
      this.emptypeList = res;
    })
  }
  positionList: PositionModel[] = [];
  doLoadPositionList() {
    this.positionService.position_get().then((res) => {
      this.positionList = res;
    })
  }
  locationList: LocationModel[] = [];
  doLoadLocationList() {
    var tmp = new LocationModel();
    this.locationService.location_get(tmp).then(async (res) => {
      this.locationList = await res;
    })
  }

  doLoadEmployee() {
    this.employeeService.worker_get(this.initial_current.CompCode, "").then((res) => {
      this.employee_source = res;

      if (this.employee_source.length > 0) {

      }

    });
  }

  //fillter
  doGetDataFillter(){
    
    var fillter : FillterEmpModel = new FillterEmpModel;

    fillter.company_code = this.initial_current.CompCode;
    //fillter dep
    if(this.fillterLevel){
      fillter.level_code = this.selectedLevel;
      fillter.dep_code = this.selectedDep;
    }else{
      fillter.level_code = "";
      fillter.dep_code = "";
    }
    //fillter position
    if(this.fillterPosition){
      fillter.position_code = this.selectedPosition;
    }else{
      fillter.position_code = "";
    }
    //fillter emptype
    if(this.fillterEmptype){
      fillter.worker_emptype = this.selectedEmptype;
    }else{
      fillter.worker_emptype = "";
    }
    //fillter location
    if(this.fillterLocation){
      fillter.location_code = this.selectedLocation;
    }else{
      fillter.location_code = "";
    }
    
    fillter.worker_resignstatus = this.fillterIncludeResign;
    if(this.fillterSearchemp){
      fillter.searchemp = this.selectedSearchemp;
    }else{
      fillter.searchemp = "";
    }
    

    this.employeeService.worker_getbyfillter(fillter).then(async(res) =>{
      this.employee_source = res;
    })
  }

  //-- Type master
  selectedEmptype: string = "";
  fillterEmptype: boolean = false;
  doChangeSelectEmptype() {

    if(this.fillterEmptype){
      this.doGetDataFillter();
    }
  }

  //-- Location master
  selectedLocation: string = "";
  fillterLocation: boolean = false;
  doChangeSelectLocation() {

    if(this.fillterLocation){
      this.doGetDataFillter();
    }
  }
  //-- Level
  selectedLevel:string = "";
  fillterLevel: boolean = false;
  doChangeSelectLevel(){
    this.doLoadDeplevelList();
  }

  //-- Dep master
  selectedDep:string = "";
  doChangeSelectDep() {

    if(this.fillterLevel){
      this.doGetDataFillter();
    }
  }
   //-- Position master
  selectedPosition: string = "";
  fillterPosition: boolean = false;
  doChangeSelectPosition() {

    if(this.fillterPosition){
      this.doGetDataFillter();
    }
  }

  //-- Emp master
  selectedSearchemp:string = "";
  fillterSearchemp:boolean = false;
  doChangeSearchemp(event: any){
    if(this.fillterSearchemp){
      this.doGetDataFillter();
      // console.log(this.selectedSearchemp)
    }
  }
}
