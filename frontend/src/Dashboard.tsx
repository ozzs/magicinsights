import { Card, BarChart, DonutChart, Title } from "@tremor/react";
import GridLayout from "react-grid-layout";
import { ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 1 },
    { i: "b", x: 1, y: 0, w: 1, h: 1 },
    { i: "c", x: 2, y: 0, w: 1, h: 1 },
  ];

  const chartdata = [
    {
      name: "Amphibians",
      "Number of threatened species": 2488,
    },
    {
      name: "Birds",
      "Number of threatened species": 1445,
    },
    {
      name: "Crustaceans",
      "Number of threatened species": 743,
    },
  ];

  const cities = [
    {
      name: "New York",
      sales: 9800,
    },
    {
      name: "London",
      sales: 4567,
    },
    {
      name: "Hong Kong",
      sales: 3908,
    },
    {
      name: "San Francisco",
      sales: 2400,
    },
    {
      name: "Singapore",
      sales: 1908,
    },
    {
      name: "Zurich",
      sales: 1398,
    },
  ];

  return (
    <div className="p-4 flex justify-center">
      <GridLayout
        className="items-center w-[1200px]"
        layout={layout}
        cols={2}
        rowHeight={400}
        width={1200}
        isResizable={false}
      >
        <Card key="a">
          <Title>Chart 1</Title>
          <ResponsiveContainer>
            <BarChart
              className="h-[95%]"
              data={chartdata}
              index="name"
              categories={["Number of threatened species"]}
              colors={["blue"]}
            />
          </ResponsiveContainer>
        </Card>
        <Card key="b">
          <Title>Chart 2</Title>
          <ResponsiveContainer>
            <BarChart
              className="h-[95%]"
              data={chartdata}
              index="name"
              categories={["Number of threatened species"]}
              colors={["blue"]}
            />
          </ResponsiveContainer>
        </Card>
        <Card key="c">
          <Title>Chart 3</Title>
          <ResponsiveContainer>
            <DonutChart
              className="h-[95%]"
              variant="pie"
              data={cities}
              category="sales"
              index="name"
              colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
            />
          </ResponsiveContainer>
        </Card>
      </GridLayout>
    </div>
  );
}
