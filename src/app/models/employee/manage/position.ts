import { PositionModel } from "../policy/position";

export class EmpPositionModel {
    constructor() {
    }
    company_code: string= "";
    worker_code: string= "";
    empposition_id: string= "0";
    empposition_date!: Date;
    empposition_position: string= "";
    empposition_reason: string= "";

    modified_by: string= "";
    modified_date: string= "";


    index: number = 0;
    select: boolean = false;

    positionlists: PositionModel[]=[];
    request_code: string = "";
}
