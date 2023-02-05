import {
  Badge,
  Button,
  Center,
  Flex,
  Grid,
  Group,
  Paper,
  ScrollArea,
  SimpleGrid,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import Head from "next/head";
import Image from "next/image";
import { BsCurrencyDollar } from "react-icons/bs";

import Layout from "../../components/Layout";
import StackedChart from "../../components/charts/StackedChart";
import { earningData } from "../../utils/data/dummy";
import {
  stackedChartData,
  SparklineAreaData,
  pieChartData,
  ecomPieChartData,
  ecomPieChartFill,
} from "../../utils/chartsData";
import LineChart from "../../components/charts/LineChart";
import PieChart from "../../components/charts/PieChart";

interface Props {
  icon: React.ReactElement;
  amount: String;
  name: string;
  percentage: String;
  iconColor: String;
  pcColor: String;
}

function CardData({
  icon,
  amount,
  name,
  percentage,
  iconColor,
  pcColor,
}: Props) {
  console.log("pcColor", pcColor);
  return (
    <Paper shadow="sm" radius="md" p="xl">
      <ThemeIcon
        variant="light"
        radius="xl"
        size={50}
        color={`${iconColor}`}
        my="md"
      >
        {icon}
      </ThemeIcon>
      <Flex align={"center"} gap="xs">
        <Text fz={"xl"} fw={600}>
          {amount}
        </Text>
        <Text color={`${pcColor}`}>{percentage}</Text>
      </Flex>
      <Text fz={"lg"} color={"gray.6"}>
        {name}
      </Text>
    </Paper>
  );
}
function Home() {
  return (
    <Layout>
      <ScrollArea
        p="md"
        style={{ height: "100%" }}
        offsetScrollbars
        scrollbarSize={8}
      >
        {/**top boxs */}
        <Grid>
          <Grid.Col md={3} lg={3}>
            <Paper shadow="sm" radius="md" p="xl">
              <Flex justify={"space-between"} my="sm" align={"center"}>
                <div>
                  <Text fw={800} fz="md">
                    Earnings
                  </Text>
                  <Text fz={"xl"} fw={600}>
                    $63,448.78
                  </Text>
                </div>
                <ThemeIcon
                  variant="light"
                  radius="xl"
                  size={50}
                  color={`blue`}
                  my="md"
                >
                  <BsCurrencyDollar size={32} />
                </ThemeIcon>
              </Flex>
              <Button variant="outline" color={"blue"}>
                Downlaod
              </Button>
            </Paper>
          </Grid.Col>
          <Grid.Col md={9} lg={9}>
            <SimpleGrid
              breakpoints={[
                { maxWidth: 980, cols: 4, spacing: "md" },
                { maxWidth: 755, cols: 3, spacing: "sm" },
                { maxWidth: 600, cols: 2, spacing: "sm" },
              ]}
              cols={4}
              spacing={"md"}
            >
              {earningData.map((item, index) => (
                <div key={index}>
                  <CardData
                    name={item.title}
                    amount={item.amount}
                    percentage={item.percentage}
                    pcColor={item.pcColor}
                    icon={item.icon}
                    iconColor={item.iconColor}
                  />
                </div>
              ))}
            </SimpleGrid>
          </Grid.Col>
        </Grid>
        {/**data analysis */}
        <Grid columns={12} style={{ height: "fit" }} py="xl">
          <Grid.Col sm={12} md={8}>
            <Paper p={"lg"} radius="sm">
              <Flex justify={"space-between"}>
                <Title order={3}>Revenue Updates</Title>
                <Group>
                  <Badge color="dark" size="lg" radius="md" variant="dot">
                    Expense
                  </Badge>
                  <Badge color="green" size="lg" radius="md" variant="dot">
                    Budget
                  </Badge>
                </Group>
              </Flex>
              {/**frist box */}
              <Grid p={"sm"}>
                <Grid.Col sm={12} md={12} lg={6}>
                  <div className="my-6">
                    <Flex gap={"xs"} align="center">
                      <Title order={2}>$93,438</Title>
                      <Badge color="green" size="lg" variant="filled">
                        23%
                      </Badge>
                    </Flex>
                    <Text my={"xs"} fz={"lg"} fw={500} color="gray.7">
                      Budget
                    </Text>
                  </div>
                  <div className="my-6">
                    <Title order={2}>$48,487</Title>
                    <Text my={"xs"} fz={"lg"} fw={500} color="gray.7">
                      Expense
                    </Text>
                  </div>
                  {/**line chart  */}
                  <div className="h-48 ">
                    <LineChart dashboard={true} data={SparklineAreaData} />
                  </div>
                  <Button variant="outline" mt={"lg"}>
                    Downlaod Report
                  </Button>
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={6}>
                  {/**stcked chart */}
                  <div className="h-72 md:h-full">
                    <StackedChart data={stackedChartData[0]} Earnings={false} />
                  </div>
                </Grid.Col>
              </Grid>
            </Paper>
          </Grid.Col>
          {/**second box */}
          <Grid.Col sm={12} md={4}>
            <Paper p={"lg"} radius="sm" bg={"blue.6"}>
              <Flex justify={"space-between"}>
                <Title order={2}>Earnings</Title>
                <div>
                  <Title order={2}>$63,448.78</Title>
                  <Text>Monthly revenue</Text>
                </div>
              </Flex>
              <div className="h-36">
                <StackedChart data={stackedChartData[1]} Earnings={true} />
              </div>
            </Paper>
            <Paper mt="md" p={"sm"}>
              <Flex justify={"space-between"}>
                <div>
                  <Title order={2}>$43,246</Title>
                  <Text>Yearly sales</Text>
                </div>
              </Flex>
              <div className="h-56">
                <PieChart
                  data={ecomPieChartData}
                  fill={ecomPieChartFill}
                  dashbaord={true}
                />
              </div>
            </Paper>
          </Grid.Col>
        </Grid>
      </ScrollArea>
    </Layout>
  );
}
export default Home;
