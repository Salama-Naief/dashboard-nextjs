import { Avatar, Flex, Paper, Text, TextInput, Title } from "@mantine/core";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";
import sortBy from "lodash/sortBy";

import Layout from "../../components/Layout";
import DataTables from "../../components/DataTable";

import { customersData, customersGrid } from "../../utils/data/dummy";
import { BiSearch } from "react-icons/bi";

const PAGE_SIZE = 10;
const initialRecords = customersData.slice(0, 100);

interface Customer {
  CustomerID: Number;
  CustomerName: String;
  CustomerEmail: String;
  CustomerImage: any;
  ProjectName: String;
  Status: String;
  StatusBg: String;
  Weeks: String;
  Budget: String;
  Location: String;
}

function Customers() {
  const [query, setQuery] = useState("");
  const [selectedRecords, setSelectedRecords] = useState<Customer[]>([]);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "Name",
    direction: "asc",
  });
  // const [records, setRecords] = useState(sortBy(ordersData, "CustomerName"));

  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(customersData.slice(0, PAGE_SIZE));
  //pagination useeffect hook
  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(customersData.slice(from, to));
  }, [page]);

  //sorting useeffect hook
  useEffect(() => {
    const data = sortBy(customersData, sortStatus.columnAccessor);
    setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
  }, [sortStatus]);
  return (
    <Layout>
      <Paper sx={{ height: "100vh" }} px="sm" py="md">
        <div className="p-4">
          <Text fz={"xl"} fw={600} color={"gray.6"}>
            Page
          </Text>
          <Title order={1}>Customers</Title>
        </div>

        <DataTable
          withBorder
          highlightOnHover
          records={records}
          onRowClick={(order, rowIndex) => console.log("row", order, rowIndex)}
          idAccessor="CustomerID"
          columns={[
            {
              accessor: "CustomerName",
              sortable: true,
              textAlignment: "center",
              title: <Text mr="xs">Name</Text>,
              render: (customers: any) => (
                <Flex align={"center"} gap="xs">
                  <Avatar
                    radius={"xl"}
                    size="md"
                    src={customers.CustomerImage.src}
                    alt={customers.Name}
                  />
                  <div>
                    <Text>{customers.CustomerName}</Text>
                    <Text>{customers.CustomerEmail}</Text>
                  </div>
                </Flex>
              ),
            },
            {
              accessor: "ProjectName",
              textAlignment: "center",
              sortable: true,
              title: <Text mr="xs">ProjectName</Text>,
              render: (customers: any) => (
                <Text tt={"capitalize"}>{customers.ProjectName}</Text>
              ),
            },
            {
              accessor: "Status",
              textAlignment: "center",
              sortable: true,
              title: <Text mr="xs">Status</Text>,
              render: (customers: any) => (
                <Flex align={"center"} gap="xs">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: customers.StatusBg }}
                  ></div>
                  <Text tt={"capitalize"}>{customers.Status}</Text>
                </Flex>
              ),
            },

            {
              accessor: "Weeks",
              textAlignment: "center",
              sortable: true,
              title: <Text mr="xs">Weeks</Text>,
              render: (customers: any) => (
                <Text tt={"capitalize"}>{customers.Weeks}</Text>
              ),
            },

            {
              accessor: "Budget",
              textAlignment: "center",
              sortable: true,
              title: "Budget",
              render: (customers: any) => (
                <Text tt={"capitalize"}>{customers.Budget}</Text>
              ),
            },
            {
              accessor: "Location",
              textAlignment: "center",
              sortable: true,
              title: <Text mr="xs">Location</Text>,
              render: (customers: any) => (
                <Text tt={"capitalize"}>{customers.Location}</Text>
              ),
            },
            {
              accessor: "CustomerID",
              textAlignment: "center",
              sortable: true,
              title: <Text mr="xs">CustomerID</Text>,
              render: (customers: any) => (
                <Text tt={"capitalize"}>{customers.CustomerID}</Text>
              ),
            },
          ]}
          sortStatus={sortStatus}
          onSortStatusChange={setSortStatus}
          totalRecords={customersData.length}
          recordsPerPage={PAGE_SIZE}
          page={page}
          onPageChange={(p) => setPage(p)}
          selectedRecords={selectedRecords}
          onSelectedRecordsChange={setSelectedRecords}
        />
      </Paper>
    </Layout>
  );
}
export default Customers;
