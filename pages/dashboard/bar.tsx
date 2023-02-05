import { Paper, ScrollArea, Text, Title } from "@mantine/core";
import React from "react";
import { barChartData } from "../../utils/chartsData";
import BarChart from "../../components/charts/BarChart";
import Layout from "../../components/Layout";

function Area() {
  return (
    <Layout>
      <Paper px="sm" py="md" style={{ height: "100vh" }}>
        <Text fz={"xl"} fw={600} color={"gray.6"}>
          Chart
        </Text>
        <Title order={1}>Bar</Title>

        <BarChart data={barChartData} />
      </Paper>
    </Layout>
  );
}

export default Area;
