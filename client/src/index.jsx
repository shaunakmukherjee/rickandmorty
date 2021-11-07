import React from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader";

import App from "./pages/App.jsx";

const HotReloadableApp = hot(module)(App);


ReactDOM.render(<HotReloadableApp />, document.getElementById("root"));
