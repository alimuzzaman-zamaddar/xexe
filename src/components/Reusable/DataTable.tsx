import { useDashboardData } from "../../Services/admin.hook";
import ScanCardsGrid from "../Userdashboard/ScanCardsGrid";

const DataTable: React.FC = () => {
  const { data } = useDashboardData();

  return (
    <>
      <ScanCardsGrid data={data?.scansFiles || []} />
    </>
  );
};

export default DataTable;
