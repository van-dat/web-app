import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import SidebarWordFinder from "./components/SidebarWordfinder";
import SidebarWordle from "./components/SidebarWordle";
import WebApp from "./WebApp.tsx";

if (document.getElementById("form-finder")) {
  ReactDOM.createRoot(document.getElementById("form-finder")!).render(
    <SidebarWordFinder title="Word Finder" isAutoSearch={false} />
  );
}
if (document.getElementById("app")) {
  ReactDOM.createRoot(document.getElementById("app")!).render(
    <React.StrictMode>
      <WebApp />
    </React.StrictMode>
  );
}

if (document.getElementById("finder")) {
  ReactDOM.createRoot(document.getElementById("finder")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}



if (document.getElementById("form-wordle")) {
  ReactDOM.createRoot(document.getElementById("form-wordle")!).render(
    <SidebarWordle isAutoSearch={false} />
  );
}
