export interface SignUpPayload {
  name: String;
  email: String;
  password: String;
  role: String;
}
export interface SignUpResponse {
  status: string;
  data: SignUpResponseData;
}

export interface SignUpResponseData {
  _id: String;
  userId: String;
  name: String;
  email: String;
  role: String;
}
