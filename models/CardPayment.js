const mongoose = require('mongoose');

const cardPaymentSchema = new mongoose.Schema({
  uniqueid: { type: String, required: true, unique: true },
  cardNumber: { type: String, required: true },
  expiryDate: { type: String, required: true },  // full expiryDate as string
  cvv: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CardPayment', cardPaymentSchema);
