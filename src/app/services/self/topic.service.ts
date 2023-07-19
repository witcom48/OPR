import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { InitialCurrent } from '../../config/initial_current';
import { cls_MTTopicModel } from 'src/app/models/self/cls_MTTopic';

@Injectable({
    providedIn: 'root'
})
export class TopicServices {

    public config: AppConfig = new AppConfig();
    public initial_current: InitialCurrent = new InitialCurrent();

    httpHeaders = new HttpHeaders({});
    options = {
        headers: this.httpHeaders
    };

    constructor(private http: HttpClient, private router: Router) {
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
        }
        else {
            this.router.navigateByUrl('login');
        }
    }

    public topic_get(topic: cls_MTTopicModel) {
        // console.log('ATT001..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: topic.company_code || this.initial_current.CompCode,
            topic_id: topic.topic_id,
            topic_code: topic.topic_code,
            topic_type: topic.topic_type
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/topic_list', data, this.options).toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                return message.data;
            });
    }

    public topic_record(topic: cls_MTTopicModel) {
        // console.log('ATT002..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: topic.company_code || this.initial_current.CompCode,
            topic_id: topic.topic_id,
            topic_code: topic.topic_code,
            topic_name_th: topic.topic_name_th,
            topic_name_en: topic.topic_name_en,
            topic_type: topic.topic_type,
            flag: topic.flag
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/topic', data, this.options).toPromise()
            .then((res) => {
                // console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
    public topic_delete(topic: cls_MTTopicModel) {
        // console.log('ATT003..');
        let data = {
            device_name: "phone",
            ip: "127.0.0.1",
            username: this.initial_current.Username,
            company_code: topic.company_code || this.initial_current.CompCode,
            topic_id: topic.topic_id,
            topic_code: topic.topic_code,
        }
        return this.http.post<any>(this.config.ApiSelfServicesModule + '/topic_del', data, this.options).toPromise()
            .then((res) => {
                // console.log(res)
                let message = JSON.parse(res);
                return message;
            });
    }
}
