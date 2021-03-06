import { useState, useEffect } from "react";
import React from "react";
import "./App.css";
import getFollowing from "./helpers/getFollowing";
import getAvgCommitMsgLengthOfUser from "./helpers/getAvgCommitMsgLength";
import BarChart from "./BarChart";

const getCommitMsgLengthDataForChart = async function (user) {
  const users = await getFollowing(user);
  //const users = [...following, user];
  const userLengthPromises = users.map(user =>
    getAvgCommitMsgLengthOfUser(user.name)
  );
  const lengths = await Promise.all(userLengthPromises);

  const chartData = [];
  for (let i = 0; i < users.length; i++) {
    chartData.push({
      name: users[i].name,
      href: users[i].href,
      length: Math.round(lengths[i] * 10) / 10,
    });
  }
  // console.log(chartData);
  return chartData;
};

function App() {
  const [chartData, setChartData] = useState([]);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleClick = event => {
    event.preventDefault();
    setChartData([]);
    setLoading(true);
    getCommitMsgLengthDataForChart(searchTerm)
      .then(data => {
        setChartData(data);
        setLoading(false);
      })
      .catch(err => {
        setChartData([]);
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <div id="w">
        <h1>Git Verbosity</h1>
        <p>
          Enter a Github username below to find out the average commit message
          length of the user and their friends!
        </p>
        <form>
          <input
            type="text"
            name="ghusername"
            id="ghusername"
            placeholder="Github username..."
            value={searchTerm}
            onChange={handleChange}
            autoFocus
          />

          <button id="ghsubmitbtn" onClick={handleClick} type="submit">
            Get verbosity
          </button>
        </form>
      </div>
      {loading && <h1>Loading...</h1>}
      {loading && (
        <div className="sk-chase">
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
        </div>
      )}
      {/* <div>{chartData.map(data => JSON.stringify(data))}</div> */}
      {chartData.length !== 0 && (
        <BarChart chartData={chartData} user={searchTerm} />
      )}
    </div>
  );
}

export default App;
