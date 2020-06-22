import axios from "axios";

/**
 * Returns an array of 9 usernames that the user is following on github
 * @param {*} user
 */
export default async function getFollowing(user, limit = 5) {
  // Get first 9 users
  const followingArray = await axios.get(`/users/${user}/following`);
  const following = followingArray.data
    .slice(0, limit - 1)
    .map(user => user.login);
  return following;
}
