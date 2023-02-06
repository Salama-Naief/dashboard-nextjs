import { Paper, ScrollArea, Text, Title } from "@mantine/core";
import React from "react";
import { lineData, lineChartData } from "../../utils/chartsData";
import LineChart from "../../components/charts/LineChart";
import Layout from "../../components/Layout";

function Line() {
  return (
    <Layout>
      <Paper px="sm" py="md" style={{ height: "88%" }}>
        <Text fz={"xl"} fw={600} color={"gray.6"}>
          Chart
        </Text>
        <Title order={1}>Line</Title>

        <LineChart
          data={lineChartData}
          lables={false}
          area={false}
          dashboard={false}
        />
      </Paper>
    </Layout>
  );
}

export default Line;
