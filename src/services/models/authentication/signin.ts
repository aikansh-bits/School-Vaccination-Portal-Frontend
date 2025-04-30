export interface SignInResponse {
  status: String;
  data: SignInResponseData;
}

export interface SignInResponseData {
  _id: String;
  userId: String;
  name: String;
  email: String;
  role: String;
}

export interface SignInPayload{
    email: String;
    password: String;
}