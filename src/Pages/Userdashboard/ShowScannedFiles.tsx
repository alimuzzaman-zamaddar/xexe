import { useScannedFiles } from "../../Services/scan.hook";
import ScanCardsGrid from "../../components/Userdashboard/ScanCardsGrid";

const ShowScannedFiles: React.FC = () => {
  const { data } = useScannedFiles();

  return (
    <>
      <ScanCardsGrid data={data || []} />
    </>
  );
};

export default ShowScannedFiles;
