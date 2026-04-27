// api/statcheck.js

module.exports = async (req, res) => {
  try {
    // Check if the request method is POST
    if (req.method !== 'POST') {
      return res.status(405).json({ 
        success: false, 
        message: 'Only POST requests are allowed' 
      });
    }

    // Ensure the body is parsed correctly for JSON
    if (!req.body) {
      return res.status(400).json({ 
        success: false, 
        message: 'Request body is empty or not parsed properly' 
      });
    }

    // Parse the body as JSON if it's not parsed automatically
    const { username } = req.body || {};  // Default to an empty object if req.body is undefined

    // If no username is provided, return a bad request error
    if (!username) {
      return res.status(400).json({
        success: false,
        message: 'Username is required',
      });
    }

    // In-memory storage for users data (temporary storage for this example)
    let usersData = {}; // Should be replaced with a real database for production

    // Logic for checking if the username exists
    if (!usersData[username]) {
      usersData[username] = {}; // Initialize an empty stats object for this username
      console.log('Received username:', username); // Log the received username
      return res.status(200).json({
        success: true,
        message: 'Data received successfully',
        dateTime: new Date().toISOString(),
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Username already received or invalid',
        dateTime: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error('Error processing statcheck request:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request',
    });
  }
};
