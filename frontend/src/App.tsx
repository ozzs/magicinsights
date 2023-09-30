import { Button } from "@tremor/react";
import Dashboard from "./Dashboard";
import { PlusIcon } from "@heroicons/react/outline";

function App() {
  return (
    <div className="flex justify-center p-4">
      <div className="w-[1200px] flex flex-col">
        <div className="mb-2 flex items-center justify-between">
          <img src="logo.png" className="w-72" />
          <div className="">
            <Button variant="secondary" icon={PlusIcon}>
              Add Chart
            </Button>
          </div>
        </div>
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
