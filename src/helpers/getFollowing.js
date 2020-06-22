import axios from "axios";

/**
 * Returns an array of 9 usernames that the user is following on github
 * including the original user
 * @param {*} user
 */
export default async function getFollowing(user, limit = 5) {
  // Get first 9 users
  const followingArray = await axios.get(`/users/${user}/following`);
  const following = followingArray.data
    .slice(0, limit - 1)
    .map(user => ({ name: user.login, href: user.avatar_url }));
  const userInfo = await axios.get(`/users/${user}`);
  following.push({ name: userInfo.data.login, href: userInfo.data.avatar_url });
  console.log(following);
  return following;
}
