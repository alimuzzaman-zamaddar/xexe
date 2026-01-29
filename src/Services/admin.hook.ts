/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../Services/admin.api"; // Import the API function

export interface DashboardData {
  totalScans: number;
  totalFrauds: number;
  totalSafes: number;
  totalActiveUsers: number;
  scansFiles : any;
}
export const useDashboardData = () => {
  return useQuery<DashboardData, Error>({
    queryKey: ["dashboard-data"],
    queryFn: getDashboardData, 
    refetchInterval: 1000 ,
  });
};
