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
 * Returns the average commit message length of the user (max 100 commits),
 * randomly sampled, in 10 repositories
 * @param {*} user
 */
export default async function getAvgCommitMsgLength(user) {
  const reposResponse = await axios.get(`/users/${user}/repos`);

  // Randomly sample up to 10 repos
  const shuffledRepos = shuffle(reposResponse.data);
  const repoNames = [];
  for (const repo of shuffledRepos)
    if (repoNames.length <= 10) {
      repoNames.push(repo.name);
    }
  return repoNames;
}
