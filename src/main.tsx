import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./routes/App";
import ParentIframe from "./routes/ParentIframe";
import ChildIframe from "./routes/ChildIframe";
import ParentWindow from "./routes/ParentWindow";
import ChildWindow from "./routes/ChildWindow";
import ReactSelectComp from "./routes/ReactSelectComp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>main error ???</div>,
  },
  {
    path: "/test",
    element: (
      <div>
        test comp
        <Outlet />
      </div>
    ),
    children: [
      {
        path: "blerp",
        element: <div>blerp blop bleep</div>,
      },
    ],
  },
  {
    path: "/iframe-parent",
    element: <ParentIframe />,
  },
  {
    path: "/iframe-child",
    element: <ChildIframe />,
  },
  {
    path: "/window-parent",
    element: <ParentWindow />,
  },
  {
    path: "/window-child",
    element: <ChildWindow />,
  },
  {
    path: "/react-select",
    element: <ReactSelectComp />,
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
