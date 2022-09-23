import React from "react";
import ReactDOM from "react-dom";
import { App } from "./ui/app";
import "../css/site.scss"

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById("app"));
});
