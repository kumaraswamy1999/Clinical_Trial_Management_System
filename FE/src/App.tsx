// App.tsx
import { BrowserRouter, useRoutes } from "react-router-dom";
import { Suspense } from "react";
import Loader from "./components/reusable/Loader";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import routes from "./route/route";
import "./App.css";

function AppRoutes() {
  const routing = useRoutes(routes);
  return routing;
}

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
        <ToastContainer style={{ color: "black" }} autoClose={2000} />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
