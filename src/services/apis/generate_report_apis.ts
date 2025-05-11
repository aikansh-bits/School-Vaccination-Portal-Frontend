import axios, { AxiosInstance } from "axios";
import { GetAllDrivesResponse } from "../models/drive/GetAllDrives";

const API_URL = process.env.REACT_APP_API_BASE_URL;

class DriveApis {
  private api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: API_URL,

      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async generateReport(): Promise<GetAllDrivesResponse> {
    try {
      const response = await this.api.get<GetAllDrivesResponse>(
        "/api/reports/generateReport"
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
export const driveApis = new DriveApis();
