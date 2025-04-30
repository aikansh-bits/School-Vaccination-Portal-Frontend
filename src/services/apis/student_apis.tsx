import axios, { AxiosInstance } from "axios";
import { GetDashboardSummaryResponse } from "../models/dashboard/GetDashboardSummary";
import { GetAllStudentResponse } from "../models/students/GetAllStudents";

const API_URL = process.env.REACT_APP_API_BASE_URL;

class StudentApis {
  private api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: API_URL,

      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async getStudents(): Promise<GetAllStudentResponse> {
    try {
      const response = await this.api.get<GetAllStudentResponse>(
        "/api/students/getAllStudents"
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
export const studentApis = new StudentApis();
