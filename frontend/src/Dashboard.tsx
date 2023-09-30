import { Chart } from "@magicinsights/common/entities";
import { Card, BarChart, DonutChart, Title } from "@tremor/react";
import GridLayout from "react-grid-layout";
import { useMutation, useQuery } from "react-query";
import { ResponsiveContainer } from "recharts";
import { AddChartDialog } from "./AddChartDialog";

export default function Dashboard() {
  const { isLoading, data: charts } = useQuery({
    queryKey: ["getCharts"],
    queryFn: async function (): Promise<
      { chart: Chart; data: { name: string; value: string }[] }[]
    > {
      const res = await fetch("/api/charts");
      return res.json();
    },
  });

  const { mutate } = useMutation({
    mutationFn: async function (
      charts: {
        id: number;
        x: number;
        y: number;
      }[]
    ) {
      const res = await fetch("/api/charts/update-positions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ charts }),
      });

      const json = await res.json();
      if (json.error) {
        throw new Error(json.error);
      }

      return json;
    },
  });

  if (!charts || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center p-4">
      <div className="w-[1200px] flex flex-col">
        <div className="mb-2 flex items-center justify-between">
          <img src="logo.png" className="w-72" />
          <div>
            <AddChartDialog />
          </div>
        </div>
        <GridLayout
          className="items-center w-[1200px]"
          layout={charts.map((chart) => ({
            i: chart.chart.id.toString(),
            x: chart.chart.x,
            y: chart.chart.y,
            w: 1,
            h: 1,
          }))}
          cols={2}
          rowHeight={400}
          width={1200}
          isResizable={false}
          onLayoutChange={(layout) =>
            mutate(layout.map((l) => ({ id: parseInt(l.i), x: l.x, y: l.y })))
          }
        >
          {charts.map((chart) => (
            <Card key={chart.chart.id}>
              <Title className="mb-6">{chart.chart.title}</Title>
              <ResponsiveContainer>
                {chart.chart.visualization === "bar" ? (
                  <BarChart
                    className="h-[90%]"
                    data={chart.data.map((d) => ({
                      ...d,
                      value: parseInt(d.value),
                    }))}
                    index="name"
                    categories={["value"]}
                    colors={["blue"]}
                    showLegend={false}
                  />
                ) : (
                  <DonutChart
                    className="h-[90%]"
                    variant="pie"
                    data={chart.data.map((d) => ({
                      ...d,
                      value: parseInt(d.value),
                    }))}
                    category="value"
                    index="name"
                    colors={[
                      "slate",
                      "violet",
                      "indigo",
                      "rose",
                      "cyan",
                      "amber",
                    ]}
                    showLabel={true}
                  />
                )}
              </ResponsiveContainer>
            </Card>
          ))}
        </GridLayout>
      </div>
    </div>
  );
}
