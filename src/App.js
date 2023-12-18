import React from "react";
import "./App.css";
import { initializeParse } from "@parse/react";
import { Product } from "./components/Product";

const PARSE_APPLICATION_ID = "0sd4UdqbiTdERtz98fcGvVAGd42B07hpPTSKhg60";
const PARSE_LIVE_QUERY_URL = "https://ezfoodstest.b4a.io/";
const PARSE_JAVASCRIPT_KEY = "oWoRhT2s7mkuPHezfUoht2H7yp1uoGGbKWe65pVP";

initializeParse(
  PARSE_LIVE_QUERY_URL,
  PARSE_APPLICATION_ID,
  PARSE_JAVASCRIPT_KEY
);

function App() {
  return (
    <div className="App">
      <Product />
    </div>
  );
}

export default App;