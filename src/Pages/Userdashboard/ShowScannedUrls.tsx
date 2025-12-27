import { useScannedUrls } from "../../Services/scan.hook";
import ScanCardsGrid from "../../components/Userdashboard/ScanCardsGrid";

const ShowScannedUrls: React.FC = () => {
  const { data } = useScannedUrls();
  console.log(data, "Scanned data show scaned urls");
  //   //  {
  //   //   title: "File",
  //   //   dataIndex: "fileName",
  //   //   key: "fileName",
  //   //   render: (_: string, record: DataType & { originalFileUrl?: string; originalUrl?: string }) => {
  //   //     const fileName = record.fileName || record.originalUrl || "Unknown File";  // Default if fileName is missing
  //   //     // Check if file_url is not null, otherwise use url
  //   //     const fileUrl = record.originalFileUrl || record.originalUrl || "#";

  //   //     return (
  //   //       <a
  //   //         href={fileUrl}
  //   //         target="_blank"
  //   //         rel="noopener noreferrer"
  //   //         style={{
  //   //           display: "flex",
  //   //           alignItems: "center",
  //   //           gap: 8,
  //   //           color: "#111315",
  //   //           fontFamily: "inter, sans-serif",
  //   //           fontSize: "19.1px",
  //   //           fontStyle: "normal",
  //   //           fontWeight: 400,
  //   //           lineHeight: "normal",
  //   //           textDecoration: "underline",
  //   //         }}
  //   //       >
  //   //         <FileOutlined style={{ fontSize: "20px" }} />
  //   //         {fileName}
  //   //       </a>
  //   //     );
  //   //   },
  //   //   onHeaderCell: () => ({ id: "fileName" }),
  //   //   onCell: () => ({ id: "fileName" }),
  //   // },

  //     {
  //       title: "Date",
  //       dataIndex: "date",
  //       key: "date",
  //       render: (date: string) => (
  //         <span
  //           style={{
  //             color: "#111315",
  //             fontSize: "19px",
  //             fontStyle: "popins",
  //           }}
  //         >
  //           {date}
  //         </span>
  //       ),
  //       onHeaderCell: () => ({ id: "date" }),
  //       onCell: () => ({ id: "date" }),
  //     },

  //     {
  //       title: "Status",
  //       dataIndex: "status",
  //       key: "status",
  //       render: (status: string) => (
  //         <span
  //           style={{
  //             color: "#111315",
  //             fontSize: "19px",
  //             fontStyle: "popins",
  //             fontWeight: "500",
  //           }}
  //         >
  //           {status}
  //         </span>
  //       ),
  //       onHeaderCell: () => ({ id: "status" }),
  //       onCell: () => ({ id: "status" }),
  //     },
  // {
  //   title: "",
  //   key: "delete",
  //   render: (_: any, record: DataType) => (
  //     <Button
  //       danger
  //       type="text"
  //       icon={<DeleteOutlined style={{ color: "red", fontSize: 18 }} />}
  //       onClick={() => handleDelete(record.key)}
  //       style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
  //     />
  //   ),
  //   onHeaderCell: () => ({ id: "delete" }),
  //   onCell: () => ({ id: "delete" }),
  // }
  //   ]);

  // const sensors = useSensors(
  //   useSensor(PointerSensor, { activationConstraint: { distance: 1 } })
  // );

  // const onDragEnd = ({ active, over }: DragEndEvent) => {
  //   if (active.id !== over?.id) {
  //     const newColumns = arrayMove(
  //       columns,
  //       columns.findIndex((i) => i.key === active.id),
  //       columns.findIndex((i) => i.key === over?.id)
  //     );
  //     if (newColumns !== columns) {
  //       setColumns(newColumns); // Update state only if columns have actually changed
  //     }
  //   }
  // };

  // const onDragOver = ({ active, over }: DragOverEvent) => {
  //   const activeIndex = columns.findIndex((i) => i.key === active.id);
  //   const overIndex = columns.findIndex((i) => i.key === over?.id);
  //   setDragIndex({
  //     active: active.id,
  //     over: over?.id,
  //     direction: overIndex > activeIndex ? "right" : "left",
  //   });
  // };

  return (
    <>
      <ScanCardsGrid data={data || []} />
    </>
  );
};

export default ShowScannedUrls;
