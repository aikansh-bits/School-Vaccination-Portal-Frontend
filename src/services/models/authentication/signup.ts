export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
  role: string;
}
export interface SignUpResponse {
  status: string;
  data: SignUpResponseData;
}

export interface SignUpResponseData {
  _id: string;
  userId: string;
  name: string;
  email: string;
  role: string;
}
