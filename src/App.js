import { useState, useEffect } from "react";
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import getFollowing from "./helpers/getFollowing";
import getAvgCommitMsgLength from "./helpers/getAvgCommitMsgLength";

function App() {
  const [following, setFollowing] = useState([]);
  const [repos, setRepos] = useState([]);
  useEffect(() => {
    getFollowing("jpqy").then(following => setFollowing(following));
    getAvgCommitMsgLength("jpqy").then(repos => setRepos(repos));
  }, []);

  return <div className="App"><div>{following.join(", ")}</div><div>{repos.join(", ")}</div></div>;
}

export default App;
