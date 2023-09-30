import { Button } from "@tremor/react";
import Dashboard from "./Dashboard";
import { PlusIcon } from "@heroicons/react/outline";
import { AddChartDialog } from "./AddChartDialog";

function App() {
  return (
    <div className="flex justify-center p-4">
      <div className="w-[1200px] flex flex-col">
        <div className="mb-2 flex items-center justify-between">
          <img src="logo.png" className="w-72" />
          <div>
            <AddChartDialog />
          </div>
        </div>
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
