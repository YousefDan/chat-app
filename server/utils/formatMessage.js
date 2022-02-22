module.exports = (username, text) => {
  return {
    username,
    text,
    time:
      new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
  };
};
