export class PayreduceModel {
    constructor() { }

    company_code: string = '';
    worker_code: string = '';
    payreduce_paydate!: Date;
    reduce_code: string = '';
    payreduce_amount: number = 0;
    reduce_name_th: string = '';
    reduce_name_en: string = '';
    index: number = 0;
}