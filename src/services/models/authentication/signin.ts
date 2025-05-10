export interface SignInResponse {
  status: string;
  data: SignInResponseData;
}

export interface SignInResponseData {
  _id: string;
  userId: string;
  name: string;
  email: string;
  role: string;
}

export interface SignInPayload{
    email: string;
    password: string;
}