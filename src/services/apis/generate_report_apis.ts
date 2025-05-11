import axios, { AxiosInstance } from "axios";
import { GenerateReportResponse } from "../models/generate_reports/GenerateReport";

const API_URL = process.env.REACT_APP_API_BASE_URL;

class GenerateReportApis {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Accept query params for filters
  public async generateReport(filters?: {
    vaccineName?: string;
    class?: string;
    page?: number;
    limit?: number;
  }): Promise<GenerateReportResponse> {
    try {
      const response = await this.api.get<GenerateReportResponse>(
        "/api/reports/generateReport",
        {
          params: filters, // Axios handles encoding
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const generateReportApis = new GenerateReportApis();
