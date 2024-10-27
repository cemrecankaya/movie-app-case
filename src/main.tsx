import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./global.style.scss";
import App from "@pages/App";
import Movies from "@pages/Movies";
import { store } from "@store/store";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/movies", element: <Movies /> },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
