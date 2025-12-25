/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteScannedFile, getAllScanned, getScannedFiles, getScannedUrls, scanEmail, scanFile, scanUrlFunction, type ScanUrlPayload } from "./scan.api";
import toast from "react-hot-toast";
import type { ScanfilesDataType } from "../Pages/Userdashboard/UploadTable";

export const useScanFile = () =>
  useMutation({
    mutationFn: scanFile,
    onSuccess: (data) => {
      toast.success("File scanned successfully!");
      console.log("✅ Scan result:", data);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Scan failed");
    },
  });


export const useGetAllScanned = () => {
  return useQuery<ScanfilesDataType[], Error>({
    queryKey: ['scanned-files'],
    queryFn: getAllScanned,
   
   
  });
};


// Define the result type for the scanEmail function (the data returned after scanning)
interface ScanEmailResponse {
  success: boolean;
  message: string;
  data: any; // This could be further typed depending on the response data from your API
  code: number;
}

export const useScanEmail = () => {
  return useMutation<ScanEmailResponse, unknown, string>({
    mutationFn: scanEmail, // The function to scan the email
    onSuccess: (data) => {
      toast.success("Email scanned successfully!");
      console.log("✅ Email scan result:", data); // Logging the response
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Email scan failed.");
    },
  });
};



export const useScanUrl = () => {
  return useMutation({
    mutationFn: (payload: ScanUrlPayload) => scanUrlFunction(payload),

    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "URL Scan Failed");
    },
    onSuccess: (res) => {
   
      if(res.status === true){
        toast.success(res.message);
      }else{
        toast.error(res.message)
      }
      console.log("✅ URL scan result:", res);
    },
  });
};


export interface ScannedFile {
  id: number;
  user_id: number;
  analysis_id: string;
  file_url: string;
  url: string | null;
  type: string;
  uploaded_at: string;
  risk_score: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export const useScannedFiles = () => {
  return useQuery<ScannedFile[], Error>({
    queryKey: ["scanned-files"], // Unique key for caching
    queryFn: getScannedFiles, // Fetch data from the API
    refetchInterval: 1000, // Optional: auto-refresh every 60 seconds (if needed)
  });
};
export const useScannedUrls = () => {
  return useQuery<ScannedFile[], Error>({
    queryKey: ["scanned-Urls"], // Unique key for caching
    queryFn: getScannedUrls, // Fetch data from the API
    refetchInterval: 1000, // Optional: auto-refresh every 60 seconds (if needed)
  });
};

export const useDeleteScannedFile = () => {
  return useMutation({
    mutationFn: (id: number) => deleteScannedFile(id),
    onSuccess: () => {
      // Handle success (e.g., refetch files or show success notification)
      toast.success("File deleted successfully!");
    },
    onError: error => {
      // Handle error (e.g., show error notification)
      console.error("Error deleting file:", error);
    },
  });
};