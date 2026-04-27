// api/confirmfound.js
module.exports = (req, res) => {
  const { username, stats } = req.body;  // Extract the data from the body

  // Assuming you have in-memory storage like before (replace with DB in production)
  let usersData = {};  // This is temporary storage.

  if (username && stats) {
    usersData[username] = stats;  // Store the stats for the user
    res.status(200).json({
      success: true,
      message: `Stats for ${username} confirmed successfully`,
      dateTime: new Date().toISOString(),
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Username or stats missing',
      dateTime: new Date().toISOString(),
    });
  }
};
