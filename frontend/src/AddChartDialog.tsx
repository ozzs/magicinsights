import { useState } from "react";
import {
  useFloating,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
} from "@floating-ui/react";
import {
  Button,
  Select,
  SelectItem,
  Subtitle,
  TextInput,
  Title,
} from "@tremor/react";
import { PlusIcon } from "@heroicons/react/outline";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  ChartVisualization,
  EventSchema,
  NewChart,
} from "@magicinsights/common/entities";

export function AddChartDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const click = useClick(context);
  const role = useRole(context);
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    role,
    dismiss,
  ]);

  const { isLoading, data: eventSchemas } = useQuery({
    queryKey: ["getEventSchemas"],
    queryFn: async function (): Promise<EventSchema[]> {
      const res = await fetch("/api/event-schemas");
      return res.json();
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async function (chart: NewChart) {
      const res = await fetch("/api/charts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chart),
      });

      const json = await res.json();
      if (json.error) {
        throw new Error(json.error);
      }

      return json;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCharts"] });
    },
  });

  const [title, setTitle] = useState("");
  const [eventSchema, setEventSchema] = useState<EventSchema | undefined>(
    undefined
  );
  const [selectedProperty, setSelectedProperty] = useState("");
  const [visualization, setVisualization] = useState("bar");

  function addChart() {
    mutate({
      title,
      eventSchemaId: eventSchema!.id,
      property: selectedProperty,
      visualization: visualization as ChartVisualization,
      x: 0,
      y: 0,
    });

    setIsOpen(false);
  }

  if (isLoading || !eventSchemas) {
    return null;
  }

  return (
    <>
      <Button
        variant="secondary"
        icon={PlusIcon}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        Add Chart
      </Button>

      <FloatingPortal>
        {isOpen && (
          <FloatingOverlay className="Dialog-overlay" lockScroll>
            <FloatingFocusManager context={context}>
              <div
                className="bg-white p-6 rounded w-[35rem] flex flex-col"
                ref={refs.setFloating}
                {...getFloatingProps()}
              >
                <Title className="text-2xl">Add Chart</Title>
                <Subtitle>Visualize your events</Subtitle>

                <div className="mt-6">
                  <div className="mb-2 text-sm">Chart Title</div>
                  <TextInput
                    placeholder="My magical chart..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="mt-4">
                  <div className="mb-2 text-sm">Visualization</div>
                  <Select
                    value={visualization}
                    onValueChange={(value) => setVisualization(value)}
                  >
                    <SelectItem value="bar">Bar Chart</SelectItem>
                    <SelectItem value="pie">Pie Chart</SelectItem>
                  </Select>
                </div>

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

                <div className="mt-4">
                  <div className="mb-2 text-sm">Property</div>
                  <Select
                    disabled={!eventSchema}
                    value={selectedProperty}
                    onValueChange={(propertyName) =>
                      setSelectedProperty(propertyName)
                    }
                  >
                    {eventSchema
                      ? Object.entries(eventSchema?.schema.properties)
                          .filter(
                            ([_, property]: [string, any]) =>
                              property.type === "string"
                          )
                          .map(([propertyName, _]) => (
                            <SelectItem key={propertyName} value={propertyName}>
                              {propertyName}
                            </SelectItem>
                          ))
                      : []}
                  </Select>
                </div>

                <div className="mt-8 self-end">
                  <Button
                    disabled={!title || !eventSchema || !selectedProperty}
                    onClick={() => addChart()}
                  >
                    Add Chart
                  </Button>
                </div>
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    </>
  );
}
