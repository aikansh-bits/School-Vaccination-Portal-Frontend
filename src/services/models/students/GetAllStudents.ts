export interface GetAllStudentResponse {
  status: String;
  data: GetAllStudentResponseData[];
}
export interface GetAllStudentResponseData {
  _id: String;
  studentId: String;
  name: String;
  class: String;
  vaccinations: Vaccination[];
  createdAt: String;
  updatedAt: String;
  __v: number;
}

export interface Vaccination {
  driveId: String;
  vaccineName: String;
  _id: String;
}
