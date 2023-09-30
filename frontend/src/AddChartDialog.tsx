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
import { useQuery } from "react-query";

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
    queryFn: async function () {
      const res = await fetch("http://localhost:3000/event-schemas");
      return res.json();
    },
  });

  const [title, setTitle] = useState("");
  const [eventSchema, setEventSchema] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState("");

  function addChart() {
    console.log(title, eventSchema.id, selectedProperty);
  }

  if (isLoading) {
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
                  <div className="mb-2 text-sm">Event Type</div>
                  <Select
                    value={eventSchema?.id}
                    onValueChange={(schemaID) =>
                      setEventSchema(
                        eventSchemas.find((schema) => schema.id === schemaID)
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
                          .filter(([_, property]) => property.type === "string")
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
