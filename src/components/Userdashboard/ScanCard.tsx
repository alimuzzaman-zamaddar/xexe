/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Tag, Button } from "antd";
import {
  LinkOutlined,
  FileOutlined,
  DownloadOutlined,
  SafetyOutlined,
} from "@ant-design/icons";

const Row = ({ label, value }: { label: string; value?: any }) => {
  if (!value) return null;
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
};

const ScanCard = ({ item }: { item: any }) => {
  const isUrl = item.type === "url";

  const title = isUrl
    ? item.domain || "Unknown domain"
    : item.original_file?.split("/").pop() || "Unknown file";

  return (
    <Card
      className="w-full h-full"
      title={
        <div className="flex items-center gap-2 truncate">
          {isUrl ? <LinkOutlined /> : <FileOutlined />}
          <span className="truncate">{title}</span>
        </div>
      }
      extra={
        item.status && (
          <Tag color={item.status === "completed" ? "green" : "orange"}>
            {item.status}
          </Tag>
        )
      }
    >
      {/* PRIMARY SIGNAL */}
      {isUrl && item.final_verdict && (
        <div className="mb-3 font-semibold flex items-center gap-2">
          <SafetyOutlined />
          {item.final_verdict}
        </div>
      )}

      {!isUrl && item.risk_score && (
        <div className="mb-3 text-lg font-semibold">
          Risk Score:{" "}
          <span
            className={
              parseInt(item.risk_score) >= 80
                ? "text-red-600"
                : "text-yellow-600"
            }
          >
            {item.risk_score}
          </span>
        </div>
      )}

      {/* DETAILS */}
      <div className="space-y-2">
        {isUrl && (
          <>
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
          </>
        )}

        {/* RISK SIGNALS */}
        {item.risk_signals?.length > 0 && (
          <div>
            <div className="text-gray-500 text-sm mb-1">Risk Signals</div>
            <div className="flex flex-wrap gap-1">
              {item.risk_signals.map((r: string) => (
                <Tag key={r} color="red">
                  {r}
                </Tag>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ACTION */}
      {item.file_url && (
        <Button
          className="mt-4"
          type="link"
          icon={<DownloadOutlined />}
          href={`${import.meta.env.VITE_SITE_URL}/${item.file_url}`}
          target="_blank"
        >
          Download report
        </Button>
      )}
    </Card>
  );
};

export default ScanCard;
