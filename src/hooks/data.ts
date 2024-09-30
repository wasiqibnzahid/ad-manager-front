import { CreateReportPayload } from "../types/data";
import {
  assignReport,
  createReport,
  deleteReport,
  getAdUnits,
  listRecords,
  listReports,
} from "../services/data-api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authKeys } from "./auth";

export const useCreateReport = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: CreateReportPayload) => {
      createReport(payload);
    },
  });

  return {
    createReport: mutateAsync,
    creatingReport: isPending,
  };
};

export const useAdUnits = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["ad_units"],
    queryFn: () => {
      return getAdUnits();
    },
  });
  return {
    adUnits: data || [],
    fetchingAdUnits: isFetching,
  };
};
export const useListReports = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["reports"],
    queryFn: () => {
      return listReports();
    },
  });
  return {
    reports: data || [],
    isLoadingReports: isFetching,
  };
};
export const useListRecords = (record_id: number | string) => {
  const { data, isFetching } = useQuery({
    queryKey: ["records", record_id],
    enabled: !!record_id,
    queryFn: () => {
      return listRecords(record_id);
    },
  });
  return {
    records: data || [],
    isLoadingRecords: isFetching,
  };
};
export const useDeleteReport = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (report_id: number) => {
      return deleteReport(report_id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reports"],
      });
    },
  });
  return {
    deleteReport: mutateAsync,
    isDeletingReport: isPending,
  };
};
export const useAssignReport = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({
      report_id,
      user_id,
    }: {
      report_id: number;
      user_id: number;
    }) => {
      return assignReport(report_id, user_id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authKeys.users,
      });
    },
  });
  return {
    assignReport: mutateAsync,
    isAssigningReport: isPending,
  };
};
