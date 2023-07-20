import { TRRoundsModel } from "./tr_rounds";

export class RoundsModel {

    constructor() {

    }
    round_id: string = "0";
    round_code: string = "";
    round_name_th: string = "";
    round_name_en: string = "";

    round_group: string = "";



    round_data: TRRoundsModel[] = [];

    modified_by: string = "";
    modified_date: string = "";
    index: number = 0;
    select: boolean = false;
    flag: boolean = false;



}




    // modified_by: string = "";
    // modified_date: string = "";
    // flag: boolean = false;
// }
