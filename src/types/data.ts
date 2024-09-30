

export interface CreateReportPayload {
  start_date: string;
  end_date: string;
  name: string;
  cpm: number;
  ad_unit_ids: number[];
}

export interface ReportResponse {
  id: number;
  start_date: string;
  end_date: string;
  ad_unit_ids: string;
  created_at: string;
  updated_at: string;
  cpm_rate: number;
  status: string;
  name: string;
}

export interface Report extends Omit<ReportResponse, "ad_unit_ids"> {
  ad_unit_ids: string[];
}

export interface Record {
  id: number;
  date: string;
  ad_unit_id: string;
  ad_unit_name: string;
  impressions: string;
  clicks: string;
  ctr: number;
  revenue: string;
  report: number;
}
