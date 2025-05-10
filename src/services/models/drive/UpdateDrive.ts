export interface UpdateDrivePayload {
  vaccineName: string;
  scheduledDate: string;
  dosesAvailable: number;
  applicableClasses: string;
  createdBy: string;
  status: string;
}

export interface UpdateDriveResponse {
  status: string;
  data: UpdateDriveResponseData;
}

export interface UpdateDriveResponseData {
  vaccineName: string;
  scheduledDate: string;
  dosesAvailable: number;
  applicableClasses: string;
  createdBy: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
