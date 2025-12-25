import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../Services/admin.api"; // Import the API function
import type { ScanfilesDataType } from "../Pages/Userdashboard/UploadTable";

// Define the type for your dashboard data (customize based on your API response)
// interface DashboardData {
//   id: number;
//   totalUsers: number;
//   activeUsers: number;
//   // Add other properties based on your response
// }


export interface DashboardData {
  totalScans: number;
  totalFrauds: number;
  totalSafes: number;
  totalActiveUsers: number;
  scansFiles: [ScanfilesDataType];
}
export const useDashboardData = () => {
  return useQuery<DashboardData, Error>({
    queryKey: ["dashboard-data"], // Unique key for caching
    queryFn: getDashboardData, // Fetch data from the API
    refetchInterval: 1000 ,
  });
};
