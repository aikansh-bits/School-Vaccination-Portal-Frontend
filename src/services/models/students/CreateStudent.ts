export interface CreateStudentPayload {
  name: string;
  class: string;
  dob: string;
  mobileNumber?: string;
  address?: string;
  vaccinations: string[];
}

export interface CreateStudentResponseModel {
  data: CreateStudentResponseModelData;
  status: string;
}

export interface CreateStudentResponseModelData {
  _id: string;
  studentId: string;
  name: string;
  class: string;
  dob: string;
  mobileNumber?: string;
  address?: string;
  vaccinations: Vaccination[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Vaccination {
  driveId: string;
  vaccineName: string;
  _id: string;
}
