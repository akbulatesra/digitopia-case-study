import { SignInRequestModel, SignInResponseModel } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const personalApi = createApi({
  reducerPath: 'personalApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<SignInResponseModel, SignInRequestModel>({
      query: (credentials) => ({
        url: 'signIn',
        method: 'POST',
        body: credentials,
      }),
    }),
    getIndustryList: builder.query<string, void>({
      query: () => '/industries',
    }),
    getCountryList: builder.query<string, void>({
      query: () => '/countries',
    }),
    getOrganizationDetail: builder.query<string, void>({
      query: (ORGANIZATION_ID) => `/organization/${ORGANIZATION_ID}/detail`,
    }),
    getImpactRunList: builder.query<Record<string, any>[], void>({
      query: () => '/impact-runs',
    }),
    getImpactRunDetail: builder.query<Record<string, any>[], void>({
      query: (IMPACT_RUN_ID) => `/impact-run/${IMPACT_RUN_ID}/recommendations`,
    }),
  }),
});

export const {
  useLoginMutation,
  useGetIndustryListQuery,
  useGetCountryListQuery,
  useGetOrganizationDetailQuery,
  useGetImpactRunListQuery,
  useLazyGetImpactRunDetailQuery,
} = personalApi;
