export interface GetAllDrivesResponse {
  status: String;
  data: GetAllDrivesResponseData[];
}
export interface GetAllDrivesResponseData {
  _id: String;
  vaccineName: String;
  scheduledDate: String;
  dosesAvailable: number;
  applicableClasses: String;
  createdBy: String;
}
