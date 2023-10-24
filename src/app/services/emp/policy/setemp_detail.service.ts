import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { EmployeeModel } from 'src/app/models/employee/employee';
import { SetAssessmentModel } from 'src/app/models/employee/policy/batch/setassessment';
import { SetBenefitsModel } from 'src/app/models/employee/policy/batch/setbenefits';
import { SetDepModel } from 'src/app/models/employee/policy/batch/setdep';
import { SetGroupModel } from 'src/app/models/employee/policy/batch/setgroup';
import { SetLocationModel } from 'src/app/models/employee/policy/batch/setlocation';
import { SetPositionModel } from 'src/app/models/employee/policy/batch/setposition';
import { SetProvidentModel } from 'src/app/models/employee/policy/batch/setprovident';
import { SetSalaryModel } from 'src/app/models/employee/policy/batch/setsalary';
import { SetTrainingModel } from 'src/app/models/employee/policy/batch/settraining';

@Injectable({
  providedIn: 'root'
})

export class SetEmpDetailService {
  public config: AppConfig = new AppConfig();
  public initial_current: InitialCurrent = new InitialCurrent();

  httpHeaders = new HttpHeaders({});
  options = {
    headers: this.httpHeaders
  };

  basicRequest = {
    device_name: '',
    ip: '',
    username: ''
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private datePipe: DatePipe) {
    this.doGetInitialCurrent();
  }

  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (this.initial_current) {
      this.httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': this.initial_current.Token
      });

      this.options = {
        headers: this.httpHeaders
      };

      this.basicRequest = {
        device_name: '',
        ip: "localhost",
        username: this.initial_current.Username
      };

    }
    else {
      this.router.navigateByUrl('login');
    }
  }

  //set Position
  public SetPosition_get(Setup: SetPositionModel) {
    let emplists: any = [];
    Setup.emp_data.forEach((res: EmployeeModel) => {
      let ss = {
        worker_code: res.worker_code
      }
      emplists.push(ss)
    })
    let data = {
      device_name: '',
      ip: '127.0.0.1',
      username: this.initial_current.Username,

      company_code: Setup.company_code || this.initial_current.CompCode,
      empposition_position: Setup.empposition_position,
      empposition_date: Setup.empposition_date,
      emp_data: emplists,

      modified_by: Setup.modified_by || this.initial_current.Username,
    };
    return this.http
      .post<any>(
        this.config.ApiEmployeeModule + '/batchpositionlist',
        data,
        this.options
      )
      .toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        return message.data;
      });
  }

  public SetPosition_record(Setup: SetPositionModel) {
    let emplists: any = []
    Setup.emp_data.forEach((res: EmployeeModel) => {
      let ss = {
        worker_code: res.worker_code
      }
      emplists.push(ss)
    })
    let data = {
      device_name: "",
      ip: "127.0.0.1",
      username: this.initial_current.Username,
      company_code: Setup.company_code || this.initial_current.CompCode,
      empposition_position: Setup.empposition_position,
      empposition_reason: Setup.empposition_reason,
      empposition_date: this.datePipe.transform(Setup.empposition_date),
      emp_data: emplists,
      modified_by: Setup.modified_by || this.initial_current.Username,
    }
    return this.http.post<any>(this.config.ApiEmployeeModule + '/setbatchposition', data, this.options).toPromise()
      .then((res) => {
        // console.log(res)
        let message = JSON.parse(res);
        return message;
      });
  }

  //set group
  public SetGroup_get(Setup: SetGroupModel) {
    let emplists: any = [];
    Setup.emp_data.forEach((res: EmployeeModel) => {
      let ss = {
        worker_code: res.worker_code
      }
      emplists.push(ss)
    })
    let data = {
      device_name: '',
      ip: '127.0.0.1',
      username: this.initial_current.Username,

      company_code: Setup.company_code || this.initial_current.CompCode,
      empgroup_code: Setup.empgroup_code,
      empgroup_date: Setup.empgroup_date,
      emp_data: emplists,

      modified_by: Setup.modified_by || this.initial_current.Username,
    };
    return this.http
      .post<any>(
        this.config.ApiEmployeeModule + '/batchgrouplist',
        data,
        this.options
      )
      .toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        return message.data;
      });
  }

  public SetGroup_record(Setup: SetGroupModel) {
    let emplists: any = []
    Setup.emp_data.forEach((res: EmployeeModel) => {
      let ss = {
        worker_code: res.worker_code
      }
      emplists.push(ss)
    })
    let data = {
      device_name: "",
      ip: "127.0.0.1",
      username: this.initial_current.Username,
      company_code: Setup.company_code || this.initial_current.CompCode,
      empgroup_code: Setup.empgroup_code,
      empgroup_date: this.datePipe.transform(Setup.empgroup_date),
      emp_data: emplists,
      modified_by: Setup.modified_by || this.initial_current.Username,
    }
    return this.http.post<any>(this.config.ApiEmployeeModule + '/setbatchgroup', data, this.options).toPromise()
      .then((res) => {
        // console.log(res)
        let message = JSON.parse(res);
        return message;
      });
  }

  //set dep
  public SetDep_get(Setup: SetDepModel) {
    let emplists: any = [];
    Setup.emp_data.forEach((res: EmployeeModel) => {
      let ss = {
        worker_code: res.worker_code
      }
      emplists.push(ss)
    })
    let data = {
      device_name: '',
      ip: '127.0.0.1',
      username: this.initial_current.Username,

      company_code: Setup.company_code || this.initial_current.CompCode,
      empdep_date : Setup.empdep_date ,
      empdep_level01: Setup.empdep_level01,
      emp_data: emplists,

      modified_by: Setup.modified_by || this.initial_current.Username,
    };
    return this.http
      .post<any>(
        this.config.ApiEmployeeModule + '/batchdeplist',
        data,
        this.options
      )
      .toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        return message.data;
      });
  }

  public SetDep_record(Setup: SetDepModel) {
    let emplists: any = []
    Setup.emp_data.forEach((res: EmployeeModel) => {
      let ss = {
        worker_code: res.worker_code
      }
      emplists.push(ss)
    })
    let data = {
      device_name: "",
      ip: "127.0.0.1",
      username: this.initial_current.Username,
      company_code: Setup.company_code || this.initial_current.CompCode,
      empdep_date: this.datePipe.transform(Setup.empdep_date),
      empdep_level01: Setup.empdep_level01,
      empdep_level02: Setup.empdep_level02,
      empdep_level03: Setup.empdep_level03,
      empdep_level04: Setup.empdep_level04,
      empdep_level05: Setup.empdep_level05,
      empdep_level06: Setup.empdep_level06,
      empdep_level07: Setup.empdep_level07,
      empdep_level08: Setup.empdep_level08,
      empdep_level09: Setup.empdep_level09,
      empdep_level10: Setup.empdep_level10,
      empdep_reason: Setup.empdep_reason,

      emp_data: emplists,
      modified_by: Setup.modified_by || this.initial_current.Username,
    }
    return this.http.post<any>(this.config.ApiEmployeeModule + '/setbatchdep', data, this.options).toPromise()
      .then((res) => {
        // console.log(res)
        let message = JSON.parse(res);
        return message;
      });
  }

  //set location
  public SetLocation_get(Setup: SetLocationModel) {
    let emplists: any = [];
    Setup.emp_data.forEach((res: EmployeeModel) => {
      let ss = {
        worker_code: res.worker_code
      }
      emplists.push(ss)
    })
    let data = {
      device_name: '',
      ip: '127.0.0.1',
      username: this.initial_current.Username,

      company_code: Setup.company_code || this.initial_current.CompCode,
      location_code : Setup.location_code ,
      emplocation_startdate: Setup.emplocation_startdate,
      emp_data: emplists,

      modified_by: Setup.modified_by || this.initial_current.Username,
    };
    return this.http
      .post<any>(
        this.config.ApiEmployeeModule + '/batchlocationlist',
        data,
        this.options
      )
      .toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        return message.data;
      });
  }

  public SetLocation_record(Setup: SetLocationModel) {
    let emplists: any = []
    Setup.emp_data.forEach((res: EmployeeModel) => {
      let ss = {
        worker_code: res.worker_code
      }
      emplists.push(ss)
    })
    let data = {
      device_name: "",
      ip: "127.0.0.1",
      username: this.initial_current.Username,
      company_code: Setup.company_code || this.initial_current.CompCode,
      location_code: Setup.location_code,
      emplocation_startdate: this.datePipe.transform(Setup.emplocation_startdate),
      emplocation_enddate: this.datePipe.transform(Setup.emplocation_enddate),
      emplocation_note: Setup.emplocation_note,
      emp_data: emplists,
      modified_by: Setup.modified_by || this.initial_current.Username,
    }
    return this.http.post<any>(this.config.ApiEmployeeModule + '/setbatchlocation', data, this.options).toPromise()
      .then((res) => {
        // console.log(res)
        let message = JSON.parse(res);
        return message;
      });
  }

  //set salary
  public SetSalary_get(Setup: SetSalaryModel) {
    let emplists: any = [];
    Setup.emp_data.forEach((res: EmployeeModel) => {
      let ss = {
        worker_code: res.worker_code
      }
      emplists.push(ss)
    })
    let data = {
      device_name: '',
      ip: '127.0.0.1',
      username: this.initial_current.Username,

      company_code: Setup.company_code || this.initial_current.CompCode,
      empsalary_date : Setup.empsalary_date ,
      empsalary_amount : Setup.empsalary_amount,
      emp_data: emplists,

      modified_by: Setup.modified_by || this.initial_current.Username,
    };
    return this.http
      .post<any>(
        this.config.ApiEmployeeModule + '/batchsalarylist',
        data,
        this.options
      )
      .toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        return message.data;
      });
  }

  public SetSalary_record(Setup: SetSalaryModel) {
    let emplists: any = []
    Setup.emp_data.forEach((res: EmployeeModel) => {
      let ss = {
        worker_code: res.worker_code
      }
      emplists.push(ss)
    })
    let data = {
      device_name: "",
      ip: "127.0.0.1",
      username: this.initial_current.Username,
      company_code: Setup.company_code || this.initial_current.CompCode,
      empsalary_amount: Setup.empsalary_amount,
      empsalary_incamount: Setup.empsalary_incamount,
      empsalary_incpercent: Setup.empsalary_incpercent,
      empsalary_date: this.datePipe.transform(Setup.empsalary_date),
      empsalary_reason: Setup.empsalary_reason,
      emp_data: emplists,
      modified_by: Setup.modified_by || this.initial_current.Username,
    }
    return this.http.post<any>(this.config.ApiEmployeeModule + '/setbatchsalary', data, this.options).toPromise()
      .then((res) => {
        // console.log(res)
        let message = JSON.parse(res);
        return message;
      });
  }

  //set provident
  public SetProvident_get(Setup: SetProvidentModel) {
    let emplists: any = [];
    Setup.emp_data.forEach((res: EmployeeModel) => {
      let ss = {
        worker_code: res.worker_code
      }
      emplists.push(ss)
    })
    let data = {
      device_name: '',
      ip: '127.0.0.1',
      username: this.initial_current.Username,

      company_code: Setup.company_code || this.initial_current.CompCode,
      provident_code : Setup.provident_code ,
      empprovident_card: Setup.empprovident_card,
      emp_data: emplists,

      modified_by: Setup.modified_by || this.initial_current.Username,
    };
    return this.http
      .post<any>(
        this.config.ApiEmployeeModule + '/batchprovidentlist',
        data,
        this.options
      )
      .toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        return message.data;
      });
  }

  public SetProvident_record(Setup: SetProvidentModel) {
    let emplists: any = []
    Setup.emp_data.forEach((res: EmployeeModel) => {
      let ss = {
        worker_code: res.worker_code
      }
      emplists.push(ss)
    })
    let data = {
      device_name: "",
      ip: "127.0.0.1",
      username: this.initial_current.Username,
      company_code: Setup.company_code || this.initial_current.CompCode,
      provident_code: Setup.provident_code,
      empprovident_card: Setup.empprovident_card,
      empprovident_entry: this.datePipe.transform(Setup.empprovident_entry),
      empprovident_start: this.datePipe.transform(Setup.empprovident_start),
      empprovident_end: this.datePipe.transform(Setup.empprovident_end),
      empprovident_type: Setup.empprovident_type,
      rate_com: Setup.rate_com,
      rate_emp: Setup.rate_emp,
      emp_data: emplists,
      modified_by: Setup.modified_by || this.initial_current.Username,
    }
    return this.http.post<any>(this.config.ApiEmployeeModule + '/setbatchprovident', data, this.options).toPromise()
      .then((res) => {
        // console.log(res)
        let message = JSON.parse(res);
        return message;
      });
  }

  //set benefits
  public SetBenefit_get(Setup: SetBenefitsModel) {
    let emplists: any = [];
    Setup.emp_data.forEach((res: EmployeeModel) => {
      let ss = {
        worker_code: res.worker_code
      }
      emplists.push(ss)
    })
    let data = {
      device_name: '',
      ip: '127.0.0.1',
      username: this.initial_current.Username,

      company_code: Setup.company_code || this.initial_current.CompCode,
      item_code : Setup.item_code ,
      empbenefit_amount: Setup.empbenefit_amount,
      emp_data: emplists,

      modified_by: Setup.modified_by || this.initial_current.Username,
    };
    return this.http
      .post<any>(
        this.config.ApiEmployeeModule + '/batchbenefitlist',
        data,
        this.options
      )
      .toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        return message.data;
      });
  }

  public SetBenefits_record(Setup: SetBenefitsModel) {
    let emplists: any = []
    Setup.emp_data.forEach((res: EmployeeModel) => {
      let ss = {
        worker_code: res.worker_code
      }
      emplists.push(ss)
    })
    let data = {
      device_name: "",
      ip: "127.0.0.1",
      username: this.initial_current.Username,
      company_code: Setup.company_code || this.initial_current.CompCode,
      item_code: Setup.item_code,

      empbenefit_amount: Setup.empbenefit_amount,
      empbenefit_startdate: this.datePipe.transform(Setup.empbenefit_startdate),
      empbenefit_enddate: this.datePipe.transform(Setup.empbenefit_enddate),
      empbenefit_reason: Setup.empbenefit_reason,
      empbenefit_note: Setup.empbenefit_note,
      empbenefit_paytype: Setup.empbenefit_paytype,
      empbenefit_break: Setup.empbenefit_break,
      empbenefit_breakreason: Setup.empbenefit_breakreason,
      empbenefit_conditionpay: Setup.empbenefit_conditionpay,
      empbenefit_payfirst: Setup.empbenefit_payfirst,
      empbenefit_capitalamount: Setup.empbenefit_capitalamount,
      empbenefit_period: Setup.empbenefit_period,

      emp_data: emplists,
      modified_by: Setup.modified_by || this.initial_current.Username,
    }
    return this.http.post<any>(this.config.ApiEmployeeModule + '/setbatchbenefit', data, this.options).toPromise()
      .then((res) => {
        // console.log(res)
        let message = JSON.parse(res);
        return message;
      });
  }

  //set training
  public SetTraining_get(Setup: SetTrainingModel) {
    let emplists: any = [];
    Setup.emp_data.forEach((res: EmployeeModel) => {
      let ss = {
        worker_code: res.worker_code
      }
      emplists.push(ss)
    })
    let data = {
      device_name: '',
      ip: '127.0.0.1',
      username: this.initial_current.Username,

      company_code: Setup.company_code || this.initial_current.CompCode,
      course_code : Setup.course_code ,
      emp_data: emplists,

      modified_by: Setup.modified_by || this.initial_current.Username,
    };
    return this.http
      .post<any>(
        this.config.ApiEmployeeModule + '/batchtraininglist',
        data,
        this.options
      )
      .toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        return message.data;
      });
  }

  public SetTraining_record(Setup: SetTrainingModel) {
    let emplists: any = []
    Setup.emp_data.forEach((res: EmployeeModel) => {
      let ss = {
        worker_code: res.worker_code
      }
      emplists.push(ss)
    })
    let data = {
      device_name: "",
      ip: "127.0.0.1",
      username: this.initial_current.Username,
      company_code: Setup.company_code || this.initial_current.CompCode,
      emptraining_start: this.datePipe.transform(Setup.emptraining_start),
      emptraining_finish: this.datePipe.transform(Setup.emptraining_finish),
      emptraining_status: Setup.emptraining_status,
      emptraining_hours: Setup.emptraining_hours,
      emptraining_cost: Setup.emptraining_cost,
      emptraining_note: Setup.emptraining_note,
      institute_code: Setup.institute_code,
      institute_other: Setup.institute_other,
      course_code: Setup.course_code,
      course_other: Setup.course_other,

      emp_data: emplists,
      modified_by: Setup.modified_by || this.initial_current.Username,
    }
    return this.http.post<any>(this.config.ApiEmployeeModule + '/setbatchtraining', data, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        return message;
      });
  }

  //set assessment
  public SetAssessment_get(Setup: SetAssessmentModel) {
    let emplists: any = [];
    Setup.emp_data.forEach((res: EmployeeModel) => {
      let ss = {
        worker_code: res.worker_code
      }
      emplists.push(ss)
    })
    let data = {
      device_name: '',
      ip: '127.0.0.1',
      username: this.initial_current.Username,

      company_code: Setup.company_code || this.initial_current.CompCode,
      empassessment_location : Setup.empassessment_location ,
      empassessment_fromdate : Setup.empassessment_fromdate,
      emp_data: emplists,

      modified_by: Setup.modified_by || this.initial_current.Username,
    };
    return this.http
      .post<any>(
        this.config.ApiEmployeeModule + '/batchassessmentlist',
        data,
        this.options
      )
      .toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        return message.data;
      });
  }

  public SetAssessment_record(Setup: SetAssessmentModel) {
    let emplists: any = []
    Setup.emp_data.forEach((res: EmployeeModel) => {
      let ss = {
        worker_code: res.worker_code
      }
      emplists.push(ss)
    })
    let data = {
      device_name: "",
      ip: "127.0.0.1",
      username: this.initial_current.Username,
      company_code: Setup.company_code || this.initial_current.CompCode,
      empassessment_location: Setup.empassessment_location,
      empassessment_topic: Setup.empassessment_topic,
      empassessment_fromdate: this.datePipe.transform(Setup.empassessment_fromdate),
      empassessment_todate: this.datePipe.transform(Setup.empassessment_todate),
      empassessment_count: Setup.empassessment_count,
      empassessment_result: Setup.empassessment_result,
    
      emp_data: emplists,
      modified_by: Setup.modified_by || this.initial_current.Username,
    }
    return this.http.post<any>(this.config.ApiEmployeeModule + '/setbatchassessment', data, this.options).toPromise()
      .then((res) => {
        let message = JSON.parse(res);
        return message;
      });
  }

}