import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import CheckInRoom from "./CheckInRoom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/room/:id" element={<CheckInRoom />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
