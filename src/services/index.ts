import { SignInRequestModel, SignInResponseModel } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const personalApi = createApi({
  reducerPath: 'personalApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
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
      query: () =>
        'http://ec2-3-123-161-240.eu-central-1.compute.amazonaws.com:8080/industries',
    }),
    getCountryList: builder.query<string, void>({
      query: () =>
        'http://ec2-3-123-161-240.eu-central-1.compute.amazonaws.com:8080/countries',
    }),
    getOrganizationDetail: builder.query<string, void>({
      query: (ORGANIZATION_ID) =>
        `http://ec2-3-123-161-240.eu-central-1.compute.amazonaws.com:8181/organization/${ORGANIZATION_ID}/detail`,
    }),
    getImpactRunList: builder.query<string, void>({
      query: () =>
        'http://ec2-3-123-161-240.eu-central-1.compute.amazonaws.com:8484/impact-runs',
    }),
    getImpactRunDetail: builder.query<string, void>({
      query: (IMPACT_RUN_ID) =>
        `http://ec2-3-123-161-240.eu-central-1.compute.amazonaws.com:8283/impact-run/${IMPACT_RUN_ID}/recommendations`,
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
