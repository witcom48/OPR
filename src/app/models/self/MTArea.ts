import { TRAreaModel } from "./TRArea";

export class MTAreaModel {
  constructor() {

  }
  company_code: string = "";
  area_id: Number = 0;
  area_lat: number = 0;
  area_long: number = 0;
  area_distance: number = 0;
  location_code: string = "";
  project_code: string = "";

  modified_by: string = "";
  modified_date: string = "";
  flag: boolean = false;
  area_data: TRAreaModel[] = [];
}