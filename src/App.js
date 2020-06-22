import { useState, useEffect } from "react";
import React from "react";
import "./App.css";
import getFollowing from "./helpers/getFollowing";
import getAvgCommitMsgLengthOfUser from "./helpers/getAvgCommitMsgLength";
import BarChart from "./BarChart";

const getCommitMsgLengthDataForChart = async function (user) {
  const following = await getFollowing(user);
  const users = [...following, user];
  const userLengthPromises = users.map(user =>
    getAvgCommitMsgLengthOfUser(user)
  );
  const lengths = await Promise.all(userLengthPromises);

  const chartData = [];
  for (let i = 0; i < users.length; i++) {
    chartData.push({
      name: users[i],
      length: Math.round(lengths[i] * 10) / 10,
    });
  }
  return chartData;
};

function App() {
  const [chartData, setChartData] = useState([]);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [query, setQuery] = React.useState("");
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleClick = event => {
    setQuery(searchTerm);
  };

  useEffect(() => {
    getCommitMsgLengthDataForChart(query).then(data => setChartData(data));
  }, [query]);

  return (
    <div className="App">
      <div id="w">
        <h1>Git Verbosity</h1>
        <p>
          Enter a Github username below to find out the average commit message
          length of the user and their friends!
        </p>

        <input
          type="text"
          name="ghusername"
          id="ghusername"
          placeholder="Github username..."
          value={searchTerm}
          onChange={handleChange}
        />

        <button href="#" id="ghsubmitbtn" onClick={handleClick}>
          Get verbosity
        </button>
      </div>
      {/* <div>{chartData.map(data => JSON.stringify(data))}</div> */}
      {chartData.length !== 0 && <BarChart chartData={chartData} />}
    </div>
  );
}

export default App;
