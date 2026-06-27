const getTestMessage = (req, res) => {
  res.json({
    message: "Backend Working"
  });
};

module.exports = {
  getTestMessage
};