/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Tag, Button } from "antd";
import {
  DownloadOutlined,
  SafetyOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { RiLinksLine } from "react-icons/ri";
import { FaFile } from "react-icons/fa";
import { useDeleteScannedFile } from "../../Services/scan.hook";

const Row = ({ label, value }: { label: string; value?: any }) => {
  if (!value) return null;
  return (
    <div className="flex justify-between items-center py-2 border-b border-[#003072]/10 last:border-0">
      <span className="text-sm text-[#003072]/60">{label}</span>
      <span className="text-sm font-semibold text-[#003072]">{value}</span>
    </div>
  );
};

const getRiskTag = (riskScore?: string) => {
  if (!riskScore) return null;

  const score = parseInt(riskScore);

  if (score <= 30) return <Tag color="green">Low Risk</Tag>;
  if (score <= 50) return <Tag color="gold">Warning</Tag>;
  if (score <= 80) return <Tag color="orange">High Risk</Tag>;
  return <Tag color="red">Danger</Tag>;
};

const ScanCard = ({ item }: { item: any }) => {
  const isUrl = item.type === "url";
  const { mutate: deleteFile } = useDeleteScannedFile();

  const title = isUrl
    ? item.domain || "Unknown domain"
    : item.original_file?.split("/").pop() || "Unknown file";

  return (
    <Card
      className="w-full h-full rounded-2xl border border-[#003072] overflow-hidden flex flex-col"
      bodyStyle={{ padding: 0, flex: 1 }}
      title={
        <div className="flex items-center justify-between gap-4 pt-5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-[#003072] flex items-center justify-center text-white">
              {isUrl ? <RiLinksLine size={22} /> : <FaFile size={20} />}
            </div>

            <a
              href={isUrl && item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate"
            >
              <h3 className="font-semibold text-[#003072] truncate text-base">
                {title}
              </h3>
            </a>
          </div>
        </div>
      }
      extra={getRiskTag(item.risk_score)}
    >
      <div className="flex flex-col h-full">
        {/* CONTENT */}
        <div className="p-5 space-y-4 flex-1">
          {isUrl && item.final_verdict && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-[#003072]/5 border border-[#003072]/10">
              <SafetyOutlined className="text-[#003072]" />
              <span className="font-medium text-[#003072]">
                {item.final_verdict}
              </span>
            </div>
          )}

          {!isUrl && item.risk_score && (
            <div className="rounded-lg p-4 border border-[#003072]/10 bg-[#003072]/5">
              <div className="flex items-center gap-2 mb-2">
                <SafetyOutlined className="text-[#003072]" />
                <span className="text-sm font-medium text-[#003072]">
                  Risk Score
                </span>
              </div>

              <div className="h-2 bg-[#003072]/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600"
                  style={{
                    width: `${Math.min(parseInt(item.risk_score), 100)}%`,
                  }}
                />
              </div>

              <div className="flex justify-between mt-2 text-xs">
                <span className="text-[#003072]/50">Low</span>
                <span className="font-semibold text-[#003072]">
                  {item.risk_score}
                </span>
                <span className="text-[#003072]/50">High</span>
              </div>
            </div>
          )}

          {isUrl && (
            <div className="rounded-lg p-4 bg-[#003072]/5 border border-[#003072]/10">
              <Row label="Registrar" value={item.registrar} />
              <Row label="Registrant" value={item.registrant} />
              <Row label="SSL Status" value={item.ssl_status} />
              <Row
                label="Domain Age"
                value={
                  item.domain_age_months !== null
                    ? `${item.domain_age_months} months`
                    : null
                }
              />
            </div>
          )}

          {item.risk_signals?.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-[#003072]">
                Risk Signals
              </p>
              <div className="flex flex-wrap gap-2">
                {item.risk_signals.map((r: string) => (
                  <span
                    key={r}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-900 border border-red-200"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="px-5 py-4 border-t border-[#003072]/10 bg-[#003072] flex items-center justify-between">
          {item.file_url ? (
            <Button
              icon={<DownloadOutlined />}
              href={`${import.meta.env.VITE_SITE_URL}/${item.file_url}`}
              target="_blank"
            >
              Download report
            </Button>
          ) : (
            <span />
          )}

          <Button
            danger
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => deleteFile(item.id)}
            className="bg-sky-200"
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ScanCard;
