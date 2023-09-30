import Dashboard from "./Dashboard";
import { AddChartDialog } from "./AddChartDialog";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
