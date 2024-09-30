import {
  CreateReportPayload,
  Record,
  Report,
  ReportResponse,
} from "../types/data";
import { makeApiCall } from "./make-api-call";

export async function getAdUnits() {
  return makeApiCall<
    {
      label: string;
      value: number;
    }[]
  >({
    method: "get",
    url: "ad_units",
  });
}

export async function createReport(payload: CreateReportPayload) {
  return makeApiCall({
    method: "post",
    url: "report",
    data: payload,
  });
}

export async function listReports(): Promise<Report[]> {
  return makeApiCall<ReportResponse[]>({
    method: "get",
    url: "list_reports",
  }).then((res) =>
    res.map((item) => ({
      ...item,
      ad_unit_ids: item?.ad_unit_ids ? item.ad_unit_ids.split(",") : [],
    }))
  );
}
export async function listRecords(record_id: string | number) {
  return makeApiCall<Record[]>({
    method: "get",
    url: `list_records/${record_id}`,
  });
}

export async function deleteReport(report_id: number) {
  return makeApiCall({
    url: `delete_report/${report_id}`,
    method: "delete",
  });
}

export function assignReport(
  report_id: number | string,
  user_id: number | string
) {
  return makeApiCall({
    url: "assign_report",
    method: "post",
    data: {
      user_id,
      report_id,
    },
  });
}
