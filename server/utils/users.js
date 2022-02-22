const users = [];

// Add User
function addUser(id, room, username) {
  const user = { id, room, username };
  users.push(user);
  return user;
}
// Remove User
function removeUser(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}
// Get Users That Joined In Same Room
function getUsersRoom(room) {
  return users.filter((user) => user.room === room);
}
// Get Current User
function getCurrentUser(id) {
  return users.find((user) => user.id === idd);
}

module.exports = {
    addUser,
    removeUser,
    getUsersRoom,
    getCurrentUser
}