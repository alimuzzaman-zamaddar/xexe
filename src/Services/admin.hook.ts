import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../Services/admin.api"; // Import the API function
import type { ScanfilesDataType } from "../Pages/Userdashboard/UploadTable";

export interface DashboardData {
  totalScans: number;
  totalFrauds: number;
  totalSafes: number;
  totalActiveUsers: number;
  scansFiles: [ScanfilesDataType];
}
export const useDashboardData = () => {
  return useQuery<DashboardData, Error>({
    queryKey: ["dashboard-data"],
    queryFn: getDashboardData, 
    refetchInterval: 1000 ,
  });
};
