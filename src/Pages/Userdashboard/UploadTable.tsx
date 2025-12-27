/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, createContext, useContext, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  type DragEndEvent,
  type DragOverEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { Table, Button, } from "antd";
import { DeleteOutlined, FileOutlined, } from "@ant-design/icons";
import { useDeleteScannedFile, useGetAllScanned } from "../../Services/scan.hook";

export interface DataType {
  key: string;
  fileName: string | undefined;
  date: string | null;
  status: string;
  saved: boolean;
  originalFileUrl?: string;
  originalUrl?: string;
}



export interface ScanfilesDataType {
  key: string;
  id: number;
  user_id: number;
  analysis_id: string;
  file_url: string | null;
  url: string | null;
  type: string | null;
  uploaded_at: string | null;
  risk_score: string | null;
  status: string | null;
  created_at: string;
  updated_at: string;
}

interface HeaderCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  id: string;
}
interface BodyCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  id: string;
}

interface DragIndexState {
  active: UniqueIdentifier;
  over: UniqueIdentifier | undefined;
  direction?: "left" | "right";
}

const DragIndexContext = createContext<DragIndexState>({
  active: -1,
  over: -1,
});

const dragActiveStyle = (dragState: DragIndexState, id: string) => {
  const { active, over, direction } = dragState;
  let style: React.CSSProperties = {};
  if (active && active === id) {
    style = { backgroundColor: "gray", opacity: 0.5 };
  } else if (over && id === over && active !== over) {
    style =
      direction === "right"
        ? { borderRight: "1px dashed gray" }
        : { borderLeft: "1px dashed gray" };
  }
  return style;
};

const TableBodyCell: React.FC<BodyCellProps> = (props) => {
  const dragState = useContext(DragIndexContext);
  return (
    <td
      {...props}
      style={{ ...props.style, ...dragActiveStyle(dragState, props.id) }}
    />
  );
};

const TableHeaderCell: React.FC<HeaderCellProps> = (props) => {
  const dragState = useContext(DragIndexContext);
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({
    id: props.id,
  });
  const style: React.CSSProperties = {
    ...props.style,
    cursor: "move",
    ...(isDragging
      ? { position: "relative", zIndex: 9999, userSelect: "none" }
      : {}),
    ...dragActiveStyle(dragState, props.id),
  };
  return (
    <th
      {...props}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    />
  );
};

const UploadTable: React.FC = () => {

  const [dragIndex, setDragIndex] = useState<DragIndexState>({
    active: -1,
    over: -1,
  });


  const { data, refetch } = useGetAllScanned(); 
  console.log(data, "Scanned data from API");

  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const { mutate: deleteFile } = useDeleteScannedFile(); 

  useEffect(() => {
    if (data?.length === 0) return; 


const formattedData: DataType[] = data?.map((item) => {
  const fileName = item.file_url?.split("/").pop() || item?.url?.split("/").pop();
  return {
    key: item.id.toString(),
    fileName: fileName,
    date: item.uploaded_at,
    status: item.status === "completed" ? "Scanned" : "Pending",
    saved: false,
    originalFileUrl: item.file_url || undefined,
    originalUrl: item.url || undefined,
  };
}) ?? [];

    setDataSource(formattedData); 
  }, [data]);


  const handleDelete = async (key: string) => {
    try {
      await deleteFile(parseInt(key));
      refetch(); 
    } catch (error) {
      console.error("Error deleting the file:", error);
    }
  };
  
  const [columns, setColumns] = useState(() => [
   {
    title: "File",
    dataIndex: "fileName",
    key: "fileName",
    render: (_: string, record: DataType & { originalFileUrl?: string; originalUrl?: string }) => {
      const fileName = record.fileName || record.originalUrl || "Unknown File";  // Default if fileName is missing
      // Check if file_url is not null, otherwise use url
      const fileUrl = `${import.meta.env.VITE_SITE_URL}/${
        record.originalFileUrl || record.originalUrl || "#"
      }`;

      return (
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "#111315",
            fontFamily: "inter, sans-serif",
            fontSize: "19.1px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
            textDecoration: "underline",
          }}
        >
          <FileOutlined style={{ fontSize: "20px" }} />
          {fileName}
        </a>
      );
    },
    onHeaderCell: () => ({ id: "fileName" }),
    onCell: () => ({ id: "fileName" }),
  },



    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => (
        <span
          style={{
            color: "#111315",
            fontSize: "19px",
            fontStyle: "popins",
          }}
        >
          {date}
        </span>
      ),
      onHeaderCell: () => ({ id: "date" }),
      onCell: () => ({ id: "date" }),
    },


    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span
          style={{
            color: "#111315",
            fontSize: "19px",
            fontStyle: "popins",
            fontWeight: "500",
          }}
        >
          {status}
        </span>
      ),
      onHeaderCell: () => ({ id: "status" }),
      onCell: () => ({ id: "status" }),
    },

{
  title: "",
  key: "delete",
  render: (_: any, record: DataType) => (
    <Button
      danger
      type="text"
      icon={<DeleteOutlined style={{ color: "red", fontSize: 18 }} />}
      onClick={() => handleDelete(record.key)}
      
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    />
  ),
  onHeaderCell: () => ({ id: "delete" }),
  onCell: () => ({ id: "delete" }),
}
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 1 } })
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const newColumns = arrayMove(
        columns,
        columns.findIndex((i) => i.key === active.id),
        columns.findIndex((i) => i.key === over?.id)
      );
      if (newColumns !== columns) {
        setColumns(newColumns); 
      }
    }
  };

  const onDragOver = ({ active, over }: DragOverEvent) => {
    const activeIndex = columns.findIndex((i) => i.key === active.id);
    const overIndex = columns.findIndex((i) => i.key === over?.id);
    setDragIndex({
      active: active.id,
      over: over?.id,
      direction: overIndex > activeIndex ? "right" : "left",
    });
  };

  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      collisionDetection={closestCenter}
    >
      <SortableContext
        items={columns.map((c) => c.key)}
        strategy={horizontalListSortingStrategy}
      >
        <DragIndexContext.Provider value={dragIndex}>
          <div className="w-full overflow-x-auto">
            <div className="min-w-[1000px]">
              <Table
                rowKey="key"
                dataSource={dataSource}
                columns={columns}
                components={{
                  header: { cell: TableHeaderCell },
                  body: { cell: TableBodyCell },
                }}
              />
            </div>
          </div>
        </DragIndexContext.Provider>
      </SortableContext>
      <DragOverlay>
        <th style={{ backgroundColor: "gray", padding: 16 }}>
          {
            columns[columns.findIndex((i) => i.key === dragIndex.active)]
              ?.title as React.ReactNode
          }
        </th>
      </DragOverlay>
    </DndContext>
  );
};

export default UploadTable;
