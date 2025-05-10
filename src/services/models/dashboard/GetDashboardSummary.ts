export interface GetDashboardSummaryResponse {
  data: GetDashboardSummaryResponseData;
  status: string;
}
export interface GetDashboardSummaryResponseData {
  totalStudents: number;
  vaccinatedStudents: number;
  vaccinationPercentage: string;
  upcomingDrives: UpcomingDrives[];
}

export interface UpcomingDrives {
  _id: string;
  vaccineName: string;
  scheduledDate: string;
  dosesAvailable: number;
  applicableClasses: string;
}
