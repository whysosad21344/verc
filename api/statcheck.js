// api/statcheck.js
module.exports = async (req, res) => {
  try {
    // Ensure the request is a POST and contains a body
    if (req.method !== 'POST') {
      return res.status(405).json({
        success: false,
        message: 'Only POST requests are allowed',
      });
    }

    // Check if the body is parsed and if `username` exists
    const { username } = req.body || {};

    // If username is missing, respond with an error
    if (!username) {
      return res.status(400).json({
        success: false,
        message: 'Username is required',
      });
    }

    // In-memory storage for users data (this will reset after each request)
    let usersData = {}; // Temporary storage, ideally replace with a database

    // If username does not exist in the memory, initialize it
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
  } catch (error) {
    console.error('Error processing statcheck request:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request',
    });
  }
};
