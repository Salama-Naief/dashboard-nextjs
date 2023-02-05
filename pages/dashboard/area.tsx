import { Paper, ScrollArea, Text, Title } from "@mantine/core";
import React from "react";
import { areaChartData } from "../../utils/chartsData";
import AreaChart from "../../components/charts/AreaChart";
import Layout from "../../components/Layout";

function Area() {
  return (
    <Layout>
      <Paper px="sm" py="md" style={{ height: "85vh" }}>
        <Text fz={"xl"} fw={600} color={"gray.6"}>
          Chart
        </Text>
        <Title order={1}>Area</Title>

        <AreaChart data={areaChartData} />
      </Paper>
    </Layout>
  );
}

export default Area;
