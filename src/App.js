import { useState, useEffect } from "react";
import React from "react";
import "./App.css";
import getFollowing from "./helpers/getFollowing";
import getAvgCommitMsgLengthOfUser from "./helpers/getAvgCommitMsgLength";
import BarChart from "./BarChart";

const getCommitMsgLengthDataForChart = async function (user = "jpqy") {
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
  useEffect(() => {
    getCommitMsgLengthDataForChart().then(data => setChartData(data));
  }, []);

  return (
    <div className="App">
      <div>{chartData.map(data => JSON.stringify(data))}</div>
      {chartData.length !== 0 && <BarChart chartData={chartData} />}
    </div>
  );
}

export default App;
