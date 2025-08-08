import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import { router } from "./router/Router.jsx";
import Authprovider from "./context/Authprovider.jsx";
import {
  
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Authprovider>
        <RouterProvider router={router}></RouterProvider>
      </Authprovider>
    </QueryClientProvider>
  </StrictMode>
);
