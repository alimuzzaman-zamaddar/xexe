import { Dashboardcardicon, Dashboardcardicon1, Dashboardcardicon2, Dashboardcardicon3 } from "../../assets/icons/Icons";
import Dashboardcard from "../../components/Reusable/Dashboardcard";
import DataTable from "../../components/Reusable/DataTable";
import { useDashboardData } from "../../Services/admin.hook";

export interface DashboardSummaryData {
  totalScans: number;
  totalFrauds: number;
  totalSafes: number;
  totalActiveUsers: number;
  scansFiles: [];
}

const Dashboard = () => {

  const { data, isLoading, isError } = useDashboardData();

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Failed to load dashboard data.</p>;



  return (
    <section className="2xl:pl-10 pt-17 2xl:pr-25 xl:px-0 px-4">
      <h3 className="text-[32px] font-popins font-semibold text-[#111315]">
        Overview
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-x-6.5 gap-y-6 mt-5 w-full">
        <Dashboardcard
          icon={<Dashboardcardicon />}
          title="Total Scans"
          value={data?.totalScans}
          description="Files analyzed for fraud"
        />
        <Dashboardcard
          icon={<Dashboardcardicon1 />}
          title="Fraud Alerts"
          value={data?.totalFrauds}
          description="Flagged for review"
        />
        <Dashboardcard
          icon={<Dashboardcardicon2 />}
          title="Safe Files"
          value={data?.totalSafes}
          description="No fraud detected"
        />
        <Dashboardcard
          icon={<Dashboardcardicon3 />}
          title="Active Users"
          value={data?.totalActiveUsers}
          description="Team members"
        />
      </div>

      <div className="lg:mt-12 mt-5">
        <h3 className="lg:text-[32px] text-[24px] font-popins font-semibold text-[#111315]">
          Recent Uploads
        </h3>
        <div className="mt-8">
          <DataTable />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
