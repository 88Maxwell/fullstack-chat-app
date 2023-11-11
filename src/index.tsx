import ReactDOM from "react-dom";
import { StrictMode } from "react";
import App from "./app/components/App";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("");

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement,
);
