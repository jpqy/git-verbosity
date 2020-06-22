import axios from "axios";

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

/**
 * Returns an array of random `limit` repo names of the user
 * @param {*} user
 * @param {*} limit
 */
async function getRandomRepos(user, limit = 5) {
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
  const commitsResponse = await axios.get(`/repos/${user}/${repo}/commits`);
  //console.log(commitsResponse);
  const commitMessages = commitsResponse.data
    .filter(commitObj => commitObj.author && commitObj.author.login === user)
    .map(commitObj => commitObj.commit.message.length);
  //console.log(commitMessages);
  const avgCommitMsgLength =
    commitMessages.reduce((acc, next) => acc + next, 0) / commitMessages.length;
  return avgCommitMsgLength || 0; // Handle when no commits were made by user
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