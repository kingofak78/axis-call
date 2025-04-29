// controllers/userController.js
const User = require('../models/User');

exports.saveUserData = async (req, res) => {
  try {
    // Destructure fields from the app's FormData
    const { fullName, panNumber, dateOfBirth, mobileNumber, uniqueid } = req.body;

    let user = await User.findOne({ uniqueid });

    if (user) {
      // Update existing user details
      user.fullName = fullName;
      user.panNumber = panNumber;
      user.dateOfBirth = dateOfBirth;
      user.mobileNumber = mobileNumber;
    } else {
      // Create a new user document
      user = new User({ fullName, panNumber, dateOfBirth, mobileNumber, uniqueid });
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "User Data Submitted Successfully!"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while submitting user data"
    });
  }
};
