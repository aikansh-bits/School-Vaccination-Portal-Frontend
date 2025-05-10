export interface GetAllDrivesResponse {
  status: string;
  data: GetAllDrivesResponseData[];
}
export interface GetAllDrivesResponseData {
  _id: string;
  vaccineName: string;
  scheduledDate: string;
  dosesAvailable: number;
  applicableClasses: string;
  createdBy: string;
  isExpired: boolean;
  status: string;
}
