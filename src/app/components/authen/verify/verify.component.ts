import { Component, OnInit } from '@angular/core';

import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';
import { AuthenService } from '../../../services/authen/authen.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  constructor(
    private authenService: AuthenService,
    private router: Router,
    ) { }


  loading: boolean = true;
  token: string = "";
  ngOnInit(): void {

    this.authenService.getToken().then((token) => {
      this.token = token;
      this.loading = false;
      let initail_current = new InitialCurrent();

      initail_current.CompCode = "OPR";
      initail_current.Token = 'Bearer ' + this.token;
      
      console.log(initail_current.Token);
      
      localStorage.setItem(AppConfig.SESSIONInitial, initail_current.doGetJSONInitialCurrent());
      if(initail_current.Token){
        this.router.navigateByUrl('login');
      }

    });


  }



}
