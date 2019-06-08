import * as React from "react";
import * as ReactDOM from "react-dom";
import Loader from "./Loader";

// theme
const theme = localStorage.getItem("theme");
if (theme) {
  const HTML_NODE = document.getElementsByTagName("html")[0];
  HTML_NODE.setAttribute("theme", theme);
}

// mount
let App = Loader;
const MOUNT_NODE: Element | null = document.getElementById("root");
const render = () => {
  ReactDOM.render(<App />, MOUNT_NODE);
};
render();

// hot
if ((module as any).hot) {
  (module as any).hot.accept("./Loader", () => {
    const NextLoader = require("./Loader").default;
    App = NextLoader;
    setImmediate(() => {
      if (MOUNT_NODE) {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      }
      render();
    });
  });
}
