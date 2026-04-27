// api/statcheck.js
module.exports = (req, res) => {
  const { username } = req.body;
  
  // In-memory storage for users data (this will reset after each request)
  let usersData = {}; // This is temporary storage, ideally should be replaced with a database for persistence.

  if (username) {
    // In-memory logic for statcheck (your original logic)
    if (!usersData[username]) {
      usersData[username] = {}; // Initialize an empty stats object for this username
      console.log('Received username:', username); // Log the received username
      res.status(200).json({
        success: true,
        message: 'Data received successfully',
        dateTime: new Date().toISOString(),
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Username already received or invalid',
        dateTime: new Date().toISOString(),
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'Username is required',
    });
  }
};
