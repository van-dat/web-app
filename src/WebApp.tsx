import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./webapp_components/home/Home";
import Content from "./webapp_components/content/Content";
import ContentAssistant from "./webapp_components/contentAssistant/ContentAssistant";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "", 
        element: <Content/>,
      },
      {
        path: ":id", 
        element: <ContentAssistant/>, 
      },
    ],
  },
]);

function WebApp() {
  return <RouterProvider router={router} />;
}

export default WebApp;
