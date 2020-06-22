import axios from "axios";

/**
 * Returns an array of 9 usernames that the user is following on github
 * @param {*} user
 */
export default async function getFollowing(user) {
  // Get first 9 users
  const followingArray = await axios.get(`/users/${user}/following`);
  console.log(followingArray);
  const following = followingArray.data.slice(0, 9).map(user => user.login);
  return following;
}
