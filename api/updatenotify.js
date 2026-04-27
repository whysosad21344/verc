// api/updatenotify.js
const connectDB = require('../db');  // Import MongoDB connection utility (if using MongoDB)

module.exports = async (req, res) => {
  const { updateData } = req.body;  // Get the update data from the body

  if (!updateData) {
    return res.status(400).json({
      success: false,
      message: 'No update data provided.',
      dateTime: new Date().toISOString(),
    });
  }

  // Connect to the database
  const db = await connectDB();
  const updatesCollection = db.collection('updates');

  // Store the update data in the database
  await updatesCollection.insertOne({
    updateData,
    timestamp: new Date().toISOString(),
  });

  console.log(`Update received: ${updateData}`);

  res.status(200).json({
    success: true,
    message: 'Update received and logged successfully.',
    dateTime: new Date().toISOString(),
  });
};
