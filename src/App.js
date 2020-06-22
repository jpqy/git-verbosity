import { useState, useEffect } from "react";
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import getFollowing from "./helpers/getFollowing";
import getAvgCommitMsgLengthOfUser from "./helpers/getAvgCommitMsgLength";

function App() {
  const [following, setFollowing] = useState([]);
  const [length, setLength] = useState([]);
  useEffect(() => {
    const user = "jpqy";
    getFollowing(user).then(following => {
      setFollowing(following);
      // const users = [...following, user];
      // return following;
    });
    getAvgCommitMsgLengthOfUser(user).then(length => setLength(length));    
  }, []);

  return (
    <div className="App">
      <div>{following.join(", ")}</div>
      <div>{length}</div>
    </div>
  );
}

export default App;
