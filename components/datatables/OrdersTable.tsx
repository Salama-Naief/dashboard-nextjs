import { Box, Paper, Text, Title } from "@mantine/core";

import sortBy from "lodash/sortBy";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ordersData } from "../../utils/data/dummy";

const PAGE_SIZE = 10;

export default function SortingExample() {
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "CustomerName",
    direction: "asc",
  });
  // const [records, setRecords] = useState(sortBy(ordersData, "CustomerName"));

  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(ordersData.slice(0, PAGE_SIZE));

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(ordersData.slice(from, to));
  }, [page]);

  useEffect(() => {
    const data = sortBy(ordersData, sortStatus.columnAccessor);
    setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
  }, [sortStatus]);

  return (
    <Paper sx={{ height: "100vh" }} px="sm" py="md">
      <div className="p-4">
        <Text fz={"xl"} fw={600} color={"gray.6"}>
          Page
        </Text>
        <Title order={1}>Orders</Title>
      </div>
      <DataTable
        withBorder
        highlightOnHover
        fontSize="md"
        records={records}
        onRowClick={(order, rowIndex) => console.log("row", order, rowIndex)}
        columns={[
          {
            accessor: "ProductImage",
            textAlignment: "center",
            title: <Text mr="xs">Image</Text>,
            render: (orderData: any) => (
              <div className="relative w-20 h-20 mx-auto">
                <Image
                  src={orderData.ProductImage}
                  alt=""
                  layout="fill"
                  className="rounded mx-auto"
                  objectFit="cover"
                  objectPosition="center"
                />
              </div>
            ),
          },
          {
            accessor: "OrderItems",
            textAlignment: "center",
            sortable: true,
            title: <Text mr="xs">OrderItems</Text>,
            render: (orderData: any) => (
              <Text tt={"capitalize"}>{orderData.OrderItems}</Text>
            ),
          },
          {
            accessor: "CustomerName",
            textAlignment: "center",
            sortable: true,
            title: <Text mr="xs">CustomerName</Text>,
            render: (orderData: any) => (
              <Text tt={"capitalize"}>{orderData.CustomerName}</Text>
            ),
          },

          {
            accessor: "TotalAmount",
            textAlignment: "center",
            sortable: true,
            title: <Text mr="xs">TotalAmount</Text>,
            render: (orderData: any) => (
              <Text fw={500} tt={"capitalize"}>
                ${orderData.TotalAmount}
              </Text>
            ),
          },

          {
            accessor: "Status",
            textAlignment: "center",
            sortable: true,
            title: <Text mr="xs">Status</Text>,
            render: (orderData: any) => (
              <Text
                tt={"capitalize"}
                style={{ backgroundColor: orderData.StatusBg, color: "white" }}
                className="rounded-lg px-2 py-1 w-fit"
              >
                {orderData.Status}
              </Text>
            ),
          },
          {
            accessor: "OrderID",
            textAlignment: "center",
            sortable: true,
            title: <Text mr="xs">OrderID</Text>,
            render: (orderData: any) => (
              <Text tt={"capitalize"}>{orderData.OrderID}</Text>
            ),
          },
          {
            accessor: "Location",
            textAlignment: "center",
            sortable: true,
            title: <Text mr="xs">Location</Text>,
            render: (orderData: any) => (
              <Text tt={"capitalize"}>{orderData.Location}</Text>
            ),
          },
        ]}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        totalRecords={ordersData.length}
        recordsPerPage={PAGE_SIZE}
        page={page}
        onPageChange={(p) => setPage(p)}
      />
    </Paper>
  );
}
