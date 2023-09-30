import { EventSchema, NewEvent } from "@magicinsights/common/entities";
import { Card, Title, Select, SelectItem } from "@tremor/react";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/core";

export function PushEvent() {
  const { isLoading, data: eventSchemas } = useQuery({
    queryKey: ["getEventSchemas"],
    queryFn: async function (): Promise<EventSchema[]> {
      const res = await fetch("/api/event-schemas");
      return res.json();
    },
  });

  const { mutate: addEvent } = useMutation({
    mutationFn: async function (event: NewEvent) {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      const json = await res.json();
      if (json.error) {
        throw new Error(json.error);
      }

      return json;
    },
  });

  const [eventSchema, setEventSchema] = useState<EventSchema | undefined>(
    undefined
  );

  if (isLoading || !eventSchemas) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="h-full">
      <div>
        <Title>Push Event</Title>

        <div className="mt-4">
          <div className="mb-2 text-sm">Event Type</div>
          <Select
            value={eventSchema?.id}
            onValueChange={(schemaID) =>
              setEventSchema(
                eventSchemas?.find((schema) => schema.id === schemaID)
              )
            }
          >
            {eventSchemas.map((schema) => (
              <SelectItem key={schema.id} value={schema.id}>
                {schema.id}
              </SelectItem>
            ))}
          </Select>
        </div>

        {eventSchema ? (
          <Form
            schema={eventSchema.schema}
            validator={validator}
            className="mt-4"
            onSubmit={(e) =>
              addEvent({ eventSchemaId: eventSchema.id, data: e.formData })
            }
          />
        ) : null}
      </div>
    </Card>
  );
}
