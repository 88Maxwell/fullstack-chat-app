import ReactDOM from "react-dom";
import { StrictMode } from "react";
import Entrypoint from "./app/components/Entrypoint";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("");

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <StrictMode>
    <Entrypoint />
  </StrictMode>,
  rootElement,
);
