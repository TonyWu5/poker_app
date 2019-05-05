const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema can be updated to include more statistics in the future
const sessionSchema = new Schema({
  location: {
    type: String,
    require: true,
  },
  buyin: {
    type: Number,
    require: true,
  },
  tableLimit: {
    type: String,
    required: true,
  },
  cashout: {
    type: Number,
    required: true,
  },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;