import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter here
import AppRouter from "./lib/routes/router";
import { Myprovider } from "./lib/context/AuthContext";
import { Appprovider } from "./lib/context/AppContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Myprovider>
      <Appprovider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Appprovider>
    </Myprovider>
  </StrictMode>
);
