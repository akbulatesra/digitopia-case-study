export interface SignInRequestModel {
  email: string;
  password: string;
}
export interface SignInResponseModel {
  accessToken: {
    jwtToken: string;
  };
  idToken: {
    jwtToken: string;
  };
  refreshToken: {
    token: string;
  };
}
export type Locale = 'tr' | 'en';
