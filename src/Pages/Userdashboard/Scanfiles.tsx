import { useRef, useState, type ChangeEvent } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Uploadimagesicon } from "../../assets/icons/Icons";
import {
  useScanEmail,
  useScanFile,
  useScanUrl,
} from "../../Services/scan.hook"; 
import toast from "react-hot-toast"; 
import { useAuth } from "../../Hooks/useAuth";
import ShowScannedFiles from "./ShowScannedFiles";
import ShowScannedUrls from "./ShowScannedUrls";


const Scanfiles = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutate: scanNow, isPending } = useScanFile(); 

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isPDF = file.type === "application/pdf";
    const isDOCX = file.name.endsWith(".docx");

    if (isPDF || isDOCX) {
      setSelectedFile(file);
    } else {
      alert("Only PDF and DOCX files are allowed.");
    }
  };

  // ✅ File Upload Handler
  const handleFileUpload = () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }
    scanNow(selectedFile, {
      onSuccess: () => {
        // Reset the file input and form after successful scan
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; 
        }
      },
      onError: () => {
        toast.error("File scan failed.");
      },
    });
    console.log("File upload initiated:", selectedFile.name);
  };

  const [emailBody, setEmailBody] = useState(""); // State to store the email body content
  const {
    mutate: scanEmail,
    isPending: isEmailScanning,
    data,
  } = useScanEmail();

  const handleSubmit = () => {
    if (!emailBody.trim()) {
      toast.error("Please paste the email content.");
      return;
    }
    scanEmail(emailBody); // Trigger the email scan when submit button is clicked
  };

  const { user } = useAuth();

  const [scanUrl, setScanUrl] = useState("");

  const { mutate: triggerScanUrl, isPending: isScanningUrl } = useScanUrl();
  const handleUrlScan = () => {
    if (!scanUrl.trim()) {
      toast.error("Please enter a URL.");
      return;
    }

    if (!user?.id) {
      toast.error("User not logged in.");
      return;
    }

    triggerScanUrl({ url: scanUrl, id: user.id });
  };

  return (
    <section className="pt-16 px-4 md:px-6 lg:px-10 2xl:px-[100px]">
      <h3 className="text-2xl sm:text-[28px] lg:text-[32px] font-popins font-semibold text-[#111315]">
        Upload Files
      </h3>
      <p className="text-[#ADADAD] font-popins text-base sm:text-lg pt-4 pb-8">
        Upload contracts or emails in PDF or DocX format for fraud analysis.
      </p>

      <div className="w-full">
        <Tabs>
          <TabList className="flex gap-4 flex-wrap border-b border-[#EFEFEF] pb-3">
            <Tab className="text-base sm:text-lg text-[#ADADAD] font-normal outline-0 cursor-pointer">
              File Upload
            </Tab>
            <Tab className="text-base sm:text-lg text-[#ADADAD] font-normal outline-0 cursor-pointer">
              Text scanning
            </Tab>
            <Tab className="text-base sm:text-lg text-[#ADADAD] font-normal outline-0 cursor-pointer">
              URL Scan
            </Tab>
          </TabList>

          <div className="mt-12">
            <TabPanel>
              <div className="bg-[#FBFBFB] w-full min-h-[300px] sm:min-h-[350px] md:min-h-[400px] rounded-[20px] border border-dashed border-[#ADADAD] flex flex-col justify-center items-center gap-6 px-4 py-8 text-center">
                {!selectedFile ? (
                  <>
                    <Uploadimagesicon className="w-12 h-12 md:w-16 md:h-16" />
                    <p className="text-[#ADADAD] font-popins text-base sm:text-lg max-w-[500px]">
                      Drop your PDF or DocX files here, or click to browse.
                      <br className="hidden sm:block" />
                      Max file size: 10MB per file.
                    </p>
                    <button
                      onClick={handleFileClick}
                      className="px-6 h-[48px] sm:h-[56px] border cursor-pointer border-[#52ABFF] rounded-[10px] font-inter text-base sm:text-lg hover:bg-white hover:text-[#52ABFF] font-semibold bg-[#52ABFF] text-white transition-all duration-300"
                    >
                      Browse Files
                    </button>
                    <input
                      type="file"
                      accept=".pdf,.docx"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <p className="text-base sm:text-lg font-popins text-[#111315]">
                      Selected File: <strong>{selectedFile.name}</strong>
                    </p>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedFile(null)}
                        className="px-6 h-11 bg-red-500 cursor-pointer text-white rounded-lg hover:bg-red-600 transition-all duration-200"
                      >
                        Remove File
                      </button>
                      <button
                        onClick={handleFileUpload}
                        disabled={isPending}
                        className="px-6 h-11 cursor-pointer bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200"
                      >
                        {isPending ? "Scanning..." : "Scan Now"}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-24">
                <h3 className="text-2xl sm:text-[28px] lg:text-[32px] font-popins font-semibold text-[#111315] pb-5">
                  Recent Uploads
                </h3>
                <ShowScannedFiles />
              </div>
            </TabPanel>

            <TabPanel>
              <div className="mt-10">
                {/* Title */}
                <h3 className="text-2xl sm:text-[28px] lg:text-[32px] font-popins font-semibold text-[#111315]">
                  Paste Your Email Content Get Instant AI Risk Analysis
                </h3>
                {/* Email Input Area */}
                <div className="bg-[#FBFBFB] w-full min-h-[300px] sm:min-h-[350px] md:min-h-[400px] rounded-[20px] border border-dashed border-[#ADADAD] gap-6 px-4 py-4 sm:py-6 mt-5">
                  <textarea
                    placeholder="Paste the full content of your email here..."
                    value={emailBody}
                    onChange={e => setEmailBody(e.target.value)} // Capture the email body input
                    className="w-full h-[300px] resize-none bg-transparent outline-none text-[#111315] placeholder:text-[#ADADAD] font-popins text-base sm:text-lg"
                  />
                </div>
                {/* Continue Button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleSubmit} // Submit the email body for scanning
                    disabled={isEmailScanning}
                    className="px-6 h-[48px] sm:h-[56px] cursor-pointer mt-5 border border-[#52ABFF] rounded-[10px] font-inter text-base sm:text-lg hover:bg-white hover:text-[#52ABFF] font-semibold bg-[#52ABFF] text-white transition-all duration-300"
                  >
                    {isEmailScanning ? "Scanning..." : "Continue"}
                  </button>
                </div>
                Display scan results
                {data && (
                  <div className="mt-5 p-4 bg-[#F0F0F0] rounded-md">
                    <h4 className="text-lg font-semibold mb-3">Scan Result:</h4>

                    {/* Display resultContent in a readable blog-style manner */}
                    {data.data?.resultContent && (
                      <div className="mb-4">
                        <h5 className="font-semibold">Analysis Summary:</h5>

                        {/* Clean resultContent */}
                        <div className="text-[#111315] font-popins text-base sm:text-lg space-y-4 mt-2">
                          {data.data.resultContent
                            .replace(
                              /[*_~`!@#$%^&*()+=\[\]{}|\\:;"'<>,.?/]/g,
                              ""
                            ) // Remove special characters
                            .split("\n") // Split into lines
                            .filter((line: string) => line.trim()) // Remove empty lines
                            .map((line: string, idx: number) => (
                              <p key={idx}>{line}</p> // Display each line as a paragraph
                            ))}
                        </div>
                      </div>
                    )}

                    {/* Show links if available */}
                    {Array.isArray(data.data?.links) &&
                      data.data.links.length > 0 && (
                        <div>
                          <h5 className="font-semibold mb-2">
                            Detected Links:
                          </h5>
                          <ul className="list-disc pl-5 space-y-1">
                            {data.data.links.map(
                              (
                                link: {
                                  url: string;
                                  risk_score: number;
                                  malicious: boolean;
                                  safe: boolean;
                                },
                                idx: number
                              ) => (
                                <li key={idx}>
                                  <a
                                    href={link.url}
                                    className="text-blue-600 underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {link.url}
                                  </a>{" "}
                                  — Risk Score: {link.risk_score}, Malicious:{" "}
                                  {link.malicious ? "Yes" : "No"}, Safe:{" "}
                                  {link.safe ? "Yes" : "No"}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                  </div>
                )}
                {/* Why Connect Section */}
                <div className="mt-10">
                  <h3 className="text-2xl sm:text-[28px] lg:text-[32px] font-popins font-semibold text-[#111315]">
                    Why connect your email?
                  </h3>
                  <p className="text-[#ADADAD] font-popins text-base sm:text-lg mt-2">
                    Alternated seeming helps detect suspicious activity in
                    real-time, keeping your inbox safe.
                  </p>
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="mt-10">
                <h3 className="text-2xl sm:text-[28px] lg:text-[32px] font-popins font-semibold text-[#111315]">
                  Submit URL for Risk Analysis
                </h3>

                <div className="bg-[#FBFBFB] w-full min-h-[200px] rounded-[20px] border border-dashed border-[#ADADAD] gap-6 px-4 py-6 mt-5">
                  <input
                    type="text"
                    placeholder="Enter the URL)"
                    value={scanUrl}
                    onChange={e => setScanUrl(e.target.value)}
                    className="w-full p-4 rounded-lg text-[#111315] text-base font-popins mb-4"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleUrlScan}
                    disabled={isScanningUrl}
                    className="mt-4 px-6 h-[48px] sm:h-[56px] cursor-pointer border border-[#52ABFF] rounded-[10px] font-inter text-base sm:text-lg hover:bg-white hover:text-[#52ABFF] font-semibold bg-[#52ABFF] text-white transition-all duration-300"
                  >
                    {isScanningUrl ? "Scanning..." : "Scan Now"}
                  </button>
                </div>

                {/* {urlScanData && (
                  <div className="mt-6 p-4 bg-[#F0F0F0] rounded-md">
                    <h4 className="text-lg font-semibold mb-2">Scan Result:</h4>
                    <pre className="text-sm font-mono whitespace-pre-wrap text-[#333]">
                      {JSON.stringify(urlScanData.data || urlScanData, null, 2)}
                    </pre>
                  </div>
                )} */}
              </div>
              <div className="py-10">
                <ShowScannedUrls />
              </div>
            </TabPanel>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default Scanfiles;
