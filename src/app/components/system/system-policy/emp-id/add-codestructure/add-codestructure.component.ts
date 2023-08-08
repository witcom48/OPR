import { Component, OnInit, ViewChild,  Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { MegaMenuItem,MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import * as XLSX from 'xlsx';
import { AppConfig } from '../../../../../config/config';
import { InitialCurrent } from '../../../../../config/initial_current';
import { EmpIDModel } from 'src/app/models/system/policy/empid';
import { EmpidService } from 'src/app/services/system/policy/empid.service';
import { CodestructureModel } from 'src/app/models/system/policy/codestructure';
import { TRPolcodeModel } from 'src/app/models/system/policy/tr_polcode';
import { PolcodeService } from 'src/app/services/system/policy/polcode.service';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/core/dialog';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-add-codestructure',
  templateUrl: './add-codestructure.component.html',
  styleUrls: ['./add-codestructure.component.scss']
})
export class AddCodestructureComponent implements OnInit {


  //-- Label
  public labDetail!: string;
  public labLenght!: string;
  public labText!: string;
  public labOrder!: string;
    dialogRef: any;

//   public initial:Initiacl = new Initial();

  constructor(
    private dialog: ActivatedRoute ,

    // public dialogRef: MatDialogRef<AddCodestructureComponent>,
    
    @Inject('') public data: TRPolcodeModel,
    private polcodeService:PolcodeService
    ) {}

  public initial_current:InitialCurrent = new InitialCurrent();
  doGetInitialCurrent(){
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (this.initial_current) {
        this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');

    }
  }

  getLanguage() : string {
    return this.initial_current.Language;
  }

  doCheckLanguage(){
    if(this.getLanguage() == "EN"){
      this.labDetail = "Detail";
      this.labLenght = "Lenght";
      this.labText = "Text";
      this.labOrder = "Order";
    }
    else{
      this.labDetail = "รายละเอียด";
      this.labLenght = "ความยาว";
      this.labText = "ข้อความคงที่";
      this.labOrder = "อันดับ";
    }
  }

  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doCheckLanguage();
    this.doGetStrucList();
  }

  onNoClick(): void {
    this.dialogRef.close({codestructure_code: ''});
  }

  public codeStrucList!: CodestructureModel[];
  doGetStrucList(){
    this.codeStrucList = [];
  }
  setFormatLenght($event: { target: { value: string; }; })
  {
    $event.target.value = parseFloat($event.target.value).toFixed(0);
    this.data.polcode_lenght = $event.target.value;
  }
  setFormatOrder($event: { target: { value: string; }; })
  {
    $event.target.value = parseFloat($event.target.value).toFixed(0);
    this.data.polcode_order = $event.target.value;
  }
  doSubmit() {
    this.dialogRef.close({codestructure_code: this.data.codestructure_code
      , polcode_lenght: this.data.polcode_lenght
      , polcode_text: this.data.polcode_text
      , polcode_order: this.data.polcode_order
     });
  }
}

