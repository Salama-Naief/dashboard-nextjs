import { Paper, ScrollArea, Text, Title } from "@mantine/core";
import React from "react";
import { pieChartData } from "../../utils/chartsData";
import PieChart from "../../components/charts/PieChart";
import Layout from "../../components/Layout";

function Pie() {
  return (
    <Layout>
      <Paper px="sm" py="md" style={{ height: "100vh" }}>
        <Text fz={"xl"} fw={600} color={"gray.6"}>
          Chart
        </Text>
        <Title order={1}>Pie</Title>

        <PieChart data={pieChartData} dashbaord={false} fill={false} />
      </Paper>
    </Layout>
  );
}

export default Pie;
