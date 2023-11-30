import React from "react";
import GlobalStyle from "./components/GlobalStyle";
import Router from "./shared/Router";
import { Reset } from "styled-reset";

function App() {
  return (
    <div>
      <Reset />
      <Router />
      <GlobalStyle />
    </div>
  );
}

export default App;
