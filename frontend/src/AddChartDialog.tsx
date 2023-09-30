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
                <Subtitle>Here you can add charts</Subtitle>

                <div className="mt-6">
                  <div className="mb-2 text-sm">Chart Title</div>
                  <TextInput placeholder="My magical chart..." />
                </div>

                <div className="mt-4">
                  <div className="mb-2 text-sm">Event Type</div>
                  <Select>
                    <SelectItem value="1">spellCast</SelectItem>
                    <SelectItem value="2">quidditchMatch</SelectItem>
                    <SelectItem value="3">blabla</SelectItem>
                  </Select>
                </div>

                <div className="mt-4">
                  <div className="mb-2 text-sm">Property</div>
                  <Select>
                    <SelectItem value="1">houseName</SelectItem>
                    <SelectItem value="2">opposingHouse</SelectItem>
                    <SelectItem value="3">winLose</SelectItem>
                  </Select>
                </div>

                <div className="mt-8 self-end">
                  <Button>Add Chart</Button>
                </div>
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    </>
  );
}
