import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { AppConfig } from 'src/app/config/config';
import { InitialCurrent } from 'src/app/config/initial_current';
import { cls_MTTopicModel } from 'src/app/models/self/cls_MTTopic';
import { TopicServices } from 'src/app/services/self/topic.service';
declare var topic: any;
interface Type {
  name: string,
  code: string
}
@Component({
  selector: 'app-self-topic',
  templateUrl: './self-topic.component.html',
  styleUrls: ['./self-topic.component.scss']
})
export class SelfTopicComponent implements OnInit {
  langs: any = topic;
  selectlang: string = "EN";
  constructor(
    private router: Router,
    private topicService: TopicServices,
    private messageService: MessageService,
  ) { }
  new_data: boolean = false
  edit_data: boolean = false
  typeList: Type[] = [{ name: "Emp", code: "Emp" }, { name: "PDPA", code: "PDPA" }];
  selectedtype: any;
  items_menu: MenuItem[] = [];
  topic_list: cls_MTTopicModel[] = [];
  selectedtopic: cls_MTTopicModel = new cls_MTTopicModel();
  public initial_current: InitialCurrent = new InitialCurrent();
  doGetInitialCurrent() {
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.SESSIONInitial) || '{}');
    if (!this.initial_current.Token) {
      this.router.navigateByUrl('login');
    }
    this.selectlang = this.initial_current.Language;
  }
  ngOnInit(): void {
    this.doGetInitialCurrent();
    this.doLoadMenu();
    this.doLoadTopic();
  }
  doLoadTopic() {
    this.topic_list = [];
    var tmp = new cls_MTTopicModel()
    this.topicService.topic_get(tmp).then(async (res) => {
      this.topic_list = await res;
    });
  }
  async doRecordTopic(data: cls_MTTopicModel) {
    await this.topicService.topic_record(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadTopic()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
  }
  async doDeleteTopic(data: cls_MTTopicModel) {
    await this.topicService.topic_delete(data).then((res) => {
      if (res.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.doLoadTopic()
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
      }

    });
    this.new_data = false;
    this.edit_data = false;
  }
  doLoadMenu() {
    this.items_menu = [
      {
        label: this.langs.get('new')[this.selectlang],
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          this.selectedtopic = new cls_MTTopicModel();
          this.selectedtype = this.typeList[0];
          this.selectedtopic.topic_type = this.typeList[0].code;
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
  selecttype() {
    this.selectedtopic.topic_type = this.selectedtype.code;
  }
  onRowSelect(event: any) {
    this.typeList.filter((obj: Type) => {
      if (obj.code === this.selectedtopic.topic_type) {
        this.selectedtype = obj;
      }
    })
    this.new_data = true
    this.edit_data = true;
  }
  close() {
    this.new_data = false
    this.selectedtopic = new cls_MTTopicModel()
  }
  Save() {
    // console.log(this.selectedtopic)
    this.doRecordTopic(this.selectedtopic)
  }
  Delete() {
    this.doDeleteTopic(this.selectedtopic)
  }

}
