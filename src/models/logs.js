// models/Log.js
const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  action: String, 
  model: String, 
  documentId: mongoose.Schema.Types.ObjectId, 
  changes: mongoose.Schema.Types.Mixed,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', logSchema);
