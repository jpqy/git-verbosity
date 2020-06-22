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
async function getRandomRepos(user, limit = 10) {
  const reposResponse = await axios.get(`/users/${user}/repos`);

  // Randomly select up to 10 repos for sampling
  const shuffledRepos = shuffle(reposResponse.data);
  const repoNames = [];
  for (const repo of shuffledRepos)
    if (repoNames.length < limit) {
      repoNames.push(repo.name);
    }

  return repoNames;
}

/**
 * Returns the average commit message length writter by `user` in `repo`
 * @param {*} user
 * @param {*} repo
 */
async function getAvgCommitMsgLengthOfRepo(user, repo) {
  const commitsResponse = await axios.get(`/repos/${user}/${repo}/commits`);
  console.log(commitsResponse);
  const commitMessages = commitsResponse.data
    .filter(commitObj => commitObj.author.login === user)
    .map(commitObj => commitObj.commit.message.length);
  console.log(commitMessages);
  const avgCommitMsgLength =
    commitMessages.reduce((acc, next) => acc + next, 0) / commitMessages.length;
  return avgCommitMsgLength;
}

/**
 * Returns the average commit message length of the user (max 100 commits),
 * randomly sampled, in 10 repositories
 * @param {*} user
 */
export default async function getAvgCommitMsgLengthOfUser(user) {
  const repos = await getRandomRepos(user);
  //console.log(repos);
  return getAvgCommitMsgLengthOfRepo(user, repos[0]);
}
