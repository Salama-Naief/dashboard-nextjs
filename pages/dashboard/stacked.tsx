import { Paper, ScrollArea, Text, Title } from "@mantine/core";
import React from "react";
import {
  areaChartData,
  lineChartData,
  stackedChart,
  stackedChartData,
} from "../../utils/chartsData";
import Layout from "../../components/Layout";
import StackedChart from "../../components/charts/StackedChart";

function Stacked() {
  return (
    <Layout>
      <Paper px="sm" py="md" style={{ height: "85vh" }}>
        <Text fz={"xl"} fw={600} color={"gray.6"}>
          Chart
        </Text>
        <Title order={1}>Stacked</Title>

        <StackedChart
          data={stackedChart}
          stackedChart={true}
          Earnings={false}
        />
      </Paper>
    </Layout>
  );
}

export default Stacked;
