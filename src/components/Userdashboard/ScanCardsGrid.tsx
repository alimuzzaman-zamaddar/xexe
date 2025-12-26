/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination } from "antd";
import { useState } from "react";
import ScanCard from "./ScanCard";

const PAGE_SIZE = 6;

const ScanCardsGrid = ({ data }: { data: any[] }) => {
  const [page, setPage] = useState(1);

  const visible = data.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {visible.map(item => (
          <ScanCard key={item.id} item={item} />
        ))}
      </div>

      <Pagination
        current={page}
        pageSize={PAGE_SIZE}
        total={data.length}
        onChange={setPage}
        showSizeChanger={false}
        align="center"
      />
    </div>
  );
};

export default ScanCardsGrid;
