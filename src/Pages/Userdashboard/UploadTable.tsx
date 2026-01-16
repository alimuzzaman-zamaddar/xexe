/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {  useGetAllScanned } from "../../Services/scan.hook";
import ScanCardsGrid from "../../components/Userdashboard/ScanCardsGrid";


const UploadCards: React.FC = () => {
  const { data } = useGetAllScanned();


  return (
    <ScanCardsGrid data={data || []} />
 
  );
};

export default UploadCards;
