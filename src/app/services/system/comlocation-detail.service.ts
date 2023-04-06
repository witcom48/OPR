import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { InitialCurrent } from '../../config/initial_current';
import { ComcardModel } from 'src/app/models/system/comcard';
import { ComaddlocationModel } from 'src/app/models/system/comaddlocation';

@Injectable({
    providedIn: 'root',
})
export class ComlocationDetailService {
    public config: AppConfig = new AppConfig();
    public initial_current: InitialCurrent = new InitialCurrent();

    httpHeaders = new HttpHeaders({});
    options = {
        headers: this.httpHeaders,
    };

    basicRequest = {
        device_name: '',
        ip: '',
        username: '',
    };

    constructor(
        private http: HttpClient,
        private router: Router,
        private datePipe: DatePipe
    ) {
        this.doGetInitialCurrent();
    }

    doGetInitialCurrent() {
        this.initial_current = JSON.parse(
            localStorage.getItem(AppConfig.SESSIONInitial) || '{}'
        );
        if (this.initial_current) {
            this.httpHeaders = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json',
                'Cache-Control': 'no-cache',
                Authorization: this.initial_current.Token,
            });

            this.options = {
                headers: this.httpHeaders,
            };

            this.basicRequest = {
                device_name: '',
                ip: 'localhost',
                username: this.initial_current.Username,
            };
        } else {
            this.router.navigateByUrl('login');
        }
    }

    // Address ComaddlocationModel
    public getcomlocation_comaddlocation(company: string, code: string) {
        var filter = {
            device_name: '',
            ip: 'localhost',
            username: this.initial_current.Username,
            company_code: company,
            language: '',
            comlocation_code: code,
            comaddress_type: '',
        };

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/comaddlocation_list',
                filter,
                this.options
            )
            .toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                console.log(res);
                return message.data;
            });
    }
    public record_comaddlocation(
        comlocation_code: string,
        list: ComaddlocationModel[]
    ) {
        var item_data: string = '[';
        for (let i = 0; i < list.length; i++) {
            item_data = item_data + '{';
            item_data =
                item_data +
                '"comaddress_type":"' +
                list[i].comaddress_type +
                '"';
            item_data =
                item_data + ',"comlocation_code":"' + comlocation_code + '"';

            item_data =
                item_data +
                ',"comaddlocationth_no":"' +
                list[i].comaddlocationth_no +
                '"';
            item_data =
                item_data +
                ',"comaddlocationth_moo":"' +
                list[i].comaddlocationth_moo +
                '"';
            item_data =
                item_data +
                ',"comaddlocationth_soi":"' +
                list[i].comaddlocationth_soi +
                '"';
            item_data =
                item_data +
                ',"comaddlocationth_road":"' +
                list[i].comaddlocationth_road +
                '"';
            item_data =
                item_data +
                ',"comaddlocationth_tambon":"' +
                list[i].comaddlocationth_tambon +
                '"';
            item_data =
                item_data +
                ',"comaddlocationth_amphur":"' +
                list[i].comaddlocationth_amphur +
                '"';
            item_data =
                item_data +
                ',"provinceth_code":"' +
                list[i].provinceth_code +
                '"';

            item_data =
                item_data +
                ',"comaddlocationen_no":"' +
                list[i].comaddlocationen_no +
                '"';
            item_data =
                item_data +
                ',"comaddlocationen_moo":"' +
                list[i].comaddlocationen_moo +
                '"';
            item_data =
                item_data +
                ',"comaddlocationen_soi":"' +
                list[i].comaddlocationen_soi +
                '"';
            item_data =
                item_data +
                ',"comaddlocationen_road":"' +
                list[i].comaddlocationen_road +
                '"';
            item_data =
                item_data +
                ',"comaddlocationen_tambon":"' +
                list[i].comaddlocationen_tambon +
                '"';
            item_data =
                item_data +
                ',"comaddlocationen_amphur":"' +
                list[i].comaddlocationen_amphur +
                '"';
            item_data =
                item_data +
                ',"comaddlocation_zipcode":"' +
                list[i].comaddlocation_zipcode +
                '"';
            item_data =
                item_data +
                ',"provinceen_code":"' +
                list[i].provinceen_code +
                '"';

            item_data =
                item_data +
                ',"comaddlocation_tel":"' +
                list[i].comaddlocation_tel +
                '"';
            item_data =
                item_data +
                ',"comaddlocation_email":"' +
                list[i].comaddlocation_email +
                '"';
            item_data =
                item_data +
                ',"comaddlocation_line":"' +
                list[i].comaddlocation_line +
                '"';
            item_data =
                item_data +
                ',"comaddlocation_facebook":"' +
                list[i].comaddlocation_facebook +
                '"';
            item_data =
                item_data +
                ',"company_code":"' +
                this.initial_current.CompCode +
                '"';

            item_data = item_data + '}' + ',';
        }
        if (item_data.length > 2) {
            item_data = item_data.substr(0, item_data.length - 1);
        }
        item_data = item_data + ']';

        var specificData = {
            transaction_data: item_data,
            company_code: this.initial_current.CompCode,
            comlocation_code: comlocation_code,
            modified_by: this.initial_current.Username,
        };

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/comaddlocation',
                specificData,
                this.options
            )
            .toPromise()
            .then((res) => {
                return res;
            });
    }

    public delete_comaddlocation(model: ComaddlocationModel) {
        const data = {
            comlocation_code: model.comlocation_code,
            modified_by: this.initial_current.Username,
        };

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/comaddlocation_del',
                data,
                this.options
            )
            .toPromise()
            .then((res) => {
                return res;
            });
    }
    public comaddlocation_import(
        file: File,
        file_name: string,
        file_type: string
    ) {
        const formData = new FormData();
        formData.append('file', file);

        var para = 'fileName=' + file_name + '.' + file_type;
        para += '&token=' + this.initial_current.Token;
        para += '&by=' + this.initial_current.Username;

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/doUploadComaddlocation?' + para,
                formData
            )
            .toPromise()
            .then((res) => {
                return res;
            });
    }

    //Card
    public getcombranch_card(company: string, code: string) {
        var filter = {
            device_name: '',
            ip: 'localhost',
            username: this.initial_current.Username,
            company_code: company,
            language: '',
            card_type: '',
            comcard_id: '',
            combranch_code: code,
            comcard_code: '',
            //   worker_code:code
        };

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/comcard_list',
                filter,
                this.options
            )
            .toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                console.log(res);
                return message.data;
            });
    }
    public record_comcard(combranch_code: string, list: ComcardModel[]) {
        var item_data: string = '[';
        for (let i = 0; i < list.length; i++) {
            item_data = item_data + '{';
            item_data = item_data + '"comcard_id":"' + list[i].comcard_id + '"';
            item_data =
                item_data + ',"comcard_code":"' + list[i].comcard_code + '"';
            item_data =
                item_data + ',"combranch_code":"' + combranch_code + '"';
            item_data = item_data + ',"card_type":"' + list[i].card_type + '"';
            item_data =
                item_data +
                ',"comcard_issue":"' +
                this.datePipe.transform(list[i].comcard_issue) +
                '"';
            item_data =
                item_data +
                ',"comcard_expire":"' +
                this.datePipe.transform(list[i].comcard_expire) +
                '"';
            item_data =
                item_data +
                ',"company_code":"' +
                this.initial_current.CompCode +
                '"';
            item_data = item_data + '}' + ',';
        }
        if (item_data.length > 2) {
            item_data = item_data.substr(0, item_data.length - 1);
        }
        item_data = item_data + ']';
        console.log(item_data);

        var specificData = {
            transaction_data: item_data,
            company_code: this.initial_current.CompCode,
            combranch_code: combranch_code,
            modified_by: this.initial_current.Username,
        };

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/comcard',
                specificData,
                this.options
            )
            .toPromise()
            .then((res) => {
                return res;
            });
    }
    public delete_comcard(model: ComcardModel) {
        const data = {
            comcard_id: model.comcard_id,
            // company_code: model.company_code,
            combranch_code: model.combranch_code,
            //   company_code: this.initial_current.CompCode,
            modified_by: this.initial_current.Username,
        };

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/comcard_del',
                data,
                this.options
            )
            .toPromise()
            .then((res) => {
                return res;
            });
    }
    public comcard_import(file: File, file_name: string, file_type: string) {
        const formData = new FormData();
        formData.append('file', file);

        var para = 'fileName=' + file_name + '.' + file_type;
        para += '&token=' + this.initial_current.Token;
        para += '&by=' + this.initial_current.Username;

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/doUploadComcard?' + para,
                formData
            )
            .toPromise()
            .then((res) => {
                return res;
            });
    }

    // test

    public comlocation_get(company: string, code: string) {
        var filter = {
            device_name: '',
            ip: 'localhost',
            username: this.initial_current.Username,
            company_code: company,
            language: '',
            comlocation_code: code,
            comaddress_type: '',
        };

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/comlocation_list',
                filter,
                this.options
            )
            .toPromise()
            .then((res) => {
                let message = JSON.parse(res);
                //console.log(res)
                return message.data;
            });
    }

    public comlocation_record(model: ComaddlocationModel) {
        const data = {
            company_code: model.company_code,
            comlocation_code: model.comlocation_code,
            comaddress_type: model.comaddress_type,
            comaddlocationth_no: model.comaddlocationth_no,
            comaddlocationth_moo: model.comaddlocationth_moo,
            comaddlocationth_soi: model.comaddlocationth_soi,
            comaddlocationth_road: model.comaddlocationth_road,
            comaddlocationth_tambon: model.comaddlocationth_tambon,
            comaddlocationth_amphur: model.comaddlocationth_amphur,
            provinceth_code: model.provinceth_code,
            comaddlocationen_no: model.comaddlocationen_no,
            comaddlocationen_moo: model.comaddlocationen_moo,
            comaddlocationen_soi: model.comaddlocationen_soi,
            comaddlocationen_road: model.comaddlocationen_road,
            comaddlocationen_tambon: model.comaddlocationen_tambon,
            comaddlocationen_amphur: model.comaddlocationen_amphur,
            comaddlocation_zipcode: model.comaddlocation_zipcode,
            provinceen_code: model.provinceen_code,
            comaddlocation_tel: model.comaddlocation_tel,
            comaddlocation_email: model.comaddlocation_email,
            comaddlocation_line: model.comaddlocation_line,
            comaddlocation_facebook: model.comaddlocation_facebook,

            modified_by: this.initial_current.Username,
        };

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/comlocation',
                data,
                this.options
            )
            .toPromise()
            .then((res) => {
                return res;
            });
    }

    public comlocation_delete(model: ComaddlocationModel) {
        const data = {
            comlocation_code: model.comlocation_code,
            modified_by: this.initial_current.Username,
            // comlocation_code: model.comlocation_code,
            // comaddress_type: model.comaddress_type,
            // company_code: model.company_code,
            // modified_by: this.initial_current.Username,
        };

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/comlocation_del',
                data,
                this.options
            )
            .toPromise()
            .then((res) => {
                return res;
            });
    }

    public comlocation_import(
        file: File,
        file_name: string,
        file_type: string
    ) {
        const formData = new FormData();
        formData.append('file', file);
        var para = 'fileName=' + file_name + '.' + file_type;
        para += '&token=' + this.initial_current.Token;
        para += '&by=' + this.initial_current.Username;

        return this.http
            .post<any>(
                this.config.ApiSystemModule + '/doUploadTRComlocation?' + para,
                formData
            )
            .toPromise()
            .then((res) => {
                return res;
            });
    }
    //
}
