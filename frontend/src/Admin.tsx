import { Title, Text, Grid, Col } from "@tremor/react";
import AddEventSchema from "./AddEventSchema";
import { PushEvent } from "./PushEvent";

export default function Admin() {
  return (
    <div className="p-8">
      <Title>MagicInsights Admin</Title>
      <Text>Add new event schemas or push events to the system.</Text>

      <Grid numItemsLg={8} className="gap-6 mt-6">
        <Col numColSpanLg={4}>
          <AddEventSchema />
        </Col>

        <Col numColSpanLg={4}>
          <PushEvent />
        </Col>
      </Grid>
    </div>
  );
}
