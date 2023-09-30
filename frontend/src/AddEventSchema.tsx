import { Card, Title, Button, TextInput } from "@tremor/react";
import Editor from "@monaco-editor/react";
import { useMutation, useQueryClient } from "react-query";
import { NewEventSchema } from "@magicinsights/common/entities";
import { useState } from "react";

const DEFAULT_JSON_SCHEMA = `{
  "type": "object",
  "properties": {
    "houseName": {
      "type": "string",
      "enum": ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"]
    },
    "winOrLoss": {
      "type": "string",
      "enum": ["Win", "Loss"]
    }
  }
}`;

export default function AddEventSchema() {
  const [eventSchemaID, setEventSchemaID] = useState("");
  const [eventSchemaCode, setEventSchemaCode] = useState(DEFAULT_JSON_SCHEMA);

  const queryClient = useQueryClient();

  const { mutate: addEventSchema } = useMutation({
    mutationFn: async function (eventSchema: NewEventSchema) {
      const res = await fetch("/api/event-schemas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventSchema),
      });

      const json = await res.json();
      if (json.error) {
        throw new Error(json.error);
      }

      return json;
    },
    onSuccess: () => {
      setEventSchemaID("");
      setEventSchemaCode(DEFAULT_JSON_SCHEMA);

      queryClient.invalidateQueries({ queryKey: ["getEventSchemas"] });
    },
  });

  return (
    <Card className="h-full flex flex-col">
      <Title>Add Event Schema</Title>
      <div className="mt-4">
        <div className="mb-2 text-sm">ID</div>
        <TextInput
          placeholder="my-event-schema"
          value={eventSchemaID}
          onChange={(e) => setEventSchemaID(e.target.value)}
        />
      </div>
      <div className="mt-6">
        <div className="mb-2 text-sm">JSON Schema</div>
        <Editor
          height="40vh"
          defaultLanguage="json"
          className="border"
          options={{
            minimap: { enabled: false },
          }}
          value={eventSchemaCode}
          onChange={(value) => setEventSchemaCode(value || "")}
        />
      </div>
      <Button
        disabled={!eventSchemaID || !eventSchemaCode}
        className="mt-4 self-end"
        onClick={() =>
          addEventSchema({
            id: eventSchemaID,
            schema: JSON.parse(eventSchemaCode),
          })
        }
      >
        Create
      </Button>
    </Card>
  );
}
