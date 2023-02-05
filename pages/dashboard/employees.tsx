import { Avatar, Flex, Paper, Text, TextInput, Title } from "@mantine/core";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";
import sortBy from "lodash/sortBy";

import Layout from "../../components/Layout";

import { employeesData, employeesGrid } from "../../utils/data/dummy";
import { BiSearch } from "react-icons/bi";

const PAGE_SIZE = 10;
const initialRecords = employeesData.slice(0, 100);
function Employees() {
  const [query, setQuery] = useState("");
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "Name",
    direction: "asc",
  });
  // const [records, setRecords] = useState(sortBy(ordersData, "CustomerName"));

  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(employeesData.slice(0, PAGE_SIZE));
  const [debouncedQuery] = useDebouncedValue(query, 200);

  //search useeffect hook
  useEffect(() => {
    setRecords(
      initialRecords.filter(({ Name, Country, Title, ReportsTo }) => {
        if (
          debouncedQuery !== "" &&
          !`${Name} ${Country} ${Title} ${ReportsTo}`
            .toLowerCase()
            .includes(debouncedQuery.trim().toLowerCase())
        ) {
          return false;
        }
        return true;
      })
    );
  }, [debouncedQuery]);

  //pagination useeffect hook
  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(employeesData.slice(from, to));
  }, [page]);

  //sorting useeffect hook
  useEffect(() => {
    const data = sortBy(employeesData, sortStatus.columnAccessor);
    setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
  }, [sortStatus]);
  return (
    <Layout>
      <Paper sx={{ height: "100vh" }} px="sm" py="md">
        <div className="p-4">
          <Text fz={"xl"} fw={600} color={"gray.6"}>
            Page
          </Text>
          <Title order={1}>Employees</Title>
        </div>
        <TextInput
          sx={{ flexBasis: "60%" }}
          placeholder="Search employees..."
          icon={<BiSearch size={16} />}
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          my="sm"
        />
        <DataTable
          withBorder
          highlightOnHover
          fontSize="md"
          records={records}
          onRowClick={(order, rowIndex) => console.log("row", order, rowIndex)}
          columns={[
            {
              accessor: "Employee",
              sortable: true,
              textAlignment: "center",
              title: <Text mr="xs">Employee</Text>,
              render: (employees: any) => (
                <Flex align={"center"} gap="xs">
                  <Avatar
                    radius={"xl"}
                    size="md"
                    src={employees.EmployeeImage.src}
                    alt={employees.Name}
                  />
                  <Text>{employees.Name}</Text>
                </Flex>
              ),
            },
            {
              accessor: "Designation",
              textAlignment: "center",
              sortable: true,
              title: <Text mr="xs">Designation</Text>,
              render: (employees: any) => (
                <Text tt={"capitalize"}>{employees.Title}</Text>
              ),
            },
            {
              accessor: "Country",
              textAlignment: "center",
              sortable: true,
              title: <Text mr="xs">Country</Text>,
              render: (employees: any) => (
                <Text tt={"capitalize"}>{employees.Country}</Text>
              ),
            },

            {
              accessor: "HireDate",
              textAlignment: "center",
              sortable: true,
              title: <Text mr="xs">HireDate</Text>,
              render: (employees: any) => (
                <Text tt={"capitalize"}>{employees.HireDate}</Text>
              ),
            },

            {
              accessor: "ReportsTo",
              textAlignment: "center",
              sortable: true,
              title: <Text mr="xs">ReportsTo</Text>,
              render: (employees: any) => (
                <Text tt={"capitalize"}>{employees.ReportsTo}</Text>
              ),
            },
            {
              accessor: "EmployeeID",
              textAlignment: "center",
              sortable: true,
              title: <Text mr="xs">EmployeeID</Text>,
              render: (employees: any) => (
                <Text tt={"capitalize"}>{employees.EmployeeID}</Text>
              ),
            },
          ]}
          sortStatus={sortStatus}
          onSortStatusChange={setSortStatus}
          totalRecords={employeesData.length}
          recordsPerPage={PAGE_SIZE}
          page={page}
          onPageChange={(p) => setPage(p)}
        />
      </Paper>
    </Layout>
  );
}
export default Employees;
