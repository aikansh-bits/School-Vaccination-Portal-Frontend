import axios, { AxiosInstance } from "axios";
import { GetDashboardSummaryResponse } from "../models/dashboard/GetDashboardSummary";

const API_URL = process.env.REACT_APP_API_BASE_URL;

class DashboardApis {
  private api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: API_URL,

      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async getDashboardSummary(): Promise<GetDashboardSummaryResponse> {
    try {
      const response = await this.api.get<GetDashboardSummaryResponse>(
        "/api/dashboard/getDashboardSummary"
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
export const dashboardApis = new DashboardApis();
