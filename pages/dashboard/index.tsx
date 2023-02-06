import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  Group,
  HoverCard,
  Paper,
  Popover,
  ScrollArea,
  SimpleGrid,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import Head from "next/head";
import Image from "next/image";
import { BsCurrencyDollar } from "react-icons/bs";
import Product9 from "../../utils/data/product9.jpg";
import Layout from "../../components/Layout";
import StackedChart from "../../components/charts/StackedChart";
import {
  earningData,
  medicalproBranding,
  recentTransactions,
  weeklyStats,
} from "../../utils/data/dummy";
import {
  stackedChartData,
  SparklineAreaData,
  pieChartData,
  ecomPieChartData,
  ecomPieChartFill,
  lineChartData,
} from "../../utils/chartsData";
import LineChart from "../../components/charts/LineChart";
import PieChart from "../../components/charts/PieChart";
import { IoIosMore } from "react-icons/io";
import AreaChart from "../../components/charts/AreaChart";

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
                    <LineChart
                      lables={false}
                      dashboard={true}
                      data={SparklineAreaData}
                      area={false}
                    />
                  </div>
                  <Button variant="outline" mt={"lg"}>
                    Downlaod Report
                  </Button>
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={6}>
                  {/**stcked chart */}
                  <div className="h-72 md:h-full">
                    <StackedChart
                      stackedChart={false}
                      data={stackedChartData[0]}
                      Earnings={false}
                    />
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
                <StackedChart
                  stackedChart={false}
                  data={stackedChartData[1]}
                  Earnings={true}
                />
              </div>
            </Paper>
            <Paper mt="md" p={"md"}>
              <Flex justify={"space-between"}>
                <div>
                  <Title order={2}>$43,246</Title>
                  <Text>Yearly sales</Text>
                </div>
              </Flex>
              <div className="h-52">
                <PieChart
                  data={ecomPieChartData}
                  fill={ecomPieChartFill}
                  dashbaord={true}
                />
              </div>
            </Paper>
          </Grid.Col>
        </Grid>
        {/**last transaction secion */}
        <Grid align={"stretch"}>
          <Grid.Col sm={12} md={12} lg={4}>
            <Paper radius={"md"} p="xl">
              <Title order={3}>Recent Transactions</Title>
              {recentTransactions.map((item, index) => (
                <Flex
                  key={index}
                  align="center"
                  justify={"space-between"}
                  my="xl"
                >
                  <Flex align={"center"} gap={"sm"}>
                    <div
                      className="p-2 rounded-md"
                      style={{
                        backgroundColor: item.iconBg,
                        color: item.iconColor,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <Title order={5}>{item.title}</Title>
                      <Text>{item.desc}</Text>
                    </div>
                  </Flex>
                  <div className={`${item.pcColor}`}>{item.amount}</div>
                </Flex>
              ))}
              <Divider />
              <Flex align={"center"} justify={"space-between"} mt="md">
                <Button variant="outline">Add</Button>
                <Text>36 Recent Transactions</Text>
              </Flex>
            </Paper>
          </Grid.Col>
          <Grid.Col sm={12} md={12} lg={8} style={{ minHeight: 200 }}>
            <Paper p={"xl"} h={518}>
              <Title order={3}>Sales Overview</Title>
              <div className="h-full relative">
                <LineChart
                  lables={true}
                  dashboard={false}
                  data={lineChartData}
                  area={false}
                />
              </div>
            </Paper>
          </Grid.Col>
        </Grid>
        {/**last section */}
        <Grid my={"xl"}>
          <Grid.Col sm={12} md={12} lg={4}>
            <Paper radius={"md"} p={"md"}>
              <Flex justify={"space-between"}>
                <Title order={4}>Weekly Stats</Title>
                <ActionIcon>
                  <IoIosMore size={18} />
                </ActionIcon>
              </Flex>
              {weeklyStats.map((item, index) => (
                <Flex
                  key={index}
                  align="center"
                  justify={"space-between"}
                  my="xl"
                >
                  <Flex align={"center"} gap={"sm"}>
                    <div
                      className="p-3 rounded-full"
                      style={{
                        backgroundColor: item.iconBg,
                        color: "white",
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <Title order={5}>{item.title}</Title>
                      <Text>{item.desc}</Text>
                    </div>
                  </Flex>
                  <div className={`${item.pcColor}`}>{item.amount}</div>
                </Flex>
              ))}
              <div className="h-36">
                <LineChart
                  data={SparklineAreaData}
                  dashboard={true}
                  lables={false}
                  area={true}
                />
              </div>
            </Paper>
          </Grid.Col>
          <Grid.Col sm={12} md={12} lg={4}>
            <Paper radius={"md"} p={"md"} h="100%">
              <Flex justify={"space-between"}>
                <Title order={4}>MedicalPro Branding</Title>
                <ActionIcon>
                  <IoIosMore size={18} />
                </ActionIcon>
              </Flex>
              <div className="px-3 py-1 rounded-full bg-orange-500 text-white w-fit text-sm my-6">
                {new Date().toDateString()}
              </div>
              <Group spacing={"md"}>
                {medicalproBranding.data.map((item, index) => (
                  <div key={index} className="h-fit">
                    <Group>
                      <div>
                        <Text color={"gray.7"}>{item.title}</Text>
                        <Text fw={500}>{item.desc}</Text>
                      </div>
                      <Divider orientation="vertical" />
                    </Group>
                  </div>
                ))}
              </Group>
              <Divider orientation="horizontal" />
              <Title order={4} my="sm">
                Teams
              </Title>
              <Group>
                {medicalproBranding.teams.map((item, index) => (
                  <div
                    key={index}
                    className="px-3  w-fit text-white rounded-full text-sm"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.name}
                  </div>
                ))}
              </Group>
              <Divider my={"md"} />
              <Title order={4} my="sm">
                Leaders
              </Title>
              <Group>
                {medicalproBranding.leaders.map((item, index) => (
                  <Popover width={200} position="bottom" withArrow shadow="md">
                    <Popover.Target>
                      <Avatar
                        src={item.image.src}
                        key={index}
                        radius="xl"
                        style={{ cursor: "pointer" }}
                      />
                    </Popover.Target>
                    <Popover.Dropdown>
                      <Text size="sm">
                        This is uncontrolled popover, it is opened when button
                        is clicked
                      </Text>
                    </Popover.Dropdown>
                  </Popover>
                ))}
              </Group>
              <div className="flex items-center my-4 -space-x-3">
                {medicalproBranding.leaders.map((item, index) => (
                  <Popover width={200} position="bottom" withArrow shadow="md">
                    <Popover.Target>
                      <div
                        key={index}
                        className="border border-blue-600 rounded-full cursor-pointer"
                      >
                        <Avatar src={item.image.src} radius="xl" />
                      </div>
                    </Popover.Target>
                    <Popover.Dropdown>
                      <Text size="sm">
                        This is uncontrolled popover, it is opened when button
                        is clicked
                      </Text>
                    </Popover.Dropdown>
                  </Popover>
                ))}
              </div>
              <Divider my={"md"} />
              <Flex align={"center"} justify={"space-between"} mt="md">
                <Button variant="outline">Add</Button>
                <Text>36 Recent Transactions</Text>
              </Flex>
            </Paper>
          </Grid.Col>
          <Grid.Col sm={12} md={12} lg={4}>
            <Paper radius={"md"} p={"md"} h="100%">
              <Flex justify={"space-between"}>
                <Title order={4}>Daily Activities</Title>
                <ActionIcon>
                  <IoIosMore size={18} />
                </ActionIcon>
              </Flex>
              <div className="rounded-lg overflow-hidden my-6">
                <Image src={Product9} alt="" />
              </div>
              <Title order={4}>React 18 coming soon!</Title>
              <Text color={"gray.6"}>By Johnathan Doe</Text>
              <Text my={"md"} fz="sm" color={"gray.6"}>
                This will be the small description for the news you have shown
                here. There could be some great info
              </Text>
              <Button variant="outline">Reed More</Button>
            </Paper>
          </Grid.Col>
        </Grid>
      </ScrollArea>
    </Layout>
  );
}
export default Home;
