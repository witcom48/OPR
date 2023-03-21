import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';

import { TaskModel } from '../../../models/task';
import { TaskService } from 'src/app/services/task.service';
import { RadiovalueModel } from '../../../models/project/radio_value';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  title_modified_by:string = "Edit by";
  title_modified_date:string = "Edit date";
  title_search:string = "Search";
  title_upload:string = "Upload";

  title_page_from:string = "Showing";
  title_page_to:string = "to";
  title_page_total:string = "of";
  title_page_record:string = "entries";

  title_confirm:string = "Are you sure?";
  title_confirm_record:string = "Confirm to record";
  title_confirm_delete:string = "Confirm to delete";
  title_confirm_yes:string = "Yes";
  title_confirm_no:string = "No";

  title_confirm_cancel:string = "You have cancelled";

  constructor(private taskService: TaskService, private router:Router) { }

  public taskType:string = "";  
  task_list: TaskModel[] = [];

  ngOnInit(): void {

    this.doLoadStatus()
    this.doGetInitialCurrent()

    setTimeout(() => {
      this.doLoadTask()
    }, 300);

  }

  public initial_current:InitialCurrent = new InitialCurrent();  
  doGetInitialCurrent(){    
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current) {
      this.router.navigateByUrl('');
    }       
  }

  status_list: RadiovalueModel[] = [];  
  selectedStatus: RadiovalueModel = new RadiovalueModel;
  doLoadStatus(){

    if(this.initial_current.Language == "EN"){
      
      var tmp = new RadiovalueModel();  
      tmp.value = "W";
      tmp.text = "Wait";           
      this.status_list.push(tmp);

      tmp = new RadiovalueModel();  
      tmp.value = "F";
      tmp.text = "Finish";           
      this.status_list.push(tmp);

      tmp = new RadiovalueModel();  
      tmp.value = "C";
      tmp.text = "Cancel";           
      this.status_list.push(tmp);

      tmp = new RadiovalueModel();  
      tmp.value = "";
      tmp.text = "All";        
      this.status_list.push(tmp);
    }
    else{
      
      var tmp = new RadiovalueModel();  
      tmp.value = "W";
      tmp.text = "รอ";           
      this.status_list.push(tmp);

      tmp = new RadiovalueModel();  
      tmp.value = "F";
      tmp.text = "เสร็จ";           
      this.status_list.push(tmp);

      tmp = new RadiovalueModel();  
      tmp.value = "C";
      tmp.text = "ยกเลิก";           
      this.status_list.push(tmp);

      tmp = new RadiovalueModel();  
      tmp.value = "";
      tmp.text = "ทั้งหมด";        
      this.status_list.push(tmp);
    }    
  }


  onRowSelectTask(event: Event) {
    
  }

  onChange(event: Event) {
    //console.log('event :' + event);
    this.doLoadTask()
  }

  selectedTask: TaskModel = new TaskModel;
  doLoadTask(){

    this.taskService.getList(this.initial_current.CompCode, this.taskType, this.selectedStatus.value).then((res) =>{
      this.task_list = res;
            
    });
  }

}