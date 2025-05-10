export interface CreateDrivePayload {
  vaccineName: string;
  scheduledDate: string;
  dosesAvailable: number;
  applicableClasses: string;
  createdBy: string;
}

export interface CreateDriveResponse {
  status: string;
  data: CreateDriveResponseModel;
}

export interface CreateDriveResponseModel {
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
