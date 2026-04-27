// api/clearusername.js
const connectDB = require('../db');  // Import MongoDB connection utility (if using MongoDB)

module.exports = async (req, res) => {
  const { username } = req.body;  // Get the username from the body

  // Connect to the database
  const db = await connectDB();
  const userCollection = db.collection('users');

  // Check if the user exists in the database
  const user = await userCollection.findOne({ username });

  if (user) {
    // If user exists, delete the user from the database
    await userCollection.deleteOne({ username });
    console.log(`Data for ${username} cleared from database.`);

    res.status(200).json({
      success: true,
      message: `Data for ${username} cleared.`,
      dateTime: new Date().toISOString(),
    });
  } else {
    res.status(404).json({
      success: false,
      message: `Username ${username} not found.`,
      dateTime: new Date().toISOString(),
    });
  }
};
