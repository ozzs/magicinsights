import { Card } from "@tremor/react";
import GridLayout from "react-grid-layout";

export default function Dashboard() {
  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 1 },
    { i: "b", x: 1, y: 0, w: 1, h: 1 },
    { i: "c", x: 2, y: 0, w: 1, h: 1 },
  ];

  return (
    <div className="p-4 flex justify-center">
      <GridLayout
        className="items-center w-[1200px]"
        layout={layout}
        cols={3}
        rowHeight={230}
        width={1200}
      >
        <Card key="a">
          <div>A</div>
        </Card>
        <Card key="b">
          <div>B</div>
        </Card>
        <Card key="c">
          <div>C</div>
        </Card>
        {/* <Card>
          <div className="h-44">D</div>
        </Card>
        <Card>
          <div className="h-44">E</div>
        </Card>
        <Card>
          <div className="h-44">F</div>
        </Card> */}
      </GridLayout>
    </div>
  );
}
