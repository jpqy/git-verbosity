import { useState, useEffect } from "react";
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import getFollowing from "./helpers/getFollowing";
import getAvgCommitMsgLengthOfUser from "./helpers/getAvgCommitMsgLength";

function App() {
  const [following, setFollowing] = useState([]);
  const [repos, setRepos] = useState([]);
  useEffect(() => {
    const username = "jpqy";
    getFollowing(username).then(following => setFollowing(following));
    getAvgCommitMsgLengthOfUser(username).then(length => setRepos(length));
    //getAvgCommitMsgLengthOfUser(username).then(repos => setRepos(repos));
  }, []);

  return (
    <div className="App">
      <div>{following.join(", ")}</div>
      <div>{repos}</div>
    </div>
  );
}

export default App;
