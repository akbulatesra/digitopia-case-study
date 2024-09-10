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
export interface OrganizationDetailRequestModel {
  organizationId: string;
}
export interface OrganizationDetailResponseModel {
  children: [];
  countryId: string;
  createdById: string;
  createdOn: string;
  id: string;
  industryId: string;
  logoUrl: null;
  name: string;
  parentId: string;
}
export interface IndustryListResponseModel {
  code: null;
  id: string;
  name: string;
  parent: {
    code: null;
    id: string;
    name: string;
    parent: null;
  };
}
export interface CountryListResponseModel {
  id: string;
  name: string;
  parent: {
    id: string;
    name: string;
    parent: null;
  };
}
interface TopicRecommendation {
  capex?: boolean;
  condition?: string | null;
  description?: string;
  dimension?: string;
  dimensionId?: string | null;
  displayOrder?: number;
  id?: string;
  importance?: number | null;
  initiativeSize?: string;
  opex?: boolean;
  product?: string;
  recommendation?: string;
  recommendationType?: string;
  section?: string;
  topic?: string;
  urgency?: number | null;
  startMonth?: string;
  endMonth?: string;
  startWeek?: number;
  backgroundColor?: string;
}
export interface ImpactRunListResponseModel {
  id: string;
}
export interface ImpactRunDetailResponseModel {
  deleted: boolean;
  dimensionId: string;
  id: string;
  impactRunId: string;
  importance: number;
  index: number;
  scoreGap: number;
  sessionGap: number;
  topicBenchmark: number;
  topicRecommendation: TopicRecommendation;
  topicScore: number;
  urgency: number;
}

export type Locale = 'tr' | 'en';

export interface WeekLine {
  selectAll: string;
  svg: d3.Selection<SVGGElement, unknown, null, undefined>;
  data: string[];
  y1?: number;
  y2: number;
  x1: (d: string) => number;
  x2: (d: string) => number;
  lineAttr?: Record<string, any>;
}
