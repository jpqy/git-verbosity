import axios from "axios";
import shuffle from "./shuffle";

/**
 * Returns an array of random `limit` repo names of the user
 * @param {*} user
 * @param {*} limit
 */
async function getRandomRepos(user, limit = 10) {
  const reposResponse = await axios.get(`/users/${user}/repos`);

  // Randomly select up to 10 repos for sampling
  const shuffledRepos = shuffle(reposResponse.data);
  const repoNames = [];
  for (const repo of shuffledRepos)
    if (repoNames.length < limit && repo.owner.login === user) {
      repoNames.push(repo.name);
    }

  return repoNames;
}

/**
 * Returns the average commit message length writter by `user` in `repo`
 * @param {*} user
 * @param {*} repo
 */
async function getAvgCommitMsgLengthByRepo(user, repo) {
  try {
    const commitsResponse = await axios.get(`/repos/${user}/${repo}/commits`);
    //console.log(commitsResponse.status);
    const commitMessages = commitsResponse.data
      .filter(commitObj => commitObj.author && commitObj.author.login === user)
      .map(commitObj => commitObj.commit.message.length);
    //console.log(commitMessages);
    const avgCommitMsgLength =
      commitMessages.reduce((acc, next) => acc + next, 0) /
      commitMessages.length;
    return avgCommitMsgLength || 0; // Handle when no commits were made by user
  } catch (error) {
    // 409 error, empty repo likely
    return 0;
  }
}

/**
 * Returns the average commit message length of the user (max 30 commits),
 * in 10 random repositories
 * @param {*} user
 */
export default async function getAvgCommitMsgLengthOfUser(user) {
  const repos = await getRandomRepos(user);
  const repoPromises = repos.map(repo =>
    getAvgCommitMsgLengthByRepo(user, repo)
  );
  const commitLengths = await Promise.all(repoPromises);

  // Don't count if length is 0 (i.e. user never committed)
  const filteredCommitLengths = commitLengths.filter(length => length !== 0);
  return (
    filteredCommitLengths.reduce((acc, val) => acc + val) /
    filteredCommitLengths.length
  );
}
