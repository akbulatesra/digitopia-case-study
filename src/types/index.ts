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
    payload: {
      'custom:organizationId': string;
      'custom:organizationRole': string;
      'custom:role': string;
      family_name: string;
      name: string;
    };
  };
  refreshToken: {
    token: string;
  };
}
export type Locale = 'tr' | 'en';
