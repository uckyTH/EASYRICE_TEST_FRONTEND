import ReactDOM from "react-dom/client";
import { Suspense, StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";

import App from "./App";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <BrowserRouter  future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}>
      <Suspense>
        <App />
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
