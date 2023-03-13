export class TimeinputformatModel {
  constructor() {
    this.company_code = "";
    this.date_format = "dd/MM/yyyy";

    this.card_start = 0;    
    this.card_lenght = 0;

    this.date_start = 0;    
    this.date_lenght = 0;

    this.hours_start = 0;    
    this.hours_lenght = 0;

    this.minute_start = 0;    
    this.minute_lenght = 0;

    this.function_start = 0;    
    this.function_lenght = 0;

    this.machine_start = 0;    
    this.machine_lenght = 0;

    this.index = 1;   
  }
  
  company_code: string;
  date_format: string;

  card_start: number;
  card_lenght: number;

  date_start: number;
  date_lenght: number;

  hours_start: number;
  hours_lenght: number;

  minute_start: number;
  minute_lenght: number;

  function_start: number;
  function_lenght: number;

  machine_start: number;
  machine_lenght: number;
          
  modified_by: string = "";
  modified_date: string = "";
  flag: boolean = false;   

  index: number;
}
