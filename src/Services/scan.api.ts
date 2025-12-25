import getAxiosSecure from "../Hooks/useAxiosSecure";
import type { ScanfilesDataType } from "../Pages/Userdashboard/UploadTable";

export const scanFile = async (file: File, ) => {
  const formData = new FormData();
  formData.append("file", file); // 👈 backend expects "file"

  const axiosSecure = getAxiosSecure();

  const response = await axiosSecure.post("/api/scan-file", formData, {
    headers: {
      Accept: "application/json",
    },
  });

  return response.data;
}

export const getAllScanned = async (): Promise<ScanfilesDataType[]> => {
  const axiosSecure = getAxiosSecure();
  const response = await axiosSecure.get("/api/all-scanned");
  return response?.data?.data || []; // Ensure it returns an array, fallback to empty array
};


// Function to call the API for scanning the email
export const scanEmail = async (emailBody: string) => {
  const axiosSecure = getAxiosSecure();
  const response = await axiosSecure.post(
    "/api/scan-email", // Endpoint to handle the email scan
    { email_body: emailBody }, // Body with the email content
    {
      headers: {
        Accept: "application/json", // Ensure the backend understands it's JSON
      },
    }
  );
  return response.data; // Return the response data to be used by the hook
};


export interface ScanUrlPayload {
  url: string;
  id: string;
}

export const scanUrlFunction = async (payload: ScanUrlPayload) => {
  const formData = new FormData();
  formData.append("url", payload.url);
  formData.append("id", payload.id);

  const axios = getAxiosSecure();

  const { data } = await axios.post("/api/scan-url", formData, {
    headers: {
      Accept: "application/json",
    },
  });

  return data;
};


export const getScannedFiles = async () => {
  try {
    const { data } = await getAxiosSecure().get("/api/scanned_files");
    return data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching scanned files");
  }
};
export const getScannedUrls = async () => {
  try {
    const { data } = await getAxiosSecure().get("/api/scanned_url");
    return data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching scanned files");
  }
};




export const deleteScannedFile = async (id: number) => {
  const axiosSecure = getAxiosSecure(); // Get axios instance with authentication headers

  try {
    const response = await axiosSecure.post(`/api/delete_scanned/${id}`, null, {
      headers: {
        Accept: "application/json",
      },
    });

    return response.data; // Return the response data (success or failure message)
  } catch (error) {
    console.error("Error deleting scanned file:", error);
    throw error; // You can handle error based on your needs
  }
};