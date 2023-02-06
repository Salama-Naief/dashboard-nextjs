import { ResponsiveLine } from "@nivo/line";
import { useEffect, useState } from "react";

const LineChart = ({ data, dashboard, lables, area }) => {
  const [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {
    setScreenWidth(window.screen.width);
  }, []);
  return (
    <ResponsiveLine
      data={data}
      margin={{
        top: dashboard ? 10 : 50,
        right: dashboard | lables ? 30 : screenWidth > 768 ? 110 : 20,
        bottom: dashboard ? 10 : 100,
        left: dashboard ? 10 : 60,
      }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="monotoneX"
      axisTop={null}
      axisRight={null}
      enableArea={area ? true : false}
      axisBottom={
        area
          ? null
          : {
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: dashboard | lables ? "" : "transportation",
              legendOffset: dashboard | lables ? 0 : 36,
              legendPosition: "middle",
            }
      }
      axisLeft={
        dashboard
          ? null
          : {
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: dashboard | lables ? "" : "count",
              legendOffset: dashboard ? -10 : -40,
              legendPosition: "middle",
            }
      }
      enableGridX={false}
      enableGridY={dashboard ? false : true}
      colors={{ scheme: "category10" }}
      pointSize={7}
      pointColor={{ theme: "background" }}
      pointBorderWidth={dashboard ? 1 : 2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={
        dashboard | lables
          ? []
          : [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
      }
    />
  );
};

export default LineChart;
