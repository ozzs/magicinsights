import { Card, Title, Text, Grid } from "@tremor/react";

export default function Dashboard() {
  return (
    <main>
      <Title>Dashboard</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>

      <Grid numItemsMd={3} className="mt-6 gap-6">
        <Card>
          <div className="h-44">A</div>
        </Card>
        <Card>
          <div className="h-44">B</div>
        </Card>
        <Card>
          <div className="h-44">C</div>
        </Card>
        <Card>
          <div className="h-44">D</div>
        </Card>
        <Card>
          <div className="h-44">E</div>
        </Card>
        <Card>
          <div className="h-44">F</div>
        </Card>
      </Grid>
    </main>
  );
}
