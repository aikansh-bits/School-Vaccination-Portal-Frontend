import axios, { AxiosInstance } from "axios";
import { SignInPayload, SignInResponse } from "../models/authentication/signin";
import { SignUpPayload, SignUpResponse } from "../models/authentication/signup";

const API_URL = process.env.REACT_APP_API_BASE_URL;

class AuthenticationApis {
  private api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: API_URL,

      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async signIn(data: SignInPayload): Promise<SignInResponse> {
    try {
      const response = await this.api.post<SignInResponse>(
        "/api/users/login",
        data
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async signUp(data: SignUpPayload): Promise<SignUpResponse> {
    try {
      const response = await this.api.post<SignUpResponse>(
        "/api/users/login",
        data
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
export const authenticationApis = new AuthenticationApis();
