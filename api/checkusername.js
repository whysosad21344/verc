// api/checkusername.js
module.exports = (req, res) => {
  const { username } = req.query; // Get the username from the query string

  // In-memory storage for users data (replace with a DB in production)
  let usersData = {};  // This is temporary storage, ideally should be replaced with a database for persistence.

  if (usersData[username]) {
    res.status(200).json({
      success: true,
      message: `Username ${username} found`,
      stats: usersData[username], // Send the stats for the found username
      dateTime: new Date().toISOString(),
    });
  } else {
    res.status(404).json({
      success: false,
      message: `Username ${username} not found`,
      dateTime: new Date().toISOString(),
    });
  }
};
