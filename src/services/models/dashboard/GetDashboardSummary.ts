export interface GetDashboardSummaryResponse {
  data: GetDashboardSummaryResponseData;
  status: String;
}
export interface GetDashboardSummaryResponseData {
  totalStudents: number;
  vaccinatedStudents: number;
  vaccinationPercentage: String;
  upcomingDrives: UpcomingDrives[];
}

export interface UpcomingDrives {
  _id: String;
  vaccineName: String;
  scheduledDate: String;
  dosesAvailable: number;
  applicableClasses: String;
}
