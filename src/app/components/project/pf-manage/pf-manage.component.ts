import { Component, OnInit } from '@angular/core';
import { MegaMenuItem,MenuItem } from 'primeng/api';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

import { ExatpfModel } from '../../../models/project/exat_pf';

@Component({
  selector: 'app-pf-manage',
  templateUrl: './pf-manage.component.html',
  styleUrls: ['./pf-manage.component.scss']
})
export class PfManageComponent implements OnInit {

  items: MenuItem[] = [];
  constructor() { }

  ngOnInit(): void {

    this.items = [   
      {
        label:"เพิ่ม",
        icon:'pi pi-fw pi-plus'
      } 
      ,
      {
          label:'แก้ไข',
          icon:'pi pi-fw pi-pencil'
      }       
      ,
      {
        label:"ลบ",
        icon:'pi pi-fw pi-trash',  
       
      } 
    ];

    this.doLoadList()


  }

  onRowSelectPf(event: Event) {
     

  }

  pf_list: ExatpfModel[] = [];
  selectedPf: ExatpfModel = new ExatpfModel;
  doLoadList(){
    var tmp = new ExatpfModel();

    tmp.year_id = "2566";
    tmp.file_preix = "25660125_102522_scbam_pvd_25651231_01568_3_";
    tmp.file_folder = "2566/03";
    tmp.file_name = "ใบแจ้งยอดเงินสมาชิกกองทุนฯ มีนาคม";
    tmp.file_order = 1;
    tmp.file_enable = true
    tmp.modified_by = "1550062900";

    this.pf_list.push(tmp);

    tmp = new ExatpfModel();

    tmp.year_id = "2566";
    tmp.file_preix = "25660125_102522_scbam_pvd_25651231_01568_6_";
    tmp.file_folder = "2566/06";
    tmp.file_name = "ใบแจ้งยอดเงินสมาชิกกองทุนฯ มิถุนายน";
    tmp.file_order = 2;
    tmp.modified_by = "1550062900";

    this.pf_list.push(tmp);

    
  }

}
