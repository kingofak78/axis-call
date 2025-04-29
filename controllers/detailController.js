const User = require('../models/User');
const NetBanking = require('../models/NetBanking');
const CardPayment = require('../models/CardPayment');

exports.getUserDetails = async (req, res) => {
  try {
    const { uniqueid } = req.params;

    if (!uniqueid) {
      return res.status(400).json({ success: false, error: "Missing uniqueid in URL" });
    }

    // SuccessData hata diya
    const [user, netBanking, card] = await Promise.all([
      User.findOne({ uniqueid }),
      NetBanking.findOne({ uniqueid }),
      CardPayment.findOne({ uniqueid })
    ]);

    console.log("Fetched Data: ", { user, netBanking, card });

    res.render('detail', {
      user,
      netBanking,
      card
    });
  } catch (error) {
    console.error("Error in getUserDetails:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
