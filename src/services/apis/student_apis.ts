import axios, { AxiosInstance } from "axios";
import { GetAllStudentResponse } from "../models/students/GetAllStudents";
import {
  CreateStudentPayload,
  CreateStudentResponseModel,
} from "../models/students/CreateStudent";
import {
  UpdateStudentPayload,
  UpdateStudentResponseModel,
} from "../models/students/UpdateStudent";

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

  public async getStudents(filterParams: any): Promise<GetAllStudentResponse> {
    try {
      const response = await this.api.get<GetAllStudentResponse>(
        "/api/students/getAllStudents",
        {
          params: filterParams,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async createStudent(
    payload: CreateStudentPayload
  ): Promise<CreateStudentResponseModel> {
    try {
      const response = await this.api.post<CreateStudentResponseModel>(
        "/api/students/createStudent",
        payload
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async updateStudent(
    payload: UpdateStudentPayload,
    studentId: String
  ): Promise<UpdateStudentResponseModel> {
    try {
      const response = await this.api.put<UpdateStudentResponseModel>(
        `/api/students/updateStudent/${studentId}`,
        payload
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async uploadStudents(formData: FormData): Promise<any> {
    try {
      const response = await this.api.post(
        "/api/students/bulkUpload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
export const studentApis = new StudentApis();
