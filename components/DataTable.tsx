import {
  Box,
  Button,
  createStyles,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";

import { showNotification } from "@mantine/notifications";

import dayjs from "dayjs";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useState } from "react";

import { employeesData } from "../utils/data/dummy";

const useStyles = createStyles((theme) => ({
  modal: { width: 300 },
  modalTitle: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    fontWeight: 700,
  },
  modalLabel: { width: 80 },
}));

const PAGE_SIZE = 100;

export default function ComplexUsageExample() {
  const [page, setPage] = useState(1);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "name",
    direction: "asc",
  });

  const handleSortStatusChange = (status: DataTableSortStatus) => {
    setPage(1);
    setSortStatus(status);
  };

  const [selectedRecords, setSelectedRecords] = useState<any[]>([]);

  const {
    breakpoints: { xs: xsBreakpoint },
  } = useMantineTheme();
  const aboveXsMediaQuery = `(min-width: ${xsBreakpoint}px)`;

  const { classes } = useStyles();
  const now = dayjs();

  return (
    // place the data table in a height-restricted container to make it vertically-scrollable
    <Box sx={{ height: 320 }}>
      <DataTable
        withBorder
        borderRadius="sm"
        withColumnBorders
        striped
        verticalAlignment="top"
        columns={[
          {
            accessor: "name",
            width: 150,
            ellipsis: true,
            sortable: true,
            render: ({ firstName, lastName }) => `${firstName} ${lastName}`,
          },
          {
            accessor: "email",
            sortable: true,
            visibleMediaQuery: aboveXsMediaQuery,
          },
          {
            accessor: "department.company.name",
            title: "Company",
            width: 150,
            sortable: true,
            visibleMediaQuery: aboveXsMediaQuery,
          },
          {
            accessor: "department.name",
            title: "Department",
            width: 130,
            sortable: true,
            visibleMediaQuery: aboveXsMediaQuery,
          },
          {
            accessor: "age",
            width: 80,
            textAlignment: "right",
            sortable: true,
            render: ({ birthDate }) => now.diff(birthDate, "years"),
          },
        ]}
        records={employeesData}
        page={page}
        onPageChange={setPage}
        totalRecords={employeesData.length}
        recordsPerPage={PAGE_SIZE}
        sortStatus={sortStatus}
        onSortStatusChange={handleSortStatusChange}
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
      />
    </Box>
  );
}
