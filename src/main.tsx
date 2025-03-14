import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { BrowserRouter } from "react-router-dom";
import Root from "./Root";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
