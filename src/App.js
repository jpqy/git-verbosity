import { useState, useEffect } from "react";
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import getFollowing from "./helpers/getFollowing";

function App() {
  const [following, setFollowing] = useState([]);
  useEffect(() => {
    getFollowing("jpqy").then(following => setFollowing(following));
  }, []);
  return <div className="App">{following}</div>;
}

export default App;
