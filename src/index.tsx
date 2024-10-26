import React from "react";
import ReactDOM from "react-dom/client";
import "./global.style.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "pages/App";
import Movies from "pages/Movies";
import { Provider } from "react-redux";
import { store } from "store/store";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/movies", element: <Movies /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
