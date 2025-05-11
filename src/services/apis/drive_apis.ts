import axios, { AxiosInstance } from "axios";
import { GetAllDrivesResponse } from "../models/drive/GetAllDrives";
import {
  CreateDrivePayload,
  CreateDriveResponse,
} from "../models/drive/CreateDrive";
import {
  UpdateDrivePayload,
  UpdateDriveResponse,
} from "../models/drive/UpdateDrive";

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

  public async getAllDrives(): Promise<GetAllDrivesResponse> {
    try {
      const response = await this.api.get<GetAllDrivesResponse>(
        "/api/drives/getAllDrives"
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async createDrive(
    payload: CreateDrivePayload
  ): Promise<CreateDriveResponse> {
    try {
      const response = await this.api.post<CreateDriveResponse>(
        "/api/drives/createDrive",
        payload
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async updateDrive(
    payload: UpdateDrivePayload,
    driveId: string
  ): Promise<UpdateDriveResponse> {
    try {
      const response = await this.api.put<UpdateDriveResponse>(
        `/api/drives/updateDrive/${driveId}`,
        payload
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
export const driveApis = new DriveApis();
