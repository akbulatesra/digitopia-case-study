import {
  CountryListResponseModel,
  ImpactRunDetailResponseModel,
  IndustryListResponseModel,
  OrganizationDetailRequestModel,
  OrganizationDetailResponseModel,
  SignInRequestModel,
  SignInResponseModel,
} from '@/types';
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
    getIndustryList: builder.query<IndustryListResponseModel[], void>({
      query: () => '/industries',
    }),
    getCountryList: builder.query<CountryListResponseModel[], void>({
      query: () => '/countries',
    }),
    getOrganizationDetail: builder.query<
      OrganizationDetailResponseModel,
      OrganizationDetailRequestModel
    >({
      query: ({ organizationId }) => `/organization/${organizationId}/detail`,
    }),
    getImpactRunList: builder.query<Record<string, any>[], void>({
      query: () => '/impact-runs',
    }),
    getImpactRunDetail: builder.query<ImpactRunDetailResponseModel[], void>({
      query: (IMPACT_RUN_ID) => `/impact-run/${IMPACT_RUN_ID}/recommendations`,
    }),
  }),
});

export const {
  useLoginMutation,
  useGetIndustryListQuery,
  useGetCountryListQuery,
  useLazyGetOrganizationDetailQuery,
  useGetImpactRunListQuery,
  useLazyGetImpactRunDetailQuery,
} = personalApi;
