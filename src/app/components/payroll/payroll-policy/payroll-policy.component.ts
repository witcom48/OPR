import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';

@Component({
  selector: 'app-payroll-policy',
  templateUrl: './payroll-policy.component.html',
  styleUrls: ['./payroll-policy.component.scss']
})
export class PayrollPolicyComponent implements OnInit {

  router: any;

  constructor() { }

  ngOnInit(): void {
    this.doGetInitialCurrent();
 this.doLoadLanguage();
    // setTimeout(() => {
       
    // }, 500);
}

public initial_current: InitialCurrent = new InitialCurrent();
    doGetInitialCurrent() {
        this.initial_current = JSON.parse(
            localStorage.getItem(AppConfig.SESSIONInitial) || '{}'
        );
        if (!this.initial_current) {
            this.router.navigateByUrl('');
        }
    }
    title_system_payroll: string = 'Policy payroll';
    title_system_Policy: string = 'Policy';

    
    title_Calculation: string = 'Calculation Period';
    title_Taxrate: string = 'Tax Rate';
    title_IncomeDeduct: string = 'Income / Deduct';
    title_Provident_Fund: string = 'Provident Fund';
    title_Bonus: string = 'Bonus';

    title_SetIncomeDeduct: string = 'Set Income / Deduct';
    title_SetBonus: string = 'Set Bonus';
    title_SetProvidentFund: string = 'Set Provident Fund';

    doLoadLanguage() {
        if (this.initial_current.Language == 'TH') {
            this.title_system_payroll= 'นโยบาย';
            this.title_system_Policy= 'นโยบาย';

            this.title_Calculation = 'กำหนดงวด';
            this.title_Taxrate = 'อัตราภาษี';
            this.title_IncomeDeduct = 'ชนิดเงินได้ / เงินหัก';
            this.title_Provident_Fund = 'กองทุนสำรองเลี้ยงชีพ';
            this.title_Bonus = 'โบนัส';

            this.title_SetIncomeDeduct = 'กำหนดสิทธิเงินได้/เงินหัก';
            this.title_SetBonus = 'กำหนดนโยบายโบนัส';
            this.title_SetProvidentFund = 'กำหนดสิทธิกองทุนสำรองฯ';

            
           
 
        }
    }
}
