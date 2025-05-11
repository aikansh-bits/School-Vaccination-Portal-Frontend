export interface Vaccination {
  vaccineName: string;
}

export interface GenerateReportResponseData {
  studentId: string;
  name: string;
  class: string;
  dob: string;
  status: string;
  vaccinations: Vaccination[];
}

export interface GenerateReportResponse {
  status: string;
  data: GenerateReportResponseData[];
  total: number;
  page: number;
  limit: number;
}
