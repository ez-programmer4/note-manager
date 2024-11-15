import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom"; // Importing Router
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
if (ProcessingInstruction.env.NODE_ENV === "production") disableReactDevTools();

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ChakraProvider>
    <Router>
      {" "}
      {/* Only one Router wrapping the whole app */}
      <App />
    </Router>
  </ChakraProvider>
);
