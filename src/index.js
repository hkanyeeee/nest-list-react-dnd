import { StrictMode } from "react";
import ReactDOM from "react-dom";

import DragAndDrop from "./DragAndDrop";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <DragAndDrop />
  </StrictMode>,
  rootElement
);
